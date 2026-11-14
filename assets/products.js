// price: giá VNĐ (số nguyên, vd 350000). price:0 = chưa có giá, web hiển thị "Liên hệ".
// Sửa file này để thêm/sửa sản phẩm. Đặt ảnh thật vào assets/img/ rồi điền "image": "assets/img/ten.jpg"
const SHAPES={
 vase:'<svg viewBox="0 0 100 140"><path d="M40 8h20v18c0 8 22 22 22 56 0 34-14 52-32 52S18 116 18 82c0-34 22-48 22-56z" fill="COLOR"/></svg>',
 bowl:'<svg viewBox="0 0 140 90"><path d="M8 20h124c0 40-26 64-62 64S8 60 8 20z" fill="COLOR"/></svg>',
 cup:'<svg viewBox="0 0 120 100"><path d="M18 14h64v38c0 26-14 40-32 40S18 78 18 52z" fill="COLOR"/><path d="M82 28h10c14 0 14 28 0 28h-10" fill="none" stroke="COLOR" stroke-width="7"/></svg>',
 plate:'<svg viewBox="0 0 160 60"><ellipse cx="80" cy="30" rx="74" ry="22" fill="COLOR"/><ellipse cx="80" cy="28" rx="46" ry="11" fill="#0001"/></svg>'
};
const PRODUCTS=[

 {id:7,price:599000,cat:"lamp",shape:"lamp",color:"#2555a0",image:"assets/img/blue-moon-01.jpg",images:["assets/img/blue-moon-01.jpg","assets/img/blue-moon-02.jpg"],
  name:{vi:"Blue Moon",en:"Blue Moon"},
  desc:{vi:"Đèn gốm men xanh với bề mặt tạo hình gợi những hố nhỏ trên mặt trăng, kết hợp ánh sáng vàng ấm.",en:"A blue-glazed ceramic lamp with a textured surface reminiscent of lunar craters, paired with a warm golden glow."},
  meta:{vi:"Đèn gốm · Men xanh",en:"Ceramic lamp · Blue glaze"}},

 {id:8,price:399000,cat:"lamp",shape:"lamp",color:"#6b4a35",image:"assets/img/ember-nest-01.jpg",images:["assets/img/ember-nest-01.jpg","assets/img/ember-nest-02.jpg"],
  name:{vi:"Ember Nest",en:"Ember Nest"},
  desc:{vi:"Tổ ấm của những đốm lửa nhỏ. Có chút rustic, whimsical và playful retro.",en:"A warm nest for tiny sparks. A touch of rustic, whimsical and playful retro."},
  meta:{vi:"Cao 20 cm · Men nâu, ghi",en:"H 20 cm · Brown, grey glaze"}},

 {id:9,price:699000,cat:"lamp",shape:"lamp",color:"#e8b516",image:"assets/img/birdie-bell-cover.jpg",images:["assets/img/birdie-bell-cover.jpg","assets/img/birdie-bell-02.jpg"],
  name:{vi:"Birdie Bell",en:"Birdie Bell"},
  desc:{vi:"Chiếc đèn mang dáng chuông vintage với sắc vàng tươi nổi bật, điểm xuyết chú chim xanh nhỏ xinh trên đỉnh. Sự kết hợp tinh nghịch giữa ba gam màu vàng, xanh và đỏ tạo nên một món decor độc đáo, mang đến chút vui tươi và ấm áp cho mọi góc nhà.",en:"A vintage bell-shaped lamp in a vivid bright yellow, topped with a cute little blue bird. The playful mix of yellow, blue and red makes a distinctive decor piece that brings a touch of joy and warmth to every corner of the home."},
  meta:{vi:"Cao 30 cm · Men vàng mù tạt, xanh ngọc, đỏ",en:"H 30 cm · Mustard yellow, turquoise, red glaze"}},

 {id:10,price:199000,cat:"small",shape:"plate",color:"#e9908d",image:"assets/img/mood-bloom-cover.jpg",images:["assets/img/mood-bloom-cover.jpg","assets/img/mood-bloom-02.jpg"],
  name:{vi:"Mood Bloom",en:"Mood Bloom"},
  desc:{vi:"Mood Bloom là bộ nam châm handmade bằng đất sét với thiết kế hoa 5 cánh đáng yêu, kết hợp cùng 5 gương mặt biểu cảm đại diện cho những mood khác nhau: vui vẻ, yêu đời, tức giận, buồn bã, sợ hãi. Không chỉ là món đồ trang trí tủ lạnh, Mood Bloom còn là cách nhỏ xinh để thể hiện tâm trạng mỗi ngày.",en:"Mood Bloom is a handmade clay magnet set with a cute five-petal flower and five expressive faces for different moods: cheerful, upbeat, angry, sad and scared. More than a fridge decoration, Mood Bloom is a small, charming way to show your mood each day."},
  meta:{vi:"Tuỳ chỉnh · Hồng, xanh, đỏ, tím, xanh lá",en:"Custom size · Pink, blue, red, purple, green"}}
];
const CATS={all:{vi:"Tất cả sản phẩm",en:"All products"},vase:{vi:"Bình & lọ",en:"Vases & vessels"},tableware:{vi:"Bát & đĩa",en:"Bowls & plates"},cup:{vi:"Ly & tách",en:"Cups & mugs"},lamp:{vi:"Đèn",en:"Lamps"},small:{vi:"Những đồ nhỏ",en:"Small objects"}};
