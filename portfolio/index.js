function addClassName(className,...elements) {
  for (let name of elements) {
    name.classList.add(className);
  }
}

function removeClassName(className,...elements) {
  for (let name of elements) {
    name.classList.remove(className);
  }
}

function toggleClassName(className,...elements) {
  for (let name of elements) {
    name.classList.toggle(className);
  }
}

function scrollHeader() {
  let scrollPos = window.scrollY;
  if (scrollPos > 0) {
      addClassName('fixed', header);
  } else {
      removeClassName('fixed', header);
  }
}

function toggleMenu() {
  toggleClassName('active', menuToggle, menuContainer);
  toggleClassName('lock', body);
}

function closeMenu(event) {
  if (event.target.classList.contains('nav-link')) {
    removeClassName('active', menuToggle, menuContainer);
    removeClassName('lock', body);
  }
}

function changeImage(event) {
  if(event.target.classList.contains('portfolio-button')) {
    let season = event.target.dataset.season;
    portfolioImages.forEach((img, index) => img.src = `assets/img/${season}/${index + 1}.jpg`);
  }
}

function changeBtn(event) {
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

function getTranslate(lang) {
  const elementforTranslate = document.querySelectorAll('[data-i18n]');
  elementforTranslate.forEach(element => {
    let text = element.dataset.i18n;
    element.textContent =  i18nObj[lang][text];
  });

}

function changeLang(event) {
  if(event.target.classList.contains('lang')) {
    let lang = event.target.dataset.i18n;
    if (lang === 'ru') {
      addClassName('ru', langToggle, headerMenu);
    } else {
      removeClassName('ru', langToggle, headerMenu);
    }
    getTranslate(lang);
  }
}
// =========================================================================

// header scrolling
const header = document.querySelector('.header-container-inner');

window.addEventListener('scroll', scrollHeader);

// burger-menu
const body = document.querySelector('body');
const menuToggle = document.querySelector('.menu-toggle');
const menuContainer = document.querySelector('.header-container-menu');
const menu = document.querySelector('.nav');

menuToggle.onmousedown = function() {
  return false;
};

menuToggle.addEventListener('click', toggleMenu);
menu.addEventListener('click', closeMenu);

// portfolio change image
const portfolioImages = document.querySelectorAll('.portfolio-img')
const portfolioBtns = document.querySelectorAll('.portfolio-button')
const portfolioForm = document.querySelector('.portfolio-form');

portfolioForm.addEventListener('click', changeImage);
portfolioForm.addEventListener('click', changeBtn);

// cached image
const seasons = ['winter', 'spring', 'summer', 'autumn'];

seasons.forEach(season =>cachedImages(season));

// translated
import i18nObj from './translate.js';
const langToggle = document.querySelector('.lang-toggle');
const headerMenu = document.querySelector('.header-container-menu');

langToggle.addEventListener('click', changeLang);


console.log(`
Соответствие вёрстке:
  Вёрстка соответствует макету Ширина экрана 768px +48:
    блок <header> +6
    секция hero +6
    секция skills +6
    секция portfolio +6
    секция video +6
    секция price +6
    секция contacts +6
    блок <footer> +6
  Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки +15
    нет полосы прокрутки при ширине страницы от 1440рх до 768рх +5
    нет полосы прокрутки при ширине страницы от 768рх до 480рх +5
    нет полосы прокрутки при ширине страницы от 480рх до 320рх +5
  На ширине экрана 768рх и меньше реализовано адаптивное меню +22
    при ширине страницы 768рх панель навигации скрывается, появляется бургер-иконка +2
    при нажатии на бургер-иконку справа плавно появляется адаптивное меню, бургер-иконка изменяется на крестик +4
    высота адаптивного меню занимает всю высоту экрана. При ширине экрана 768-620рх вёрстка меню соответствует макету, когда экран становится уже, меню занимает всю ширину экрана +4
    при нажатии на крестик адаптивное меню плавно скрывается уезжая за правую часть экрана, крестик превращается в бургер-иконку +4
    бургер-иконка, которая при клике превращается в крестик, создана при помощи css-анимаций без использования изображений +2
    ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям +2
    при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, крестик превращается в бургер-иконку +4


  Итого: 85`);