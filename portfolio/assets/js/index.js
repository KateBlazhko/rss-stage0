import * as mainFunction from  './functions.js';
import * as localStorage from  './localStorage.js';

// local storage
window.addEventListener('beforeunload', localStorage.setLocalStorage);
window.addEventListener('load', localStorage.getLocalStorage);

// translated
const langToggle = document.querySelector('.lang-toggle');
langToggle.addEventListener('click', mainFunction.changeLang);

// header scrolling
window.addEventListener('scroll', mainFunction.scrollHeader);

// burger-menu
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav');
menuToggle.addEventListener('click', mainFunction.toggleMenu);
menu.addEventListener('click', mainFunction.closeMenu);

// change image for portfolio
const portfolioForm = document.querySelector('.portfolio-form');
portfolioForm.addEventListener('click', mainFunction.changeImage);
portfolioForm.addEventListener('click', mainFunction.changeBtn);

// cached image
const seasons = ['winter', 'spring', 'summer', 'autumn'];
seasons.forEach(season =>mainFunction.cachedImages(season));

// change theme
const themeToggle = document.querySelector('.theme');
themeToggle.addEventListener('click', mainFunction.changeTheme);
themeToggle.addEventListener('click', mainFunction. changeSVG);

// click effect
const button = document.querySelectorAll('.button');
button.forEach(element => {
  element.addEventListener('click', mainFunction.createClickEffect)
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