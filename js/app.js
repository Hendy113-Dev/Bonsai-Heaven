
const productFiles=[
"products/japanese-black-pine.json",
"products/trident-maple.json",
"products/shimpaku-juniper.json"
];
const postFiles=[
"journal/watering-bonsai-through-summer.json",
"journal/what-makes-a-great-bonsai.json"
];

async function loadJSON(files){
 return Promise.all(files.map(f=>fetch(f).then(r=>r.json())));
}
function money(v){return new Intl.NumberFormat("en-GB",{style:"currency",currency:"GBP"}).format(v)}
function productCard(p){
 return `<article class="product" data-category="${p.category}">
 <a href="products/${encodeURIComponent(p.id)}/"><img src="${p.image}" alt="${escapeHtml(p.name)} — ${escapeHtml(p.species)} bonsai"></a>
 <div class="body"><div class="muted">${escapeHtml(p.species)} · ${escapeHtml(p.height)} · ${escapeHtml(p.status)}</div>
 <h3><a href="products/${encodeURIComponent(p.id)}/">${escapeHtml(p.name)}</a></h3>
 <p>${escapeHtml(p.shortDescription)}</p><div class="price">${money(p.price)}</div>
 <a class="btn" href="products/${encodeURIComponent(p.id)}/">View tree</a></div></article>`;
}
function postCard(p){
 return `<article class="product"><a href="journal/${encodeURIComponent(p.id)}/"><img src="${p.image}" alt="${escapeHtml(p.title)}"></a>
 <div class="body"><div class="muted">${escapeHtml(p.category)} · ${formatDate(p.date)}</div><h3><a href="journal/${encodeURIComponent(p.id)}/">${escapeHtml(p.title)}</a></h3>
 <p>${escapeHtml(p.excerpt)}</p><a class="btn" href="journal/${encodeURIComponent(p.id)}/">Read article</a></div></article>`;
}
function escapeHtml(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function formatDate(d){return new Date(d+"T12:00:00").toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})}

async function init(){
 const products=await loadJSON(productFiles);
 const posts=await loadJSON(postFiles);
 const featured=document.querySelector("#featured-products");
 if(featured) featured.innerHTML=products.filter(p=>p.featured && p.status!=="sold").slice(0,3).map(productCard).join("");
 const all=document.querySelector("#all-products");
 if(all){
   const render=()=>{
    let list=[...products];
    const active=document.querySelector(".filter.active")?.dataset.filter||"all";
    if(active!=="all") list=list.filter(p=>p.category===active);
    const sort=document.querySelector("#sort")?.value;
    if(sort==="low") list.sort((a,b)=>a.price-b.price);
    if(sort==="high") list.sort((a,b)=>b.price-a.price);
    all.innerHTML=list.map(productCard).join("");
   };
   document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");render()}));
   document.querySelector("#sort").addEventListener("change",render); render();
 }
 const latest=document.querySelector("#latest-posts"); if(latest) latest.innerHTML=posts.slice(0,3).map(postCard).join("");
 const allPosts=document.querySelector("#all-posts"); if(allPosts) allPosts.innerHTML=posts.map(postCard).join("");
 const tree=document.querySelector("#tree-detail");
 if(tree){const id=new URLSearchParams(location.search).get("id");const p=products.find(x=>x.id===id);if(p) tree.innerHTML=productDetail(p); else tree.innerHTML="<h1>Tree not found</h1><a class='btn' href='shop.html'>Back to shop</a>";}
 const article=document.querySelector("#post-detail");
 if(article){const id=new URLSearchParams(location.search).get("id");const p=posts.find(x=>x.id===id);if(p) article.innerHTML=postDetail(p); else article.innerHTML="<h1>Article not found</h1><a class='btn' href='journal.html'>Back to journal</a>";}
}
function productDetail(p){
 document.title=p.seoTitle||p.name+" | Moore Bonsai";
 return `<div class="wrap article-layout"><div><img src="${p.image}" alt="${escapeHtml(p.name)} — ${escapeHtml(p.species)} bonsai"></div><div>
 <div class="eyebrow">${escapeHtml(p.category)} · ${escapeHtml(p.status)}</div><h1>${escapeHtml(p.name)}</h1><p class="muted">${escapeHtml(p.species)} · ${escapeHtml(p.height)} · ${escapeHtml(p.pot)}</p>
 <div class="price">${money(p.price)}</div><p>${escapeHtml(p.description)}</p><h3>Care</h3><p>${escapeHtml(p.care)}</p>
 <a class="btn" href="contact.html?tree=${encodeURIComponent(p.name)}">Enquire about this tree</a></div></div>
 <script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@type":"Product","name":p.name,"description":p.description,"image":[p.image],"offers":{"@type":"Offer","priceCurrency":"GBP","price":p.price.toFixed(2),"availability":p.status==="available"?"https://schema.org/InStock":"https://schema.org/SoldOut","url":location.href}})}</script>`;
}
function postDetail(p){
 document.title=p.seoTitle||p.title+" | Moore Bonsai";
 return `<div class="wrap article-layout"><article><div class="eyebrow">${escapeHtml(p.category)}</div><h1>${escapeHtml(p.title)}</h1><p class="muted">${formatDate(p.date)}</p><img src="${p.image}" alt="${escapeHtml(p.title)}"><div class="article-content"><p><strong>${escapeHtml(p.excerpt)}</strong></p>${p.content.map(x=>`<p>${escapeHtml(x)}</p>`).join("")}</div></article><aside><div class="panel"><div class="eyebrow">Moore Bonsai</div><h3>Looking for a tree?</h3><p>Browse the current collection or get in touch about a particular species or style.</p><a class="btn" href="shop.html">View available trees</a></div></aside></div>`;
}
document.addEventListener("DOMContentLoaded",init);

document.querySelector(".menu")?.addEventListener("click",()=>document.querySelector(".nav-in")?.classList.toggle("open"));
