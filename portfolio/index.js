function scrollHeader() {
  let scrollPos = window.scrollY;
  if (scrollPos > 0) {
      header.classList.add('fixed');
  } else {
      header.classList.remove('fixed');
  }
}

function toggleMenu() {
  body.classList.toggle('lock');
  menuToggle.classList.toggle('active');
  menuContainer.classList.toggle('active');
}

function closeMenu(event) {
  if (event.target.classList.contains('nav-link')) {
    menuToggle.classList.remove('active');
    menuContainer.classList.remove('active');
  }
}

const header = document.querySelector('.header-container-inner');
window.addEventListener('scroll', scrollHeader);

const body = document.querySelector('body');
const menuToggle = document.querySelector('.menu-toggle');
const menuContainer = document.querySelector('.header-container-menu');
const menu = document.querySelector('.nav');

menuToggle.onmousedown = function() {
  return false;
};

menuToggle.addEventListener('click', toggleMenu);
menu.addEventListener('click', closeMenu);

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