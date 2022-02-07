import {Image, imageWrap, rend, searchInput} from  './page.js';

function showImg(data) {
  if (rend.isExist) {
    updateImage(data);
  } else {
    createImage(data)
  }
}

function updateImage(data) {
  rend.clear();
  rend.renderList.forEach((it, i) => {
    if (i < data.length) {
      it.url = data[i].urls.regular;
      it.isNeed = true;
    } else {
      it.isNeed = false;
    }
  })
  rend.render();
}

function createImage(data) {
  data.forEach(item => {
    let el = new Image(imageWrap, 'image', item.urls.regular);
    rend.addElement(el);
  });
  rend.render();
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

let value = 'funny';

export {getData, inputSubcribe}