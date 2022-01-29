function getLocalStorage() {
  if (localStorage.getItem('lang')) {
    const lang = localStorage.getItem('lang');
    getLang(lang);
  }

  if (localStorage.getItem('theme')) {
    const theme = localStorage.getItem('theme');
    getTheme(theme);
  }
}

function getTheme(theme) {
  if (theme === 'light') {
    document.firstElementChild.classList.add('light');
  }
}

function getLang(lang) {
  if (lang === 'ru') {
    document.firstElementChild.setAttribute('data-lang', lang);
  } else {
    document.firstElementChild.removeAttribute('data-lang');
  }
}

getLocalStorage();


