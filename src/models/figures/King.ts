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

    const isCanMoveBottomYAxis = target.y === this.cell.y + 1;
    const isCanMoveUpYAxis = target.y === this.cell.y - 1;
    const isXAxis = target.x === this.cell.x;
    const isYAxis = target.y === this.cell.y;
    const isCanMoveRightXAxis = target.x === this.cell.x + 1;
    const isCanMoveLeftXAxis = target.x === this.cell.x - 1;

    const isVerticalMove = (isCanMoveBottomYAxis || isCanMoveUpYAxis) && isXAxis;
    const isHorizontalMove = (isCanMoveRightXAxis || isCanMoveLeftXAxis) && isYAxis;
    const isLeftDiagonal = (isCanMoveLeftXAxis && isCanMoveBottomYAxis)
      || (isCanMoveLeftXAxis && isCanMoveUpYAxis);
    const isRightDiagonal = (isCanMoveRightXAxis && isCanMoveBottomYAxis)
      || (isCanMoveRightXAxis && isCanMoveUpYAxis);

    if (isVerticalMove || isHorizontalMove || isLeftDiagonal || isRightDiagonal) {
      return true;
    }

    return false;
  }

}