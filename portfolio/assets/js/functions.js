import i18nObj from './translate.js';

export function addClassName(className,...elements) {
  for (let element of elements) {
    element.classList.add(className);
  }
}

export function removeClassName(className,...elements) {
  for (let element of elements) {
    element.classList.remove(className);
  }
}

export function toggleClassName(className,...elements) {
  for (let element of elements) {
    element.classList.toggle(className);
  }
}

export function scrollHeader() {
  const header = document.querySelector('.header-container-inner');
  if (window.scrollY > 0) {
      addClassName('fixed', header);
  } else {
      removeClassName('fixed', header);
  }
}

export function toggleMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const menuContainer = document.querySelector('.header-container-menu');
  const body = document.querySelector('body');

  menuToggle.onmousedown = function() {
    return false;
  };

  toggleClassName('active', menuToggle, menuContainer);
  toggleClassName('lock', body);
}


export function closeMenu(event) {
  const menuToggle = document.querySelector('.menu-toggle');
  const menuContainer = document.querySelector('.header-container-menu');
  const body = document.querySelector('body');
  if (event.target.classList.contains('nav-link')) {
    removeClassName('active', menuToggle, menuContainer);
    removeClassName('lock', body);
  }
}

export function changeImage(event) {
  const portfolioImages = document.querySelectorAll('.portfolio-img');
  if(event.target.classList.contains('portfolio-button')) {
    let season = event.target.dataset.season;
    portfolioImages.forEach((img, index) => img.src = `assets/img/${season}/${index + 1}.jpg`);
  }
}

export function changeBtn(event) {
  const portfolioBtns = document.querySelectorAll('.portfolio-button');
  if(event.target.classList.contains('portfolio-button')) {
    portfolioBtns.forEach((btn) => btn.classList.remove('active'));
    addClassName('active', event.target);
  }
}

export function cachedImages(season) {
  for(let i = 1; i <= 6; i++) {
    const img = new Image();
    img.src = `assets/img/${season}/${i}.jpg`;
  }
}

export function changeLang(event) {
  if (event.target.classList.contains('lang')) {
    let lang = event.target.dataset.i18n;
    getTranslate(lang);
  }
}

export function getTranslate(lang) {
  const elementforTranslate = document.querySelectorAll('[data-i18n]');
  elementforTranslate.forEach(element => {
    let text = element.dataset.i18n;
    element.textContent =  i18nObj[lang][text];
  });
  changeWidthToggle(lang);
}

function changeWidthToggle(lang) {
  const langToggle = document.querySelector('.lang-toggle');
  const headerMenu = document.querySelector('.header-container-menu');
  if (lang === 'ru') {
    addClassName('ru', langToggle, headerMenu);
  } else {
    removeClassName('ru', langToggle, headerMenu);
  }
}

export function changeTheme() {
  const elementForChangeTheme = document.querySelectorAll('[data-theme]');
  toggleClassName('light', ...elementForChangeTheme);
  changeSVG();
}

export function changeSVG() {
  const themeToggleIcon = document.querySelector('.theme-icon');
  const themeToggleUse = document.querySelector('.theme-use');
  if (themeToggleIcon.classList.contains('light')) {
    themeToggleUse.setAttributeNS('http://www.w3.org/1999/xlink', 'href', './assets/svg/sprite.svg#moon');
  } else {
    themeToggleUse.setAttributeNS('http://www.w3.org/1999/xlink', 'href', './assets/svg/sprite.svg#sun');
  }
}

export function createClickEffect(event) {
  let element = event.target;
  const x = event.clientX;
  const y = event.clientY;

  const buttonCoord = element.getBoundingClientRect();

  const xInside = x - buttonCoord.x;
  const yInside = y - buttonCoord.y;

  const circle = document.createElement('span');
  circle.classList.add('circle');
  circle.style.top = yInside + 'px';
  circle.style.left = xInside + 'px';

  element.append(circle);

  setTimeout(() => circle.remove(), 500);
}