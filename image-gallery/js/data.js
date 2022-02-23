import {rend} from  './page.js';

function showImg(data) {
  if (rend.isExist) {
    updateImage(data);
  } else {
    createImage(data)
  }
}

function updateImage(data) {
  rend.clear();
  data.forEach((item, i) => {
    rend.updateElement(i, item.urls.regular)
  });
  rend.render();
}

function createImage(data) {
  data.forEach(item => {
    rend.addElement(item.urls.regular);
  });
  rend.render();
  rend.clickElement();
  rend.isExist = true;
}

async function getData() {
  let url = `https://api.unsplash.com/search/photos?query=${value}&per_page=30&orientation=landscape&client_id=9339eeHreXZVOwRBse7FNOR9WXu-mRVnSM922YMjFd4`;
  const res = await fetch(url);
  const data = await res.json();
  showImg(data.results)
}

const inputSubcribe = () => {
  searchInput.addEventListener('keydown', checkEnter)
  searchIcon.addEventListener('click', checkValue)

}

const checkEnter = (e) => {
  if (e.keyCode === 13) {
    checkValue()
  }
}

const checkValue = () => {
    value = searchInput.value;
    getData()
}

let value = 'funny';
const searchInput = document.querySelector('.search-input');
const searchIcon = document.querySelector('.fa-search');

export {getData, inputSubcribe}