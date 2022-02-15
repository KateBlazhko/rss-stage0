import {PageElement} from './pageElement.js';
import {data} from './startGame.js';

class Result extends PageElement {
  constructor(parent, className) {
    super(parent, 'div', className);
    this.lastResults = [];
    this.message = new PageElement (this.node, 'p', 'score-title');
    this.table = new Table (this.node, 'score-table', 'Name', 'Score', 'Level');
  }

  showResult(score) {
    this.score = score;
    this.getName();
    this.getLevel();
    this.message.node.innerHTML = `<span class="name">${this.name}</span>'ve won in ${score} steps`;
    this.renderResult();
    this.saveResult();
  }

  renderResult() {
    finishGame.node.style.opacity = '1';
    setTimeout(() => finishGame.node.style.display = 'flex', 500);
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
    this.lastResults.push(objResult);
    this.table.renderRows();
 //   localStorage.setItem('lang', lang);
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

const finishGame = new PageElement(document.body, 'div', 'finish-game');
const result = new Result (finishGame.node, 'score');


export {result}