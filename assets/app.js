let lang=(()=>{try{return localStorage.getItem('lang')}catch(e){}})()||'vi', cat='all';
const $=s=>document.querySelector(s);
const art=p=>p.image?`<img src="${p.image}" alt="${p.name[lang]}" loading="lazy">`:SHAPES[p.shape].replace(/COLOR/g,p.color);
function render(){
  document.documentElement.lang=lang;
  document.querySelectorAll('[data-vi]').forEach(e=>e.innerHTML=e.dataset[lang]);
  $('#lang').textContent=lang==='vi'?'EN':'VI';
  $('#filters').innerHTML=Object.keys(CATS).map(k=>`<button class="${k===cat?'on':''}" data-c="${k}">${CATS[k][lang]}</button>`).join('');
  $('#grid').innerHTML=PRODUCTS.filter(p=>cat==='all'||p.cat===cat).map(p=>
    `<button class="card" data-id="${p.id}"><div class="thumb">${art(p)}</div><h3>${p.name[lang]}</h3><p>${p.meta[lang]}</p></button>`).join('');
}
function open(id){
  const p=PRODUCTS.find(x=>x.id==id);
  $('#mImg').innerHTML=art(p);$('#mName').textContent=p.name[lang];
  $('#mDesc').textContent=p.desc[lang];$('#mMeta').textContent=p.meta[lang];
  $('#mBuy').textContent=lang==='vi'?'Liên hệ đặt hàng':'Enquire to order';
  $('#modal').hidden=false;
}
const closeM=()=>$('#modal').hidden=true;
document.addEventListener('click',e=>{
  const c=e.target.closest('.card'),f=e.target.closest('[data-c]');
  if(c)open(c.dataset.id);
  else if(f){cat=f.dataset.c;render()}
  else if(e.target.id==='lang'){lang=lang==='vi'?'en':'vi';try{localStorage.setItem('lang',lang)}catch(_){}render()}
  else if(e.target.id==='close'||e.target.id==='modal'||e.target.id==='mBuy')closeM();
});
document.addEventListener('keydown',e=>e.key==='Escape'&&closeM());
$('#y').textContent=new Date().getFullYear();
render();
