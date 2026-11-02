let lang = 'vi';
try { lang = localStorage.getItem('lang') === 'en' ? 'en' : 'vi'; } catch (_) {}
const $ = s => document.querySelector(s);
let activeProduct = null, previousFocus = null;
const art = p => p.image ? `<img src="${p.image}" alt="${p.name[lang]}" loading="lazy">` : SHAPES[p.shape].replace(/COLOR/g, p.color);
function render() {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-vi]').forEach(e => e.innerHTML = e.dataset[lang]);
  $('#lang').textContent = lang === 'vi' ? 'EN' : 'VI';
  if (activeProduct) fillProduct(activeProduct);
}
function fillProduct(p) {
  $('#mImg').innerHTML = art(p);
  $('#mName').textContent = p.name[lang];
  $('#mDesc').textContent = p.desc[lang];
  $('#mMeta').textContent = p.meta[lang];
  $('#mBuy').textContent = lang === 'vi' ? 'Liên hệ đặt hàng' : 'Enquire to order';
  $('#mBuy').href = $('#mBuy').dataset.contact + '?product=' + encodeURIComponent(p.name.vi);
}
function openProduct(id) {
  activeProduct = PRODUCTS.find(p => p.id === Number(id));
  if (!activeProduct) return;
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
