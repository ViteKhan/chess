import blackQueen from 'assets/images/black-queen.png';
import whiteQueen from 'assets/images/white-queen.png';
import { COLORS, FIGURES } from 'types';
import { Cell } from '../Cell';
import { Figure } from './Figure';

export class Queen extends Figure {
  constructor(color: COLORS, cell: Cell) {
    super(color, cell);
    this.logo = color === COLORS.BLACK ? blackQueen : whiteQueen;
    this.name = FIGURES.QUEEN;
  }

  canMove(target: Cell) {
    if (!super.canMove(target)) {
      return false;
    }

    return true;
  }
}