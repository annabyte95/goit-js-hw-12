import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';

import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more-btn');

let page = 1;
let query = '';

form.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', handleLoadMore);

async function handleSubmit(event) {
  event.preventDefault();

  query = event.target.elements['search-text'].value.trim();

  if (!query) {
    return;
  }

  page = 1;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const response = await getImagesByQuery(query, page);

    if (response.totalHits === 0) {
      hideLoader();

      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }
    createGallery(response.hits);
    hideLoader();

    const totalPages = Math.ceil(response.totalHits / 15);

    if (page < totalPages) {
      showLoadMoreButton();
    }

    event.target.reset();
  } catch (error) {
    hideLoader();
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
    });

    console.log(error);
  }
}

async function handleLoadMore() {
  page += 1;
  showLoader();

  try {
    const response = await getImagesByQuery(query, page);

    createGallery(response.hits);
    hideLoader();

    const card = document.querySelector('.gallery-item');
    const cardHeight = card.getBoundingClientRect().height;

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    const totalPages = Math.ceil(response.totalHits / 15);

    if (page >= totalPages) {
      hideLoadMoreButton();

      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    hideLoader();

    iziToast.error({
      message: 'Something went wrong. Please try again later.',
    });

    console.log(error);
  }
}
