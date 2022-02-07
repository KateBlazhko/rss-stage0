class PageElement {
  constructor(node, tagName = 'div', className = '', content = '') {
    const el = document.createElement(tagName);
    el.className = className;
    el.innerHTML = content;
    this.node = el;
    node.append(el);
  }
}

class Image extends PageElement {
  constructor(parent, className, url){
    super(parent, 'div', className);
    this.url = url;
    this.isNeed = true;
  }

  render(url) {
    this.node.style.backgroundImage = `url(${url})`;
    this.node.style.display = 'block';
  }

  clear() {
    this.node.style.display = 'none';
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
    this.renderList.forEach(it => {
      it.isNeed && it.render(it.url);
    })
  }

  clear() {
    this.renderList.forEach(it => {
      it.clear();
    })
  }

}

const imageWrap = document.querySelector('.image-wrap');
const searchInput = document.querySelector('.search-input');

const rend = new Renderer()

export {Image, rend, imageWrap, searchInput}

