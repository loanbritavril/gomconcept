"""Rebuild static pages and sitemap: python3 scripts/build_site.py."""
from pathlib import Path
import re
from html import escape

ROOT = Path(__file__).resolve().parents[1]
BASE = 'https://loanbritavril.github.io/gomconcept/'
template = (ROOT / 'templates/base.html').read_text()
source = (ROOT / 'assets/products.js').read_text()
products = []
for block in re.findall(r'\{id:\d+.*?meta:\{.*?\}\}', source, re.S):
    p = {k: re.search(rf'{k}:"([^"]*)"', block).group(1) for k in ['cat', 'shape', 'color', 'image']}
    p['id'] = re.search(r'id:(\d+)', block).group(1)
    for key in ['name', 'desc', 'meta']:
        m = re.search(rf'{key}:\{{vi:"([^"]*)",en:"([^"]*)"\}}', block)
        p[key] = {'vi': m[1], 'en': m[2]}
    products.append(p)
shapes = dict(re.findall(r"(vase|bowl|cup|plate):'([^']+)'", source))
cats = [('all', '', 'Tất cả sản phẩm', 'All products'), ('vase', 'binh-lo/', 'Bình & lọ', 'Vases & vessels'), ('tableware', 'bat-dia/', 'Bát & đĩa', 'Bowls & plates'), ('cup', 'ly-tach/', 'Ly & tách', 'Cups & mugs'), ('lamp', 'den/', 'Đèn', 'Lamps'), ('small', 'nhung-do-nho/', 'Những đồ nhỏ', 'Small objects')]
def text(tag, vi, en, attrs=''):
    return f'<{tag} {attrs} data-vi="{escape(vi, quote=True)}" data-en="{escape(en, quote=True)}">{vi}</{tag}>'
def cards(items):
    out = '<div class="grid">'
    for p in items:
        art = shapes[p['shape']].replace('COLOR', p['color'])
        out += f'<button class="card" data-id="{p["id"]}"><div class="thumb">{art}</div>' + text('h3', **p['name']) + text('p', **p['meta']) + '</button>'
    return out + '</div>'
def intro(title, en, desc, desc_en):
    return '<section class="page-intro"><a class="breadcrumb" href="{{ROOT}}" data-vi="Trang chủ" data-en="Home">Trang chủ</a>' + text('h1', title, en) + text('p', desc, desc_en) + '</section>'
def category_links(active=''):
    return '<div class="filters category-links" aria-label="Danh mục sản phẩm">' + ''.join(text('a', vi, en, f'href="{{{{ROOT}}}}san-pham/{slug}"'+(' aria-current="page" class="on"' if active == key else '')) for key, slug, vi, en in cats) + '</div>'

def story():
    return text('p', 'Dear Solé bắt đầu từ niềm yêu thích những vật dụng giản dị. Mỗi món gốm được nặn, tráng men và nung bằng tay, nên không có hai món nào giống hệt nhau. Những vết men chảy, đường nặn nhỏ không hoàn hảo chính là dấu ấn của người làm.', "Dear Solé began with a love for simple, everyday objects. Each piece is shaped, glazed and fired by hand, so no two are alike. Every drip of glaze and slight imperfection is the maker’s mark.")

pages = {}
def add(path, title, desc, content):
    pages[path] = (title, desc, content)

home = '<section class="hero">' + text('p', 'Gốm thủ công', 'Handmade ceramics', 'class="eyebrow"') + text('h1', 'Mỗi món gốm,<br><em>một hơi thở của đất.</em>', 'Every piece,<br><em>a breath of clay.</em>') + text('a', 'Khám phá sản phẩm ↓', 'Explore our pieces ↓', 'class="link" href="{{ROOT}}san-pham/"') + '</section>'
home += '<section id="products"><div class="head">' + text('h2', 'Sản phẩm', 'Products') + '</div>' + category_links() + cards(products[:3]) + '</section>'
home += '<section id="collection"><div class="head">' + text('h2', 'Bộ sưu tập', 'Collections') + '</div><div class="collection-links">' + text('a', 'Bộ sưu tập hiện tại ↗', 'Current collection ↗', 'href="{{ROOT}}bo-suu-tap/"') + text('a', 'Sản phẩm độc bản ↗', 'One of a kind ↗', 'href="{{ROOT}}bo-suu-tap/doc-ban/"') + '</div></section>'
home += '<section id="story" class="story">' + text('h2', 'Về Dear Solé', 'About Dear Solé') + story() + text('a', 'Câu chuyện làm gốm →', 'Our pottery story →', 'class="link" href="{{ROOT}}ve-dear-sole/"') + '</section>'
home += '<section id="contact" class="contact">' + text('h2', 'Liên hệ', 'Contact') + text('p', 'Một món gốm cho riêng bạn, một câu chuyện cùng nhau.', 'A piece of pottery for you, a story to share.') + text('a', 'Đặt hàng & đặt riêng →', 'Orders & commissions →', 'class="btn" href="{{ROOT}}lien-he/"') + '<p class="links"><a href="mailto:hello@gomconcept.com">Email</a><a href="https://instagram.com/gomconcept" target="_blank" rel="noopener">Instagram ↗</a></p></section>'
add('', 'Gốm thủ công', 'Dear Solé — Ceramic & Clay Concept. Khám phá gốm thủ công, bộ sưu tập và những món gốm dành cho đời sống hàng ngày.', home)
for key, slug, vi, en in cats:
    selected = [p for p in products if key == 'all' or p['cat'] == key or (key == 'tableware' and p['cat'] in ['bowl','plate'])]
    content = intro(vi, en, 'Những hình dáng giản dị, dành cho những khoảnh khắc hàng ngày.', 'Simple forms for everyday moments.') + '<section class="catalogue">' + category_links(key)
    content += cards(selected) if selected else '<div class="empty">' + text('h2','Đang chờ những món gốm mới','New pieces are on their way') + text('p','Danh mục này chưa có sản phẩm. Bạn có thể liên hệ để trao đổi về một món làm riêng.','There are no pieces in this category yet. Get in touch to discuss a commission.') + text('a','Liên hệ đặt riêng →','Enquire about a commission →','class="link" href="{{ROOT}}lien-he/"') + '</div>'
    add('san-pham/' + slug, vi, f'{vi} tại Dear Solé. Khám phá gốm thủ công và liên hệ đặt hàng, đặt riêng.', content + '</section>')
