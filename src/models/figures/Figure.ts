import { COLORS, FIGURES } from 'types';
import FigureLogo from 'assets/images/black-king.png';
import { Cell } from '../Cell';

export class Figure {
  color: COLORS;
  logo: typeof FigureLogo | null;
  cell: Cell;
  name: FIGURES;
  id: number;

  constructor(color: COLORS, cell: Cell) {
    this.color = color;
    this.cell = cell;
    this.cell.figure = this;
    this.logo = null;
    this.name = FIGURES.FIGURE;
    this.id = Math.random();
  }

  public canMove(target: Cell) {
    if (target.figure?.color === this.color) {
      return false;
    }

    if (target.figure?.name === FIGURES.KING) {
      return false;
    }

    return true;
  }

  moveFigure(target: Cell) {

  };
}