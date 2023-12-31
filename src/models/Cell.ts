import { COLORS } from '../types';
import { Board } from './Board';
import { Figure } from './figures/Figure';

export class Cell {
  readonly x: number;
  readonly y: number;
  readonly color: COLORS;
  figure: Figure | null;
  board: Board;
  available: boolean;
  id: number;

  constructor(board: Board, x: number, y: number, color: COLORS, figure: Figure | null) {
    this.board = board;
    this.x = x;
    this.y = y;
    this.color = color;
    this.figure = figure;
    this.available = false;
    this.id = Math.random();
  }

  IsEmptyCell() {
    return this.figure === null;
  }

  isEnemy(target: Cell) {
    if (target.figure) {
      return this.figure?.color !== target.figure?.color;
    }

    return false;
  }

  isEmptyVertical(target: Cell) {
    if (this.x !== target.x) {
      return false;
    }

    const min = Math.min(this.y, target.y);
    const max = Math.max(this.y, target.y);

    for (let y = min + 1; y < max; y++) {
      if (!this.board.getCell(this.x, y).IsEmptyCell()) {
        return false;
      }
    }

    return true;
  }

  isEmptyHorizontal(target: Cell) {
    if (this.y !== target.y) {
      return false;
    }

    const min = Math.min(this.x, target.x);
    const max = Math.max(this.x, target.x);

    for (let x = min + 1; x < max; x++) {
      if (!this.board.getCell(x, this.y).IsEmptyCell()) {
        return false;
      }
    }

    return true;
  }

  isEmptyDiagonal(target: Cell) {
    const absX = Math.abs(target.x - this.x);
    const absY = Math.abs(target.y - this.y);

    if (absX !== absY) {
      return false;
    }

    const dy = this.y < target.y ? 1 : -1;
    const dx = this.x < target.x ? 1 : -1;

    for (let i = 1; i < absY; i++) {
      if (!this.board.getCell(this.x + dx * i, this.y + dy * i).IsEmptyCell()) {
        return false;
      }
    }

    return true;
  }

  setFigure(figure: Figure) {
    this.figure = figure;
    this.figure.cell = this;
  }

  moveFigure(target: Cell) {
    if (this.figure && this.figure.canMove(target)) {
      this.figure.moveFigure(target);
      if (target.figure) {
        this.board.addLostFigure(target.figure);
      }

      target.setFigure(this.figure);
      this.figure = null;
    }
  };
}