import {PageElement, Button} from './pageElement.js';
import {data} from './startGame.js';

class Result extends PageElement {
  constructor(parent, className) {
    super(parent, 'div', className);
    this.message = new PageElement (this.node, 'p', 'score-title');
    this.button =  new StartButton (this.node, 'restart-button', 'New game'),
    this.table = new Table (this.node, 'score-table', 'Name', 'Score', 'Level');
  }

  showResult() {
    this.getName();
    this.getLevel();
    this.message.node.innerHTML = `<span class="name">${this.name}</span>'ve won in ${this.score} steps!!!`;
    this.clickButton();
    this.saveResult();
  }

  renderResult(score) {
    this.score = score;
    finishGame.node.style.opacity = '1';
    finishGame.node.style.display = 'flex';
    this.showResult()
  }

  getName() {
    this.name = '---';
    data.name && (this.name = data.name)
  }

  getLevel() {
    let cardQuantity = 12;
    data.cardQuantity && (cardQuantity = data.cardQuantity)
    switch(cardQuantity) {
      case 12:
        this.level = 'Easy'
        break
      case 16:
        this.level = 'Normal'
        break
      case 24:
        this.level = 'Hard'
        break
    }
  }

  saveResult() {
    let objResult = {
      name: this.name,
      score: `${this.score} steps`,
      level: this.level
    }

    if (localStorage.getItem('result')) {
      lastResults = JSON.parse(localStorage.getItem('result'));
    }
    this.lastResults = lastResults;

    if (this.lastResults.length === 10) {
      this.lastResults.splice(0, 1);
    }
    this.lastResults.push(objResult);
    this.table.renderRows();

    lastResults = this.lastResults;
    localStorage.setItem('result', JSON.stringify(lastResults));
  }

  clickButton() {
    this.button.node.addEventListener('click', () => this.button.clickButton());
  }

}

export class Table extends PageElement {
  constructor(parent, className, ...nameColumns) {
    super(parent, 'table', className);
    let tittle = new PageElement (this.node, 'tr');
    for (let name of nameColumns) {
      new PageElement (tittle.node, 'th', '', name);
    }
  }

  renderRows() {
    result.lastResults.forEach(obj => {
      let row = new PageElement (this.node, 'tr');
      Object.keys(obj).forEach(key => {
        new PageElement (row.node, 'td', '', obj[key]);
      })
    })
  }
}

class StartButton extends Button {
  constructor(parent, className, textContent) {
    super(parent, className, textContent);
  }

  clickButton() {
    document.location.reload();
  }
}

const finishGame = new PageElement(document.body, 'div', 'finish-game');
const result = new Result (finishGame.node, 'score');

let lastResults = [];
export {result}