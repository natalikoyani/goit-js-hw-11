!function(){function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},t={},a=n.parcelRequired7c6;null==a&&((a=function(e){if(e in r)return r[e].exports;if(e in t){var n=t[e];delete t[e];var a={id:e,exports:{}};return r[e]=a,n.call(a.exports,a,a.exports),a.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,n){t[e]=n},n.parcelRequired7c6=a);var o=a("bpxeT"),i=a("2TvXO"),s=a("dIxxU"),c=a("h6c0i"),l=a("5IjG7"),u=document.querySelector("#search-form"),p=document.querySelector(".gallery"),f=document.querySelector(".js-guard"),d="https://pixabay.com/api/",h="39228988-9f38d0df7f0bcbddd9d36da69",y=1,m=40,g=new(e(l))(".gallery a",{captionDelay:250}),v=new IntersectionObserver((function(e){return q.apply(this,arguments)}),{rootMargin:"300px"});function b(){return(b=e(o)(e(i).mark((function n(r){var t,a,o;return e(i).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r.preventDefault(),p.innerHTML="",y=1,t=u.elements.searchQuery.value.trim().replaceAll(" ","+"),v.unobserve(f),e.prev=5,e.next=8,w(t);case 8:0===(a=e.sent).hits.length?c.Notify.failure("Sorry, there are no images matching your search query. Please try again."):""===t?c.Notify.failure("Search field can't be empty!"):(c.Notify.info("Hooray! We found ".concat(a.totalHits," images.")),p.innerHTML=k(a.hits),g.refresh(),L(),o=Math.ceil(a.totalHits/m),y<o&&v.observe(f)),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(5),console.error(e.t0),c.Notify.failure("An error occurred while fetching images. Please try again later.");case 16:case"end":return e.stop()}}),n,null,[[5,12]])})))).apply(this,arguments)}function w(e){return x.apply(this,arguments)}function x(){return(x=e(o)(e(i).mark((function n(r){var t,a;return e(i).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new URLSearchParams({key:h,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:m,page:y}),e.next=3,s.default.get("".concat(d,"?").concat(t));case 3:return a=e.sent,e.abrupt("return",a.data);case 5:case"end":return e.stop()}}),n)})))).apply(this,arguments)}function k(e){return e.map((function(e){var n=e.largeImageURL,r=e.webformatURL,t=e.tags,a=e.likes,o=e.views,i=e.comments,s=e.downloads;return'<div class="photo-card">\n        <a href="'.concat(n,'"><img src="').concat(r,'" alt="').concat(t,'" loading="lazy"/></a>\n        <div class="info">\n          <p class="info-item">\n            <b>Likes <span class="info-span">').concat(a,'</span></b>\n          </p>\n          <p class="info-item">\n            <b>Views <span class="info-span">').concat(o,'</span></b>\n          </p>\n          <p class="info-item">\n            <b>Comments <span class="info-span">').concat(i,'</span></b>\n          </p>\n          <p class="info-item">\n            <b>Downloads <span class="info-span">').concat(s,"</span></b>\n          </p>\n        </div>\n      </div>")})).join("")}function L(){var e=document.querySelector(".gallery").firstElementChild.getBoundingClientRect().height;window.scrollBy({top:2*e,behavior:"smooth"})}function q(){return q=e(o)(e(i).mark((function n(r){return e(i).wrap((function(n){for(;;)switch(n.prev=n.next){case 0:r.forEach(function(){var n=e(o)(e(i).mark((function n(r){var t,a,o;return e(i).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!r.isIntersecting){e.next=17;break}return y+=1,t=u.elements.searchQuery.value.replaceAll(" ","+"),e.prev=3,e.next=6,w(t);case 6:a=e.sent,p.insertAdjacentHTML("beforeend",k(a.hits)),g.refresh(),o=Math.ceil(a.totalHits/m),y>=o&&v.unobserve(f),e.next=17;break;case 13:e.prev=13,e.t0=e.catch(3),console.error(e.t0),c.Notify.failure("An error occurred while fetching more images. Please try again later.");case 17:case"end":return e.stop()}}),n,null,[[3,13]])})));return function(e){return n.apply(this,arguments)}}());case 1:case"end":return n.stop()}}),n)}))),q.apply(this,arguments)}u.addEventListener("submit",(function(e){return b.apply(this,arguments)}))}();
//# sourceMappingURL=infinity_scroll.58fb9058.js.map