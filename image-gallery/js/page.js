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


  clickElement() {
    return this.url
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
    this.fullElement = new Image(imageWrap, 'full-img');
    this.fullElement.node.addEventListener('click', () => {
      this.fullElement.clear();
      document.body.classList.remove('full')
    })
  }

  clickElement() {
    this.renderList.forEach(it => {
      it.node.addEventListener('click', () => {
        this.fullElement.url = it.clickElement();
        this.fullElement.render();
        document.body.classList.add('full');
      })
    })
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

const rend = new Renderer();

export {rend}

