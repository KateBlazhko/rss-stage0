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

class Image extends PageElement {
  constructor(parent, className, src, alt, data) {
    super(parent, 'img', className);
    this.node.src = src;
    this.node.alt = alt;
    this.node.dataset.fruit = data;
  }
}

class Cards extends PageElement {
  constructor(parent, className, cardQuantity) {
    super(parent, 'div', className);
    this.cardList = [];
    this.cardQuantity = cardQuantity;
    this.rotateCardList = [];
  }

  createCards() {
    for (let i = 1; i <= this.cardQuantity; i++) {
      this.cardList.push(new Card(this.node, 'card', i))
    }
    this.clickCards();
  }

  clickCards() {
    this.cardList.forEach(card => {
      card.node.addEventListener('click', card.rotateCard.bind(card));
    });
  }

  rotateCards(card) {
    this.rotateCardList.push(card);
    this.blockCards();
  }

  unrotateCards() {
    this.rotateCardList.forEach(card => {
      card.unRotateCard();
    });
    this.rotateCardList = [];
    this.unblockCards();
  }

  blockCards() {
    if (this.rotateCardList.length % 2 === 0) {
      this.node.style.pointerEvents = 'none'
      this.compareCards();
    }
  }

  unblockCards() {
    this.node.style.pointerEvents = 'auto'
  }

  compareCards(){
    let firstDataSet = this.rotateCardList[0].img[0].node.dataset.fruit;
    let secondDataSet = this.rotateCardList[1].img[0].node.dataset.fruit;
    if (firstDataSet === secondDataSet) {
      this.disableCards()
    } else {
      setTimeout(() => {
        this.unrotateCards()
      }, 1000)
    }
  }

  disableCards() {
    this.rotateCardList.forEach(card => {
      card.node.removeEventListener('click', card.rotateCard.bind(card));
     // this.cardList.splice(cardObj.number, 1);
    });
    this.rotateCardList = [];
    this.unblockCards();
  }
}

class Card extends PageElement {
  constructor(parent, className, cardNumber) {
    super(parent, 'div', className);
    this.img = [
        new Image(this.node, 'front-img', `../assets/img/${cardNumber}.jpg`, `${cardNumber}card`, `${fruits[cardNumber-1]}`),
        new Image(this.node, 'back-img', '../assets/img/back.jpg', `${cardNumber}card`)
    ]
  }

  rotateCard() {
    this.node.classList.add('rotate');
    console.log('gdg')
    memoryCards.rotateCards(this);
  }

  unRotateCard() {
    this.node.classList.remove('rotate');
  }

}

const section = document.querySelector('.section');
const memoryCards = new Cards (section, 'memory-cards', 12);


export {memoryCards}