import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39228988-9f38d0df7f0bcbddd9d36da69';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');

searchForm.addEventListener('submit', handleSubmit);

async function handleSubmit(evt) {
    evt.preventDefault();
    const form = evt.currentTarget;
    const q = form.elements.searchQuery.value.replaceAll(' ', '+');
    try {
        await fetchImages(q); 
        gallery.innerHTML = createMarkup(images);
    } catch(err) {
        console.log(err);
    }
}

async function fetchImages(q) {
    const searchParams = new URLSearchParams({
        key: API_KEY,
        q: q,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
    });
    const response = await axios.get(`${BASE_URL}?${searchParams}`);
    return images = response.data.hits;
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