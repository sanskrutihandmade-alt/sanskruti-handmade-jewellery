const products = [
  {name:'Ruby Detail Long Haar',category:'Necklaces',image:'assets/ruby-long-necklace-set.jpeg',tag:'Traditional edit',desc:'Multi-layer gold-tone haar with ruby accents.'},
  {name:'Pearl Blossom Earrings',category:'Earrings',image:'assets/pearl-flower-earrings.jpeg',tag:'Floral details',desc:'Pearl flower earrings with colourful stone centres.'},
  {name:'Temple Pendant Necklace',category:'Sets',image:'assets/temple-pendant-necklace.jpeg',tag:'Heritage edit',desc:'Traditional gold-tone necklace with pendant details.'},
  {name:'Antique Gold Choker',category:'Necklaces',image:'assets/antique-gold-choker.jpeg',tag:'Statement piece',desc:'Bold antique-finish choker design.'},
  {name:'Floral Gold Necklace',category:'Necklaces',image:'assets/floral-gold-necklace.jpeg',tag:'Classic favourite',desc:'Gold-tone floral necklace with a traditional finish.'},
  {name:'Ruby Floral Haar',category:'Sets',image:'assets/floral-ruby-necklace.jpeg',tag:'Festive favourite',desc:'Traditional necklace with ruby-colour accents.'},
  {name:'Antique Bead Necklace',category:'Sets',image:'assets/antique-bead-necklace.jpeg',tag:'Traditional edit',desc:'Antique gold-tone beaded necklace and matching earrings.'},
  {name:'Long Bead Necklace',category:'Necklaces',image:'assets/long-bead-necklace.jpeg',tag:'Everyday tradition',desc:'Long multi-strand gold-tone bead necklace.'},
  {name:'Red Bead Long Mala',category:'Necklaces',image:'assets/red-bead-necklace.jpeg',tag:'Classic favourite',desc:'Long gold-tone beads with red accents.'},
  {name:'Gold Bead Mala',category:'Necklaces',image:'assets/gold-bead-necklace.jpeg',tag:'Handpicked',desc:'Traditional multi-line gold-tone bead necklace.'},
  {name:'Antique Necklace & Earrings',category:'Sets',image:'assets/antique-necklace-earrings.jpeg',tag:'Complete look',desc:'Coordinated traditional necklace and earrings.'},
  {name:'Gold Spike Choker',category:'Necklaces',image:'assets/gold-spike-choker.jpeg',tag:'Statement piece',desc:'Gold-tone traditional choker with textured detailing.'}
];
const grid=document.getElementById('productGrid');
function whatsappLink(message){const n=window.SANSKRUTI_CONFIG?.whatsappNumber||'91XXXXXXXXXX';return /^\d{10,15}$/.test(n)?`https://wa.me/${n}?text=${encodeURIComponent(message)}`:'#contact';}
const productSelect=document.getElementById('purchaseProduct');
products.forEach(product=>{const option=document.createElement('option');option.value=product.name;option.textContent=product.name;productSelect.append(option)});
function render(filter='All'){
  const list=products.filter(p=>filter==='All'||p.category===filter);
  grid.innerHTML=list.map((p)=>`<article class="product-card"><div class="product-image"><img loading="lazy" src="${p.image}" alt="${p.name}"><span class="product-tag">${p.tag}</span></div><div class="product-info"><h3>${p.name}</h3><p>${p.desc}</p><a href="${whatsappLink(`Hello Sanskruti! I am interested in ${p.name}. Please share the price and availability.`)}" target="_blank" rel="noreferrer">Enquire for price ↗</a></div></article>`).join('');
}
document.getElementById('filters').addEventListener('click',e=>{const b=e.target.closest('button[data-filter]');if(!b)return;document.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x===b));render(b.dataset.filter)});
document.querySelectorAll('.category-card').forEach(card=>card.addEventListener('click',()=>{const f=card.dataset.filter;document.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x.dataset.filter===f));render(f)}));
const wa=whatsappLink('Hello Sanskruti! I would like to know more about your jewellery collection.');['footerWhatsApp','floatingWhatsApp'].forEach(id=>{const el=document.getElementById(id);el.href=wa;if(wa==='#contact')el.removeAttribute('target');else el.target='_blank';el.rel='noreferrer'});
document.getElementById('purchaseEnquiry').addEventListener('submit',async event=>{
  event.preventDefault();
  const form=event.currentTarget;
  if(!form.reportValidity())return;
  const details=new FormData(form);
  const mobileField=form.elements.mobile;
  const mobileDigits=String(details.get('mobile')).replace(/\D/g,'');
  if(mobileDigits.length<10||mobileDigits.length>15){mobileField.setCustomValidity('Enter a mobile number with 10 to 15 digits.');mobileField.reportValidity();return}
  mobileField.setCustomValidity('');
  const message=[
    'Hello Sanskruti! I would like to enquire about purchasing a jewellery piece.',
    '',
    `Name: ${details.get('name')}`,
    `Email: ${details.get('email')}`,
    `Mobile: ${details.get('mobile')}`,
    `Product: ${details.get('product')}`,
    `Quantity: ${details.get('quantity')}`,
    '',
    'Please confirm the price and availability, and guide me through checkout.'
  ].join('\n');
  const link=whatsappLink(message);
  const whatsappWindow=link==='#contact'?null:window.open('about:blank','_blank');
  if(whatsappWindow)whatsappWindow.opener=null;
  const submitButton=form.querySelector('button[type="submit"]');
  const formStatus=document.getElementById('formStatus');
  submitButton.disabled=true;
  formStatus.textContent='Saving your enquiry...';
  try{
    const response=await fetch('/api/enquiries',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        name:details.get('name'),
        email:details.get('email'),
        mobile:details.get('mobile'),
        product:details.get('product'),
        quantity:Number(details.get('quantity'))
      })
    });
    const result=await response.json().catch(()=>({}));
    if(!response.ok)throw new Error(result.error||'We could not save your enquiry. Please try again.');
    formStatus.textContent='Enquiry saved. Continuing to WhatsApp...';
    form.reset();
    if(link==='#contact'){
      formStatus.textContent='Enquiry saved, but WhatsApp is unavailable right now. Please contact us by email.';
    }else if(whatsappWindow){
      whatsappWindow.location.href=link;
    }else{
      window.location.assign(link);
    }
  }catch(error){
    if(whatsappWindow&&!whatsappWindow.closed)whatsappWindow.close();
    formStatus.textContent=error instanceof Error?error.message:'We could not save your enquiry. Please try again.';
  }finally{
    submitButton.disabled=false;
  }
});
document.getElementById('customerMobile').addEventListener('input',event=>event.currentTarget.setCustomValidity(''));
const menu=document.getElementById('menuToggle'),nav=document.getElementById('mainNav');menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'×':'☰'});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='☰'}));
document.getElementById('year').textContent=new Date().getFullYear();render();
