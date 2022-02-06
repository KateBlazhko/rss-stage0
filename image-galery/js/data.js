import {imageWrap, Image, Renderer, searchInput} from  './page.js';

function showImg(data) {
  if (rend.isExist) {
    updateImage(data);
  } else {
    createImage(data)
  }
}

function updateImage(data) {
  data.forEach((item, i) => {
    rend.renderList[i].render(item.urls.regular)
    rend.renderList[i].removeClass();
  });
  for (let i = data.length; i < rend.renderList.length; i++) {
    rend.renderList[i].addClass();
  }
}

function createImage(data) {
  data.forEach(item => {
    let el = new Image(imageWrap, 'image');
    el.render(item.urls.regular);
    rend.addElement(el);
  });
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
}

const checkEnter = (e) => {
  if (e.keyCode === 13) {
    value = searchInput.value;
    getData()
  }
}

let value = 'spring';

const rend = new Renderer()

export {getData, inputSubcribe}