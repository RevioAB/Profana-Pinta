if(window.matchMedia('(max-width:760px)').matches){const mobileStyle=document.createElement('link');mobileStyle.rel='stylesheet';mobileStyle.href='/mobile.css';document.head.appendChild(mobileStyle);const mobileScript=document.createElement('script');mobileScript.src='/mobile.js';mobileScript.defer=true;document.body.appendChild(mobileScript)}
const spiceStyle=document.createElement('link');spiceStyle.rel='stylesheet';spiceStyle.href='/spice-focus.css';document.head.appendChild(spiceStyle);
const editorialStyle=document.createElement('link');editorialStyle.rel='stylesheet';editorialStyle.href='/graza-editorial.css';document.head.appendChild(editorialStyle);
const premiumStyle=document.createElement('link');premiumStyle.rel='stylesheet';premiumStyle.href='/premium-retail.css';document.head.appendChild(premiumStyle);
const products=[
{id:'santa',name:'SANTA',eyebrow:'EVERYDAY',type:'ALL PURPOSE SEASONING',line:'GARLIC • PAPRIKA • ONION • BLACK PEPPER',description:'Warm, savoury and built for everyday food. The one to keep next to the stove and use without thinking.',best:'CHICKEN • EGGS • POTATOES',weight:'90 G',price:119,tone:'yellow',badge:'01',uses:['EGGS','CHICKEN','POTATOES','VEG'],tag:'ALL PURPOSE / ALL PANTRY'},
{id:'diabla',name:'DIABLA',eyebrow:'SMOKY HEAT',type:'SMOKY CHILLI SEASONING',line:'SMOKED CHILLI • GARLIC • LIME • CUMIN',description:'Smoky chilli, bright lime and cumin. Heat with enough flavour to make tacos, steak and potatoes taste finished.',best:'TACOS • BEEF • FRIES',weight:'90 G',price:119,tone:'red',badge:'02',uses:['TACOS','BEEF','FRIES','BEANS'],tag:'SMOKY / BRIGHT / BOLD'},
{id:'verde',name:'VERDE',eyebrow:'BRIGHT HERB',type:'HERB AND LEMON SEASONING',line:'HERBS • LEMON • GARLIC • BLACK PEPPER',description:'Fresh herbs, lemon and garlic. The bright one for pasta, fish, halloumi and anything that needs waking up.',best:'PASTA • FISH • HALLOUMI',weight:'90 G',price:119,tone:'green',badge:'03',uses:['PASTA','FISH','SALAD','HALLOUMI'],tag:'HERBY / ZIPPY / BRIGHT'}
];
const cart={};const $=s=>document.querySelector(s);const $$=s=>[...document.querySelectorAll(s)];
function bottle(p,tilt=''){return `<div class="bottleWrap ${tilt}"><div class="shadow"></div><div class="bottle ${p.tone==='red'?'red':p.tone==='green'?'green':''}"><div class="neck"></div><div class="cap"></div><div class="label"><div class="brand">PROFANA PINTA</div><div class="name">${p.name}</div><div class="type">${p.type}</div><div class="tag">${p.weight} • ${p.tag}</div></div><div class="badge">${p.badge}</div></div></div>`}
function setBottles(el){el.innerHTML=bottle(products[0],'leftTilt')+bottle(products[1])+bottle(products[2],'rightTilt')}
setBottles($('#heroBottles'));setBottles($('#trioBottles'));

$('.hero h1').innerHTML='Good food.<br><em>Bad manners.</em>';
$('.intro h2').innerHTML='Less collecting.<br>More cooking.';
$('.how .sectionHead h2').textContent='These are not delicate.';
$('.recipes .sectionHead h2').textContent='Dinner in a very good mood.';
$('.quote').textContent='The best seasoning is the one you actually reach for.';
$('.newsletter h2').innerHTML='10% off your<br>first order.';
$('.hero .kicker').textContent='SEASONING BLENDS / STOCKHOLM / EST. 2026';
$('.hero .lead').textContent='Three everyday seasoning blends. One for everything, one for heat and one for freshness.';
$('.hero .actions .dark').textContent='SHOP THE TRIO · 299 SEK';
const facts=document.createElement('section');facts.className='productFacts';facts.setAttribute('aria-label','Product facts');facts.innerHTML='<div><small>THE RANGE</small><strong>3 everyday blends</strong></div><div><small>EACH BOTTLE</small><strong>90 g seasoning</strong></div><div><small>SINGLE</small><strong>119 SEK</strong></div><div><small>STARTER TRIO</small><strong>299 SEK</strong></div>';$('.hero').insertAdjacentElement('afterend',facts);
$('.intro .kicker').textContent='THREE BLENDS. ONE BETTER PANTRY.';
$('.intro>p').innerHTML='Santa, Diabla and Verde cover the food you actually cook. Three clear flavour profiles, made to be used generously and often.';
const trio=$('.trioCopy');trio.querySelector('.kicker').textContent='THE STARTER SPICE TRIO';trio.querySelector('h2').innerHTML='The three you<br>actually need.';trio.querySelector('p:not(.kicker)').textContent='Three 90 g seasoning blends that take care of everyday cooking, smoky heat and bright freshness.';trio.querySelector('ul').innerHTML='<li><b>SANTA</b><span>all purpose seasoning for eggs, chicken and potatoes</span></li><li><b>DIABLA</b><span>smoky chilli seasoning for tacos, beef and fries</span></li><li><b>VERDE</b><span>herb and lemon seasoning for pasta, fish and halloumi</span></li>';
$('.shop .kicker').textContent='THE THREE BLENDS';
$('.shop .sectionHead h2').textContent='Meet the seasonings.';
$('.shop .sectionHead>p').textContent='Three distinct blends, each built around the food you already make.';

