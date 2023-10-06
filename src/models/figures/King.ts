import blackKing from 'assets/images/black-king.png';
import whiteKing from 'assets/images/white-king.png';
import { COLORS, FIGURES } from 'types';
import { Cell } from '../Cell';
import { Figure } from './Figure';

export class King extends Figure {
  constructor(color: COLORS, cell: Cell) {
    super(color, cell);
    this.logo = color === COLORS.BLACK ? blackKing : whiteKing;
    this.name = FIGURES.KING;
  }

  canMove(target: Cell) {
    if (!super.canMove(target)) {
      return false;
    }

    return true;
  }
}