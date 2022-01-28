import {addClassName, removeClassName, toggleClassName} from  './functions.js';
import {setLocalStorage, getLocalStorage} from  './localStorage.js';
import i18nObj from './translate.js';

function scrollHeader() {
  const header = document.querySelector('.header-container-inner');
  if (window.scrollY > 0) {
      addClassName('fixed', header);
  } else {
      removeClassName('fixed', header);
  }
}

function toggleMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const menuContainer = document.querySelector('.header-container-menu');
  const body = document.querySelector('body');

  menuToggle.onmousedown = function() {
    return false;
  };

  toggleClassName('active', menuToggle, menuContainer);
  toggleClassName('lock', body);
}


function closeMenu(event) {
  const menuToggle = document.querySelector('.menu-toggle');
  const menuContainer = document.querySelector('.header-container-menu');
  const body = document.querySelector('body');
  if (event.target.classList.contains('nav-link')) {
    removeClassName('active', menuToggle, menuContainer);
    removeClassName('lock', body);
  }
}

function changeImage(event) {
  const portfolioImages = document.querySelectorAll('.portfolio-img');
  if(event.target.classList.contains('portfolio-button')) {
    let season = event.target.dataset.season;
    portfolioImages.forEach((img, index) => img.src = `assets/img/${season}/${index + 1}.jpg`);
  }
}

function changeBtn(event) {
  const portfolioBtns = document.querySelectorAll('.portfolio-button');
  if(event.target.classList.contains('portfolio-button')) {
    portfolioBtns.forEach((btn) => btn.classList.remove('active'));
    addClassName('active', event.target);
  }
}

function cachedImages(season) {
  for(let i = 1; i <= 6; i++) {
    const img = new Image();
    img.src = `assets/img/${season}/${i}.jpg`;
  }
}

function changeLang(event) {
  if (event.target.classList.contains('lang')) {
    let lang = event.target.dataset.i18n;
    getTranslate(lang);
  }
}

function getTranslate(lang) {
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

function changeTheme() {
  toggleClassName('light', document.documentElement);
}

function changeSVG() {
  const themeToggleUse = document.querySelector('.theme-use');
  if (document.documentElement.classList.contains('light')) {
    themeToggleUse.setAttributeNS('http://www.w3.org/1999/xlink', 'href', './assets/svg/sprite.svg#moon');
  } else {
    themeToggleUse.setAttributeNS('http://www.w3.org/1999/xlink', 'href', './assets/svg/sprite.svg#sun');
  }
}

function createClickEffect(event) {
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

window.onload = function () {
  setTimeout(function () {
      document.getElementsByTagName("body")[0].style.visibility = "visible";
  }, 500);
}
//=============================================================================
// local storage
window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);

// translated
const langToggle = document.querySelector('.lang-toggle');
langToggle.addEventListener('click', changeLang);

// header scrolling
window.addEventListener('scroll', scrollHeader);

// burger-menu
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav');
menuToggle.addEventListener('click', toggleMenu);
menu.addEventListener('click', closeMenu);

// change image for portfolio
const portfolioForm = document.querySelector('.portfolio-form');
portfolioForm.addEventListener('click', changeImage);
portfolioForm.addEventListener('click', changeBtn);

// cached image
const seasons = ['winter', 'spring', 'summer', 'autumn'];
seasons.forEach(season => cachedImages(season));

// change theme
const themeToggle = document.querySelector('.theme');
themeToggle.addEventListener('click', changeTheme);
themeToggle.addEventListener('click', changeSVG);

// click effect
const button = document.querySelectorAll('.button');
button.forEach(element => {
  element.addEventListener('click', createClickEffect)
});

console.log(`
  Смена изображений в секции portfolio +25
    при кликах по кнопкам Winter, Spring, Summer, Autumn в секции portfolio отображаются изображения из папки с соответствующим названием +20
    кнопка, по которой кликнули, становится активной т.е. выделяется стилем. Другие кнопки при этом будут неактивными +5
  Перевод страницы на два языка +25
    при клике по надписи ru англоязычная страница переводится на русский язык +10
    при клике по надписи en русскоязычная страница переводится на английский язык +10
    надписи en или ru, соответствующие текущему языку страницы, становятся активными т.е. выделяются стилем +5
  Переключение светлой и тёмной темы +25
    тёмная тема приложения сменяется светлой +10
    светлая тема приложения сменяется тёмной +10
    после смены светлой и тёмной темы интерактивные элементы по-прежнему изменяют внешний вид при наведении и клике и при этом остаются видимыми на странице (нет ситуации с белым шрифтом на белом фоне) +5
  Дополнительный функционал: выбранный пользователем язык отображения страницы и светлая или тёмная тема сохраняются при перезагрузке страницы +5
  Дополнительный функционал: сложные эффекты для кнопок при наведении и/или клике +5

  Итого: 85`);