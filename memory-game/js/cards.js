const fruits = ['lemon', 'lemon', 'orange', 'orange', 'garnet', 'garnet', 'ananas', 'ananas', 'apple', 'apple', 'apricot', 'apricot', 'melon', 'melon',
 'raspberry', 'raspberry', 'kiwi', 'kiwi', 'coconut', 'coconut', 'strawberry', 'strawberry', 'banana', 'banana']

class PageElement {
    constructor(node, tagName = 'div', className = '', content = '') {
      const el = document.createElement(tagName);
      el.className = className;
      el.innerHTML = content;
      this.node = el;
      node.append(el);
    }
}

class Cards extends PageElement {
  constructor(parent, className, cardQuantity) {
    super(parent, 'div', className);
    this.cardList = [];
    this.cardQuantity = cardQuantity;
    this.rotateCardList = [];
    this.isBlock = false;
  }

  createCards() {
    for (let i = 1; i <= this.cardQuantity; i++) {
      this.cardList.push(new Card(this.node, 'card', i))
    }
    this.mixCards();
    this.clickCards();
  }

  mixCards() {
    this.cardList.forEach(card => {
      let ramdomPos = Math.floor(Math.random() * this.cardQuantity);
      card.node.style.order = ramdomPos;
    });
  }

  clickCards() {
    this.cardList.forEach(card => {
      card.node.addEventListener('click', () => card.rotateCard());
    });
  }

  rotateCards(card) {
    let cardMatch = this.rotateCardList.find(it=> it.cardNumber === card.cardNumber);
    if (cardMatch === undefined) {
      this.rotateCardList.push(card);
    }
    if (this.rotateCardList.length % 2 === 0) {
      this.isBlock = true;
      this.blockCards();
    }
  }

  unrotateCards() {
    this.rotateCardList.forEach(card => {
      card.unRotateCard();
    });
    this.rotateCardList = [];
    this.isBlock = false;
    this.blockCards();
  }

  blockCards() {
    if (this.isBlock) {
      this.node.style.pointerEvents = 'none'
      this.compareCards();
    }
    this.node.style.pointerEvents = 'auto'
  }

  compareCards(){
    let firstCardName = this.rotateCardList[0].name;
    let secondCardName = this.rotateCardList[1].name;
    if (firstCardName === secondCardName) {
      this.disableCards()
    } else {
      setTimeout(() => {
        this.unrotateCards()
      }, 1000)
    }
  }

  disableCards() {
    this.rotateCardList.forEach(card => {
      card.disableCard();
      let cardMatch = this.cardList.find(it=> it.cardNumber === card.cardNumber);
      this.cardList.splice(cardMatch, 1);
    });
    this.rotateCardList = [];
    this.isBlock = false;
    this.blockCards();
  }
}

class Card extends PageElement {
  constructor(parent, className, cardNumber) {
    super(parent, 'div', className);
    this.cardNumber = cardNumber;
    this.name = fruits[cardNumber-1];
    this.img = [
        new Image(this.node, 'front-img', `../assets/img/${cardNumber}.jpg`, `cardFrontImg`),
        new Image(this.node, 'back-img', '../assets/img/back.jpg', `cardBackImg`)
    ]
  }

  rotateCard() {
    this.node.classList.add('rotate');
    memoryCards.rotateCards(this);
  }

  unRotateCard() {
    this.node.classList.remove('rotate');
  }

  disableCard() {
    this.node.style.pointerEvents = 'none';
  }

}

class Image extends PageElement {
  constructor(parent, className, src, alt) {
    super(parent, 'img', className);
    this.node.src = src;
    this.node.alt = alt;
  }
}

const section = document.querySelector('.section');
const memoryCards = new Cards (section, 'memory-cards', 16);


export {memoryCards}