$('#productGrid').innerHTML=products.map(p=>`<article class="product ${p.tone}"><div class="productVisual">${bottle(p)}</div><div class="productInfo"><div class="productMeta"><span>${p.eyebrow} • ${p.weight}</span><span>${p.price} SEK</span></div><h3>${p.name}</h3><div class="productType">${p.type}</div><div class="flavour">${p.line}</div><p>${p.description}</p><div class="bestOn"><b>BEST ON</b>${p.best}</div><button class="add" data-add="${p.id}">ADD TO BAG</button></div></article>`).join('');
function notify(message){const el=$('#toast');el.textContent=message;el.hidden=false;clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>el.hidden=true,1700)}
function add(id){cart[id]=(cart[id]||0)+1;renderCart();notify(id==='trinity'?'SPICE TRIO ADDED.':`${products.find(p=>p.id===id).name} ADDED.`)}
function change(id,n){cart[id]=Math.max(0,(cart[id]||0)+n);if(!cart[id])delete cart[id];renderCart()}
function rows(){return Object.entries(cart).map(([id,quantity])=>({...(id==='trinity'?{id:'trinity',name:'THE STARTER SPICE TRIO',price:299,icon:'TRIO'}:{...products.find(p=>p.id===id),icon:products.find(p=>p.id===id).name.slice(0,2)}),quantity}))}
function renderCart(){const data=rows(),count=data.reduce((a,b)=>a+b.quantity,0),sum=data.reduce((a,b)=>a+b.quantity*b.price,0);$('#bagCount').textContent=count;$('#cartTitle').textContent=`BAG (${count})`;$('#subtotal').textContent=`${sum} SEK`;$('#cartFoot').hidden=!data.length;$('#cartBody').innerHTML=data.length?data.map(i=>`<div class="cartItem"><div class="thumb ${i.id}">${i.icon}</div><div class="itemText"><strong>${i.name}</strong><span>${i.price} SEK</span><div class="qty"><button data-q="${i.id}" data-d="-1">−</button><span>${i.quantity}</span><button data-q="${i.id}" data-d="1">＋</button></div></div></div>`).join(''):`<div class="empty"><h3>BAG LOOKS EMPTY.</h3><p>That feels fixable.</p><a href="#shop" class="btn lime" id="emptyShop">GO SHOPPING</a></div>`;$('#emptyShop')?.addEventListener('click',closeCart);$$('[data-q]').forEach(b=>b.onclick=()=>change(b.dataset.q,Number(b.dataset.d)))}
function openCart(){renderCart();$('#scrim').hidden=false;$('#cart').hidden=false;document.body.style.overflow='hidden'}
function closeCart(){$('#scrim').hidden=true;$('#cart').hidden=true;document.body.style.overflow=''}
document.addEventListener('click',e=>{const b=e.target.closest('[data-add]');if(b){add(b.dataset.add);if(b.hasAttribute('data-open'))openCart()}});
$('#bagOpen').onclick=openCart;$('#cartClose').onclick=closeCart;$('#scrim').onclick=()=>{closeCart();$('#mobileMenu').hidden=true;document.body.style.overflow=''};$('#checkout').onclick=()=>notify('DEMO CHECKOUT. CONNECT STRIPE BEFORE LAUNCH.');$('#newsletter').onsubmit=e=>{e.preventDefault();e.currentTarget.reset();notify('YOU’RE IN.');};$('#menuOpen').onclick=()=>{$('#mobileMenu').hidden=false;$('#scrim').hidden=false;document.body.style.overflow='hidden'};$('#menuClose').onclick=()=>{$('#mobileMenu').hidden=true;$('#scrim').hidden=true;document.body.style.overflow=''};$$('#mobileMenu a').forEach(a=>a.onclick=()=>{$('#mobileMenu').hidden=true;$('#scrim').hidden=true;document.body.style.overflow=''});renderCart();
