import * as mainFunction from  './functions.js';

export function setLocalStorage() {
  const checkedlang = document.querySelector('input[name="lang"]:checked');
  let lang = checkedlang.value;
  localStorage.setItem('lang', lang);

  let theme = 'dark';
  const themeToggleIcon = document.querySelector('.theme-icon');
  if (themeToggleIcon.classList.contains('light')) {
    theme = 'light';
  }
  localStorage.setItem('theme', theme);
}

export function getLocalStorage() {
  if (localStorage.getItem('lang')) {
    const lang = localStorage.getItem('lang');
    mainFunction.getTranslate(lang);
  }

  if (localStorage.getItem('theme')) {
    const theme = localStorage.getItem('theme');
    getTheme(theme);
  }
}

function getTheme(theme) {
  if (theme === 'light') {
    mainFunction.addClassName('light', document.documentElement);
    mainFunction.changeSVG();
  }
}
