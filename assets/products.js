// Sửa file này để thêm/sửa sản phẩm. Đặt ảnh thật vào assets/img/ rồi điền "image": "assets/img/ten.jpg"
const SHAPES={
 vase:'<svg viewBox="0 0 100 140"><path d="M40 8h20v18c0 8 22 22 22 56 0 34-14 52-32 52S18 116 18 82c0-34 22-48 22-56z" fill="COLOR"/></svg>',
 bowl:'<svg viewBox="0 0 140 90"><path d="M8 20h124c0 40-26 64-62 64S8 60 8 20z" fill="COLOR"/></svg>',
 cup:'<svg viewBox="0 0 120 100"><path d="M18 14h64v38c0 26-14 40-32 40S18 78 18 52z" fill="COLOR"/><path d="M82 28h10c14 0 14 28 0 28h-10" fill="none" stroke="COLOR" stroke-width="7"/></svg>',
 plate:'<svg viewBox="0 0 160 60"><ellipse cx="80" cy="30" rx="74" ry="22" fill="COLOR"/><ellipse cx="80" cy="28" rx="46" ry="11" fill="#0001"/></svg>'
};
const PRODUCTS=[
 {id:1,cat:"vase",shape:"vase",color:"#d9d2c3",image:"",
  name:{vi:"Bình Sương Mai",en:"Morning Dew Vase"},
  desc:{vi:"Bình cao men trắng ngà, cổ thon, hợp với một cành khô.",en:"Tall ivory-glazed vase with a slender neck, made for a single dry branch."},
  meta:{vi:"Cao 28 cm · Men trắng ngà",en:"H 28 cm · Ivory glaze"}},
 {id:2,cat:"bowl",shape:"bowl",color:"#b7a58c",image:"",
  name:{vi:"Tô Đất Nung",en:"Terracotta Bowl"},
  desc:{vi:"Tô sâu lòng, men mờ màu đất, dùng cho cơm hoặc salad.",en:"Deep matte bowl in earthy tones, for rice or salad."},
  meta:{vi:"Ø 16 cm · Men mờ",en:"Ø 16 cm · Matte glaze"}},
 {id:3,cat:"cup",shape:"cup",color:"#8f9a8b",image:"",
  name:{vi:"Ly Rêu Xanh",en:"Moss Cup"},
  desc:{vi:"Ly nhỏ men xanh rêu, quai tròn vừa tay.",en:"Small moss-green cup with a rounded handle."},
  meta:{vi:"250 ml · Men xanh rêu",en:"250 ml · Moss glaze"}},
 {id:4,cat:"plate",shape:"plate",color:"#e6e1d6",image:"",
  name:{vi:"Đĩa Sóng Cát",en:"Sand Wave Plate"},
  desc:{vi:"Đĩa phẳng viền gợn nhẹ như mặt cát sau sóng.",en:"Flat plate with a gently rippled rim, like sand after the tide."},
  meta:{vi:"Ø 24 cm · Men kem",en:"Ø 24 cm · Cream glaze"}},
 {id:5,cat:"vase",shape:"vase",color:"#a8785f",image:"",
  name:{vi:"Bình Hoàng Thổ",en:"Loess Vase"},
  desc:{vi:"Bình bầu men nâu đất, bề mặt thô để lộ vân tay người nặn.",en:"Round brown-glazed vase, raw surface revealing the maker's fingerprints."},
  meta:{vi:"Cao 20 cm · Men nâu đất",en:"H 20 cm · Earth brown glaze"}},
 {id:6,cat:"bowl",shape:"bowl",color:"#cfd4d6",image:"",
  name:{vi:"Chén Sương Khói",en:"Mist Bowl"},
  desc:{vi:"Chén nhỏ men xám khói, hợp trà hoặc món tráng miệng.",en:"Small smoky-grey bowl for tea or dessert."},
  meta:{vi:"Ø 11 cm · Men xám",en:"Ø 11 cm · Grey glaze"}}
];
const CATS={all:{vi:"Tất cả",en:"All"},vase:{vi:"Bình",en:"Vases"},bowl:{vi:"Tô & chén",en:"Bowls"},cup:{vi:"Ly",en:"Cups"},plate:{vi:"Đĩa",en:"Plates"}};
