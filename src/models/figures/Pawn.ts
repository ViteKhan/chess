import blackPawn from 'assets/images/black-pawn.png';
import whitePawn from 'assets/images/white-pawn.png';
import { COLORS, FIGURES } from 'types';
import { Cell } from '../Cell';
import { Figure } from './Figure';

export class Pawn extends Figure {
  isFirstStep: boolean = true;

  constructor(color: COLORS, cell: Cell) {
    super(color, cell);
    this.logo = color === COLORS.BLACK ? blackPawn : whitePawn;
    this.name = FIGURES.PAWN;
  }

  canMove(target: Cell) {
    if (!super.canMove(target)) {
      return false;
    }

    const direction = this.cell.figure?.color === COLORS.BLACK ? 1 : -1;
    const firstStepDirection = this.cell.figure?.color === COLORS.BLACK ? 2 : -2;

    const isXDirection = target.x === this.cell.x;
    const isEmptyCellForMove = this.cell.board.getCell(target.x, target.y).IsEmptyCell();
    const isOffsetByOne = target.y === this.cell.y + direction;
    const isOffsetByTwo = this.isFirstStep && (target.y === this.cell.y + firstStepDirection);

    if ((isOffsetByOne || isOffsetByTwo) && isXDirection && isEmptyCellForMove) {
      return true;
    }

    const isDiagonalUp = target.y === this.cell.y + direction;
    const isDiagonalUBottom = target.x === this.cell.x + 1 || target.x === this.cell.x - 1;

    if(isDiagonalUp && isDiagonalUBottom && this.cell.isEnemy(target)) {
      return true;
    }

    return false;
  }

  moveFigure(target: Cell) {
    super.moveFigure(target);
    this.isFirstStep = false;
  }
}