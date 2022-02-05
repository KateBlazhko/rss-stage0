import {imageWrap, Image} from  './page.js';

  function showImg(data) {
    data.forEach(item => {
      let el = new Image(imageWrap, 'image');
      el.render(item.urls.regular)
    });
  }

async function getData() {
    const res = await fetch(url);
    const data = await res.json();
    showImg(data.results)
  }

const url = 'https://api.unsplash.com/search/photos?query=spring&per_page=30&orientation=landscape&client_id=9339eeHreXZVOwRBse7FNOR9WXu-mRVnSM922YMjFd4';

export {getData}