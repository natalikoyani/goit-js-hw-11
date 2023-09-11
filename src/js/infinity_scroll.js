import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const guard = document.querySelector('.js-guard')

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39228988-9f38d0df7f0bcbddd9d36da69';

let page = 1;
let per_page = 40;

let lightbox = new SimpleLightbox('.gallery a', { captionDelay: 250, });

const options = {
  rootMargin: "300px",
}
const observer = new IntersectionObserver(handlerLoadMore, options);

searchForm.addEventListener('submit', handleSubmit);

async function handleSubmit(evt) {
    evt.preventDefault();
    gallery.innerHTML = '';
    page = 1;
    const q = searchForm.elements.searchQuery.value.trim().replaceAll(' ', '+').trim();
    
    try {
      const data = await fetchImages(q);
      if (data.hits.length === 0) {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      } else if(q === '') {
        Notify.failure("Search field can't be empty!");
      } else {
        Notify.info(`Hooray! We found ${data.totalHits} images.`)
        gallery.innerHTML = createMarkup(data.hits);
        lightbox.refresh();
        smoothScroll();
        const totalPages = Math.ceil(data.totalHits / per_page);
        if(page < totalPages) {
          observer.observe(guard);
        }
      }
    } catch(err) {
      console.error(err);
      Notify.failure("An error occurred while fetching images. Please try again later.");
    }
}

// async function handleClick() {
//   page += 1;
//   const q = searchForm.elements.searchQuery.value.replaceAll(' ', '+');
//   try {
//     const data = await fetchImages(q);
//     const totalPages = Math.ceil(data.totalHits / per_page);
//     gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
//   } catch (err) {
//     console.error(err);
//     Notify.failure("An error occurred while fetching more images. Please try again later.");
//   }
// }

async function fetchImages(q) {
    const searchParams = new URLSearchParams({
        key: API_KEY,
        q: q,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: per_page,
        page: page,
    });
    const response = await axios.get(`${BASE_URL}?${searchParams}`);
    return response.data;
}

function createMarkup(arr) {
    return arr
    .map(
        ({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => `<div class="photo-card">
        <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy"/></a>
        <div class="info">
          <p class="info-item">
            <b>Likes <span class="info-span">${likes}</span></b>
          </p>
          <p class="info-item">
            <b>Views <span class="info-span">${views}</span></b>
          </p>
          <p class="info-item">
            <b>Comments <span class="info-span">${comments}</span></b>
          </p>
          <p class="info-item">
            <b>Downloads <span class="info-span">${downloads}</span></b>
          </p>
        </div>
      </div>`
    )
    .join('');
}

function smoothScroll() {
    const { height: cardHeight } = document
    .querySelector(".gallery")
    .firstElementChild.getBoundingClientRect();
  
  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });
  }

async function handlerLoadMore(entries) {
  entries.forEach(async (entry) => {
    if(entry.isIntersecting) {
      page += 1;
      const q = searchForm.elements.searchQuery.value.replaceAll(' ', '+');
      try {
        const data = await fetchImages(q);
        gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
        const totalPages = Math.ceil(data.totalHits / per_page);
        if(page >= totalPages){
          observer.unobserve(elements.guard);
        }
      } catch (err) {
        console.error(err);
        Notify.failure("An error occurred while fetching more images. Please try again later.");
      }
    }
  });
}