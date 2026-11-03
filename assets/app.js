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
}
function fillProduct(p) {
  const photos = p.images || (p.image ? [p.image] : []);
  $('#mImg').innerHTML = photos.length ? `<img src="${imageURL(photos[activePhoto])}" alt="${p.name[lang]} — ${activePhoto + 1}">` : art(p);
  $('#mGallery').innerHTML = photos.length > 1 ? photos.map((src, i) => `<button type="button" data-photo="${i}" aria-label="${lang === 'vi' ? 'Xem ảnh' : 'View photo'} ${i + 1}" aria-pressed="${i === activePhoto}"><img src="${imageURL(src)}" alt="" loading="lazy"></button>`).join('') : '';
  $('#mName').textContent = p.name[lang];
  $('#mDesc').textContent = p.desc[lang];
  $('#mMeta').textContent = p.meta[lang];
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
$('#y').textContent = new Date().getFullYear();
render();
