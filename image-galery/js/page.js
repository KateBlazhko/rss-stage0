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

  render() {
    this.node.style.backgroundImage = `url(${this.url})`;
    this.node.style.display = 'block';
  }

  update(url) {
    this.isNeed = true;
    this.url = url;
  }

  clear() {
    this.node.style.display = 'none';
    this.isNeed = false;
  }
}

class Renderer {
  constructor(){
    this.renderList = [];
    this.isExist = false;
  }

  addElement(url) {
    let element = new Image(imageWrap, 'image', url);
    this.renderList.push(element)
  }

  updateElement(i, url) {
    this.renderList[i].update(url);
  }

  render() {
    this.renderList.forEach(it => {
      it.isNeed && it.render();
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

export {rend, searchInput}

