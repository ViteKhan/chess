import blackBishop from 'assets/images/black-bishop.png';
import whiteBishop from 'assets/images/white-bishop.png';
import { COLORS, FIGURES } from '../../types';
import { Cell } from '../Cell';
import { Figure } from './Figure';

export class Bishop extends Figure {
  constructor(color: COLORS, cell: Cell) {
    super(color, cell);
    this.logo = color === COLORS.BLACK ? blackBishop : whiteBishop;
    this.name = FIGURES.BISHOP;
  }

  canMove(target: Cell) {
    if (!super.canMove(target)) {
      return false;
    }

    if (this.cell.isEmptyDiagonal(target)) {
      return true;
    }

    return false;
  }
}