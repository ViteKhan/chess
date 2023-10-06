import blackRook from 'assets/images/black-rook.png';
import whiteRook from 'assets/images/white-rook.png';
import { COLORS, FIGURES } from 'types';
import { Cell } from '../Cell';
import { Figure } from './Figure';

export class Rook extends Figure {
  constructor(color: COLORS, cell: Cell) {
    super(color, cell);
    this.logo = color === COLORS.BLACK ? blackRook : whiteRook;
    this.name = FIGURES.ROOK;
  }

  canMove(target: Cell) {
    if (!super.canMove(target)) {
      return false;
    }

    return true;
  }
}