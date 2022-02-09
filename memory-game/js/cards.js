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
  constructor(parent, className, src, alt) {
    super(parent, 'img', className);
    this.node.src = src;
    this.node.alt = alt;
  }
}

class Cards extends PageElement {
  constructor(parent, className, cardQuantity) {
    super(parent, 'div', className);
    this.cardList = [];
    this.cardQuantity = cardQuantity
  }

  createCard() {
    for (let i = 1; i <= this.cardQuantity; i++) {
      this.cardList.push(new Card(this.node, 'card', i))
    }
  }

  clickCard() {
    this.cardList.forEach(card => {
      card.node.addEventListener('click', () => card.clickCard());
    });
  }
}

class Card extends PageElement {
  constructor(parent, className, cardNumber) {
    super(parent, 'div', className);
    this.img = [
        new Image(this.node, 'front-img', `../assets/img/${cardNumber}.jpg`, `${cardNumber}card`),
        new Image(this.node, 'back-img', '../assets/img/back.jpg', `${cardNumber}card`)
    ]
  }

  clickCard() {
    this.node.classList.toggle('rotate');
  }
}

const section = document.querySelector('.section');
const memoryCards = new Cards (section, 'memory-cards', 12);


export {memoryCards}