import blackPawn from 'assets/images/black-pawn.png';
import whitePawn from 'assets/images/white-pawn.png';
import { COLORS, FIGURES } from 'types';
import { Cell } from '../Cell';
import { Figure } from './Figure';

export class Pawn extends Figure {
  constructor(color: COLORS, cell: Cell) {
    super(color, cell);
    this.logo = color === COLORS.BLACK ? blackPawn : whitePawn;
    this.name = FIGURES.PAWN;
  }
}