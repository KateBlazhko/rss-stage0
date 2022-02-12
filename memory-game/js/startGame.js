import {memoryCards, PageElement} from  './cards.js';

class Menu extends PageElement {
  constructor(parent, className) {
    super(parent, 'div', className);
    this.buttonList = [
      new Button (this.node, 'menu-button', 'Easy'),
      new Button (this.node, 'menu-button', 'Normal'),
      new Button (this.node, 'menu-button', 'Hard')
    ];
  }

  clickMenu() {
    this.buttonList.forEach(button => {
      button.node.addEventListener('click', () => button.clickButton());
    });
  }
}

class Button extends PageElement {
  constructor(parent, className, textContent, type="button") {
    super(parent, 'button', className);
    this.node.textContent = textContent;
    this.node.type = type;
  }

  clickButton() {
    switch(this.node.textContent) {
      case 'Easy':
        memoryCards.createCards(12);
        break
      case 'Normal':
        memoryCards.createCards(16);
        break
      case 'Hard':
        memoryCards.createCards(24);
        memoryCards.changeField();
        break
    }
    startGame.node.style.opacity = '0';
    setTimeout(() => startGame.node.style.display = 'none', 500);
  }
}

const startGame = new PageElement (document.body, 'div', 'start-game');
const menuTitle = new PageElement (startGame.node, 'h2', 'menu-title', 'Memory game');
const menu = new Menu (startGame.node, 'menu');

export {menu}