add('bo-suu-tap/', 'Bộ sưu tập hiện tại', 'Khám phá bộ sưu tập gốm thủ công hiện tại của Dear Solé.', intro('Bộ sưu tập hiện tại', 'Current collection', 'Sắc đất, men mờ và những đường nét tự nhiên.', 'Earthy tones, matte glazes and natural lines.') + '<section class="catalogue">' + cards(products) + '</section>')
# No inventory records currently identify unique pieces; do not invent stock or exclusivity.
add('bo-suu-tap/doc-ban/', 'Sản phẩm độc bản', 'Những món gốm độc bản của Dear Solé. Liên hệ để tìm hiểu các tác phẩm mới.', intro('Sản phẩm độc bản', 'One of a kind', 'Một hình dáng, một dấu ấn riêng.', 'A form, a mark of its own.') + '<section class="catalogue"><div class="empty">' + text('h2','Chờ một cuộc gặp với đất','Waiting for the next creation') + text('p','Các sản phẩm độc bản sẽ được giới thiệu tại đây khi có thông tin và hình ảnh.','Unique pieces will be introduced here when details and images are available.') + text('a','Trao đổi cùng Dear Solé →','Get in touch with Dear Solé →','class="link" href="{{ROOT}}lien-he/"') + '</div></section>')
add('ve-dear-sole/', 'Câu chuyện làm gốm', 'Về Dear Solé và câu chuyện làm gốm thủ công: từ tạo hình, tráng men đến nung.', intro('Về Dear Solé', 'About Dear Solé', 'Câu chuyện làm gốm', 'Our pottery story') + '<section class="story article">' + story() + text('h2','Từ đất đến một món đồ thân quen','From clay to an everyday companion') + text('p','Tạo hình, tráng men, rồi nung — mỗi công đoạn để lại một dấu vết trên bề mặt gốm. Chúng tôi yêu những khác biệt nhỏ ấy, cũng như cách một món đồ giản dị trở thành một phần trong đời sống.','Shaping, glazing and firing each leave a trace on the clay. We love those small differences, and the way a simple object becomes part of everyday life.') + text('a','Khám phá sản phẩm →','Explore our pieces →','class="link" href="{{ROOT}}san-pham/"') + '</section>')
add('lien-he/', 'Liên hệ — Đặt hàng & đặt riêng', 'Liên hệ Dear Solé qua email hoặc Instagram để đặt hàng, đặt riêng và hợp tác.', intro('Liên hệ', 'Contact', 'Đặt hàng & đặt riêng', 'Orders & commissions') + '<section class="contact article">' + text('h2','Một món gốm dành cho bạn','A piece of pottery for you') + text('p','Để đặt hàng, hãy gửi tên sản phẩm bạn quan tâm. Với đơn đặt riêng, hãy chia sẻ ý tưởng, kích thước, màu men, số lượng và thời gian mong muốn. Dear Solé sẽ trao đổi thêm về khả năng thực hiện, giá và thời gian hoàn thành.','To place an order, send us the name of the piece you like. For a commission, share your idea, dimensions, glaze, quantity and desired timeline. Dear Solé will discuss feasibility, pricing and completion time with you.') + '<div class="contact-options"><div><h2>Email</h2><a href="mailto:hello@gomconcept.com">hello@gomconcept.com</a></div><div><h2>Instagram</h2><a href="https://instagram.com/gomconcept" target="_blank" rel="noopener">@gomconcept ↗</a></div></div></section>')
for path, (title, desc, content) in pages.items():
    prefix = '../' * len(path.strip('/').split('/')) if path else './'
    html = template.replace('{{TITLE}}', escape(title)).replace('{{DESCRIPTION}}', escape(desc, quote=True)).replace('{{CANONICAL}}', BASE + path).replace('{{CONTENT}}', content).replace('{{ROOT}}', prefix)
    target = ROOT / path / 'index.html'
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(html)
(ROOT/'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + ''.join(f'  <url><loc>{BASE}{path}</loc></url>\n' for path in pages) + '</urlset>\n')
print(f'Built {len(pages)} static pages and sitemap.xml')
