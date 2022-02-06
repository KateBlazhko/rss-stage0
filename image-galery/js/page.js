class PageElement {
  constructor(node, tagName = 'div', className = '', content = '') {
    const el = document.createElement(tagName);
    el.className = className;
    el.innerHTML = content;
    this.node = el;
    node.append(el);
  }
}

class Renderer {
  constructor(){
    this.renderList = [];
    this.isExist = false;
  }

  addElement(element) {
    this.renderList.push(element)
  }

  render() {
    this.renderList.forEach(it => it.render(url))
  }
}

class Image extends PageElement {
  constructor(parent, className){
    super(parent, 'div', className);
  }

  addClass() {
    this.node.classList.add('hidden')
  }

  removeClass() {
    this.node.classList.remove('hidden')
  }

  render(url) {
    this.node.style.backgroundImage = `url(${url})`;
  }
}


const imageWrap = document.querySelector('.image-wrap');
const searchInput = document.querySelector('.search-input');

export {Image, Renderer, imageWrap, searchInput}

