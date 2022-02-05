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
    constructor(parent, className){
      super(parent, 'div', className)
    }

    render(url) {
      this.node.style.backgroundImage = `url(${url})`;
    }
  }

let imageWrap = document.querySelector('.image-wrap');

export {PageElement, Image, imageWrap}

