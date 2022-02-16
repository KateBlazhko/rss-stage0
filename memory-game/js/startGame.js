import {PageElement, Button} from './pageElement.js';
import {memoryCards} from  './cards.js';

class NameEnter extends PageElement {
  constructor(parent, className) {
    super(parent, 'div', className);
    this.input = new Input (this.node, 'name-input');
    this.button = new ButtonInput (this.node, 'name-button', "Let's go!!");
  }

  clickButton() {
    this.button.node.addEventListener('click', () => this.button.clickButton());
  }

  hide() {
    this.node.style.opacity = '0';
    setTimeout(() => {
      this.node.style.display = 'none'

      const menu = new Menu (startGame.node, 'menu');
      menu.click();
      menu.render();
    }, 1000);
  }
}

class Input extends PageElement {
  constructor(parent, className, type = 'text', placeholder = "Your name?") {
    super(parent, 'input', className);
    this.node.type = type;
    this.node.placeholder = placeholder;
    this.node.setAttribute('autofocus', '');
  }
}

class ButtonInput extends Button {
  constructor(parent, className, textContent) {
    super(parent, className, textContent);
  }

  clickButton() {
    data.name = nameEnter.input.node.value;
    nameEnter.hide()
  }
}

class Menu extends PageElement {
  constructor(parent, className) {
    super(parent, 'div', className);
    this.buttonList = [
      new ButtonMenu (this.node, 'menu-button', 'Easy'),
      new ButtonMenu (this.node, 'menu-button', 'Normal'),
      new ButtonMenu (this.node, 'menu-button', 'Hard')
    ];
  }

  click() {
    this.buttonList.forEach(button => {
      button.node.addEventListener('click', () => button.clickButton());
    });
  }

  render() {
    this.node.style.opacity = '1';
    this.node.style.display = 'flex';
  }
}

class ButtonMenu extends Button {
  constructor(parent, className, textContent) {
    super(parent, className, textContent);
  }

  clickButton() {
    switch(this.node.textContent) {
      case 'Easy':
        this.cardQuantity = 12;
        break
      case 'Normal':
        this.cardQuantity = 16
        break
      case 'Hard':
        this.cardQuantity = 24
        break
    }
    data.cardQuantity = this.cardQuantity;
    memoryCards.createCards();

    startGame.node.style.opacity = '0';
    setTimeout(() => startGame.node.style.display = 'none', 500);
  }
}

const startGame = new PageElement (document.body, 'div', 'start-game');
const title = new PageElement (startGame.node, 'h2', 'game-title', 'Memory game');
const nameEnter = new NameEnter (startGame.node, 'name-input-wrap');

const data = {}

export {data, nameEnter}

