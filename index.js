import{a as L,S as w,i as n}from"./assets/vendor-CucEYOFD.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();const S="55235780-cc5bf4fbb6f37173e9416e03e";async function u(o,t){return(await L.get("https://pixabay.com/api/",{params:{key:S,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15}})).data}const f=document.querySelector(".gallery"),m=document.querySelector(".loader"),y=document.querySelector(".load-more-btn"),v=new w(".gallery a",{captionsData:"alt",captionDelay:250});function h(o){const t=o.map(r=>`
       <li class="gallery-item">
          <a class="gallery-link" href="${r.largeImageURL}">
            <img
              class="gallery-image"
              src="${r.webformatURL}"
              alt="${r.tags}"
            />
          </a>
          <div class="info">
            <p class="info-item"><b>Likes</b>${r.likes}</p>
            <p class="info-item"><b>Views</b>${r.views}</p>
            <p class="info-item"><b>Comments</b>${r.comments}</p>
            <p class="info-item"><b>Downloads</b>${r.downloads}</p>
          </div>
        </li>
    `).join("");f.insertAdjacentHTML("beforeend",t),v.refresh()}function q(){f.innerHTML=""}function g(){m.classList.remove("hidden")}function p(){m.classList.add("hidden")}function b(){y.classList.remove("hidden")}function l(){y.classList.add("hidden")}const M=document.querySelector(".form"),P=document.querySelector(".load-more-btn");let a=1,c="";M.addEventListener("submit",B);P.addEventListener("click",$);async function B(o){if(o.preventDefault(),c=o.target.elements["search-text"].value.trim(),!!c){a=1,q(),l(),g();try{const t=await u(c,a);if(t.totalHits===0){n.error({message:"Sorry, there are no images matching your search query. Please try again!"});return}h(t.hits);const r=Math.ceil(t.totalHits/15);a<r?b():(l(),n.info({message:"We're sorry, but you've reached the end of search results."})),o.target.reset()}catch(t){n.error({message:"Something went wrong. Please try again later."}),console.log(t)}finally{p()}}}async function $(){a+=1,l(),g();try{const o=await u(c,a);h(o.hits);const r=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"});const i=Math.ceil(o.totalHits/15);a<i?b():(l(),n.info({message:"We're sorry, but you've reached the end of search results."}))}catch(o){n.error({message:"Something went wrong. Please try again later."}),console.log(o)}finally{p()}}
//# sourceMappingURL=index.js.map
