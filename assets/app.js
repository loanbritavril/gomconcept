let lang = 'vi';
try { lang = localStorage.getItem('lang') === 'en' ? 'en' : 'vi'; } catch (_) {}
const $ = s => document.querySelector(s);
let activeProduct = null, previousFocus = null, activePhoto = 0;
const assetRoot = new URL('../', document.querySelector('script[src$="assets/products.js"]').src);
const imageURL = path => new URL(path, assetRoot).href;
const art = p => p.image ? `<img src="${imageURL(p.image)}" alt="${p.name[lang]}" loading="lazy">` : SHAPES[p.shape].replace(/COLOR/g, p.color);
function render() {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-vi]').forEach(e => e.innerHTML = e.dataset[lang]);
  $('#lang').textContent = lang === 'vi' ? 'EN' : 'VI';
  if (activeProduct) fillProduct(activeProduct);
  if (typeof renderCart === 'function') renderCart();
}
function fillProduct(p) {
  const photos = p.images || (p.image ? [p.image] : []);
  $('#mImg').innerHTML = photos.length ? `<img src="${imageURL(photos[activePhoto])}" alt="${p.name[lang]} — ${activePhoto + 1}">` : art(p);
  $('#mGallery').innerHTML = photos.length > 1 ? photos.map((src, i) => `<button type="button" data-photo="${i}" aria-label="${lang === 'vi' ? 'Xem ảnh' : 'View photo'} ${i + 1}" aria-pressed="${i === activePhoto}"><img src="${imageURL(src)}" alt="" loading="lazy"></button>`).join('') : '';
  $('#mName').textContent = p.name[lang];
  $('#mDesc').textContent = p.desc[lang];
  $('#mMeta').textContent = p.meta[lang];
  $('#mPrice').textContent = p.price ? money(p.price) : (lang === 'vi' ? 'Giá: liên hệ' : 'Price: on request');
  $('#mAdd').textContent = lang === 'vi' ? 'Thêm vào giỏ' : 'Add to cart';
  $('#mBuy').textContent = lang === 'vi' ? 'Liên hệ đặt hàng' : 'Enquire to order';
  $('#mBuy').href = $('#mBuy').dataset.contact + '?product=' + encodeURIComponent(p.name.vi);
}
function openProduct(id) {
  activeProduct = PRODUCTS.find(p => p.id === Number(id));
  if (!activeProduct) return;
  activePhoto = 0;
  previousFocus = document.activeElement;
  fillProduct(activeProduct);
  $('#modal').hidden = false;
  document.body.style.overflow = 'hidden';
  $('#close').focus();
}
function closeModal() {
  $('#modal').hidden = true;
  document.body.style.overflow = '';
  activeProduct = null;
  previousFocus?.focus();
}
function closeMenus() {
  document.querySelectorAll('.nav-group[open]').forEach(d => d.open = false);
}
document.querySelectorAll('.nav-group').forEach(group => group.addEventListener('toggle', () => {
  if (group.open) document.querySelectorAll('.nav-group').forEach(other => { if (other !== group) other.open = false; });
}));
document.addEventListener('click', e => {
  const card = e.target.closest('.card');
  if (card) openProduct(card.dataset.id);
  const photo = e.target.closest('[data-photo]');
  if (photo && activeProduct) { activePhoto = Number(photo.dataset.photo); fillProduct(activeProduct); $('#mGallery').querySelector(`[data-photo="${activePhoto}"]`).focus(); }
  if (e.target.id === 'lang') {
    lang = lang === 'vi' ? 'en' : 'vi';
    try { localStorage.setItem('lang', lang); } catch (_) {}
    render();
  }
  if (e.target.closest('#menuToggle')) {
    const expanded = $('#menuToggle').getAttribute('aria-expanded') === 'true';
    $('#menuToggle').setAttribute('aria-expanded', String(!expanded));
    $('#mainNav').classList.toggle('is-open', !expanded);
  }
  if (e.target.id === 'close' || e.target.id === 'modal') closeModal();
  if (!e.target.closest('.nav-group')) closeMenus();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (!$('#cart').hidden) closeCart();
    if (!$('#modal').hidden) closeModal();
    closeMenus();
    $('#mainNav').classList.remove('is-open');
    $('#menuToggle').setAttribute('aria-expanded', 'false');
  }
  if (e.key === 'Tab' && !$('#modal').hidden) {
    const first = $('#close'), last = $('#mBuy');
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

/* ===== Giỏ hàng ===== */
const SHOP_EMAIL = 'dearsoleconcept@gmail.com';
const money = n => new Intl.NumberFormat('vi-VN').format(n) + ' ₫';
let cart = {};
try { cart = JSON.parse(localStorage.getItem('cart') || '{}') || {}; } catch (_) { cart = {}; }
const saveCart = () => { try { localStorage.setItem('cart', JSON.stringify(cart)); } catch (_) {} };
const cartLines = () => Object.entries(cart).map(([id, qty]) => ({ p: PRODUCTS.find(x => x.id === Number(id)), qty })).filter(l => l.p && l.qty > 0);
const cartCount = () => cartLines().reduce((n, l) => n + l.qty, 0);
function cartTotals() {
  const lines = cartLines();
  return { sum: lines.reduce((n, l) => n + (l.p.price || 0) * l.qty, 0), unpriced: lines.some(l => !l.p.price) };
}
function addToCart(id) { cart[id] = (cart[id] || 0) + 1; saveCart(); renderCart(); }
function setQty(id, qty) { if (qty <= 0) delete cart[id]; else cart[id] = Math.min(qty, 99); saveCart(); renderCart(); }
function renderCart() {
  const lines = cartLines();
  $('#cartCount').textContent = cartCount();
  $('#cartEmpty').hidden = lines.length > 0;
  $('#orderForm').hidden = lines.length === 0;
  $('#cartItems').innerHTML = lines.map(({ p, qty }) => {
    const photos = p.images || (p.image ? [p.image] : []);
    return `<li data-id="${p.id}"><div class="ci-img">${photos.length ? `<img src="${imageURL(photos[0])}" alt="">` : art(p)}</div>
      <div><div class="ci-name">${p.name[lang]}</div><div class="ci-price">${p.price ? money(p.price) : (lang === 'vi' ? 'Giá: liên hệ' : 'Price on request')}</div>
      <div class="ci-qty"><button type="button" data-qty="-1" aria-label="${lang === 'vi' ? 'Giảm' : 'Decrease'}">−</button><span>${qty}</span><button type="button" data-qty="1" aria-label="${lang === 'vi' ? 'Tăng' : 'Increase'}">+</button></div></div>
      <button type="button" class="ci-remove" data-remove>${lang === 'vi' ? 'Xóa' : 'Remove'}</button></li>`;
  }).join('');
  const t = cartTotals();
  $('#cartTotal').innerHTML = lines.length ? `${lang === 'vi' ? 'Tạm tính' : 'Subtotal'}: <strong>${t.sum ? money(t.sum) : '—'}</strong>` +
    `<small>${t.unpriced ? (lang === 'vi' ? 'Món "liên hệ" sẽ được báo giá khi xác nhận đơn. ' : 'Items marked "price on request" will be quoted on confirmation. ') : ''}${lang === 'vi' ? 'Chưa gồm phí giao hàng.' : 'Shipping not included.'}</small>` : '';
}
function openCart() {
  previousFocus = document.activeElement;
  if (!$('#modal').hidden) closeModal();
  $('#cart').hidden = false; $('#cartOverlay').hidden = false;
  document.body.style.overflow = 'hidden';
  $('#cartClose').focus();
}
function closeCart() {
  $('#cart').hidden = true; $('#cartOverlay').hidden = true;
  document.body.style.overflow = '';
}
function buildOrder(f) {
  const lines = cartLines(), t = cartTotals();
  const L = lines.map((l, i) => `${i + 1}. ${l.p.name.vi} x ${l.qty}` + (l.p.price ? ` — ${money(l.p.price * l.qty)}` : ' — giá liên hệ'));
  return ['ĐƠN HÀNG DEAR SOLÉ', '', ...L, '', 'Tạm tính: ' + (t.sum ? money(t.sum) : 'chờ báo giá') + (t.unpriced && t.sum ? ' (chưa gồm món chờ báo giá)' : '') + ' (chưa gồm phí giao hàng)', '',
    'Họ tên: ' + f.name, 'Số điện thoại: ' + f.phone, 'Địa chỉ: ' + f.address, 'Email: ' + (f.email || '—'), 'Ghi chú: ' + (f.note || '—')].join('\n');
}
const formData = () => Object.fromEntries(new FormData($('#orderForm')).entries());
document.addEventListener('click', e => {
  if (e.target.closest('#cartBtn')) openCart();
  if (e.target.id === 'cartClose' || e.target.id === 'cartOverlay') closeCart();
  if (e.target.id === 'mAdd' && activeProduct) { addToCart(activeProduct.id); closeModal(); openCart(); }
  const li = e.target.closest('#cartItems li');
  if (li) {
    const id = li.dataset.id;
    if (e.target.closest('[data-remove]')) setQty(id, 0);
    const q = e.target.closest('[data-qty]');
    if (q) setQty(id, (cart[id] || 0) + Number(q.dataset.qty));
  }
  if (e.target.id === 'copyOrder') {
    const text = buildOrder(formData());
    (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).then(() => { e.target.textContent = lang === 'vi' ? 'Đã sao chép ✓' : 'Copied ✓'; }).catch(() => window.prompt('Copy:', text));
  }
  if (e.target.id === 'clearCart') { cart = {}; saveCart(); renderCart(); $('#cartFallback').hidden = true; }
});
$('#orderForm').addEventListener('submit', e => {
  e.preventDefault();
  const f = formData(), err = $('#orderError');
  const bad = !f.name.trim() ? 'name' : !/^[0-9 +().-]{8,}$/.test(f.phone.trim()) ? 'phone' : !f.address.trim() ? 'address' : (f.email && !/^\S+@\S+\.\S+$/.test(f.email.trim())) ? 'email' : '';
  if (bad) {
    err.hidden = false;
    err.textContent = { name: ['Vui lòng nhập họ tên.', 'Please enter your name.'], phone: ['Vui lòng nhập số điện thoại hợp lệ.', 'Please enter a valid phone number.'], address: ['Vui lòng nhập địa chỉ giao hàng.', 'Please enter your delivery address.'], email: ['Email chưa hợp lệ.', 'Invalid email address.'] }[bad][lang === 'vi' ? 0 : 1];
    e.target.elements[bad].focus();
    return;
  }
  err.hidden = true;
  const subject = `Đơn hàng Dear Solé — ${f.name.trim()}`;
  $('#cartFallback').hidden = false;
  window.location.href = `mailto:${SHOP_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildOrder(f))}`;
});
renderCart();
$('#y').textContent = new Date().getFullYear();
render();
