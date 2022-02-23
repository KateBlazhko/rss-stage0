export class PageElement {
  constructor(node, tagName = 'div', className = '', content = '') {
    const el = document.createElement(tagName);
    el.className = className;
    el.innerHTML = content;
    this.node = el;
    node.append(el);
  }
}

export class Button extends PageElement {
  constructor(parent, className, textContent, type="button") {
    super(parent, 'button', className);
    this.node.textContent = textContent;
    this.node.type = type;
  }
}
