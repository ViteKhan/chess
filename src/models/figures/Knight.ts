import blackKnight from 'assets/images/black-knight.png';
import whiteKnight from 'assets/images/white-knight.png';
import { COLORS, FIGURES } from 'types';
import { Cell } from '../Cell';
import { Figure } from './Figure';

export class Knight extends Figure {
  constructor(color: COLORS, cell: Cell) {
    super(color, cell);
    this.logo = color === COLORS.BLACK ? blackKnight : whiteKnight;
    this.name = FIGURES.KNIGHT;
  }
}