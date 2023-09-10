import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39228988-9f38d0df7f0bcbddd9d36da69';
let page = 1;
let per_page = 5;

searchForm.addEventListener('submit', handleSubmit);
loadMoreButton.addEventListener('click', handleClick);

async function handleSubmit(evt) {
    evt.preventDefault();
    gallery.innerHTML = '';
    loadMoreButton.classList.add('is-hidden');
    page = 1;
    const q = searchForm.elements.searchQuery.value.replaceAll(' ', '+');
    
    try {
      const data = await fetchImages(q);
      if (data.hits.length === 0) {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      } else {
        gallery.innerHTML = createMarkup(data.hits);
        loadMoreButton.classList.remove('is-hidden');
      }
    } catch(err) {
      console.error(err);
      Notify.failure("An error occurred while fetching images. Please try again later.");
    }
}

async function handleClick() {
  page += 1;
  const q = searchForm.elements.searchQuery.value.replaceAll(' ', '+');
  try {
    const data = await fetchImages(q);
    const totalPages = data.totalHits / per_page;
        if(page >= totalPages) {
          loadMoreButton.classList.add('is-hidden');
          Notify.info("We're sorry, but you've reached the end of search results.");
        } else {
          gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
        }
  } catch (err) {
    console.error(err);
    Notify.failure("An error occurred while fetching more images. Please try again later.");
  }
}

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
        ({ webformatURL, tags, likes, views, comments, downloads }) => `<div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads ${downloads}</b>
          </p>
        </div>
      </div>`
    )
    .join('');
}