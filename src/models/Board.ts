import { COLORS, FIGURES } from 'types';
import { ROW_SIZE } from '../constants';
import { Cell } from './Cell';
import { Bishop } from './figures/Bishop';
import { Figure } from './figures/Figure';
import { King } from './figures/King';
import { Knight } from './figures/Knight';
import { Pawn } from './figures/Pawn';
import { Queen } from './figures/Queen';
import { Rook } from './figures/Rook';

export class Board {
  cells: Cell[][] = [];
  lostBlackFigures: Figure[] = [];
  lostWhiteFigures: Figure[] = [];

  public initCells() {
    for (let i = 0; i < ROW_SIZE; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < ROW_SIZE; j++) {
        if ((i + j) % 2 !== 0) {
          row.push(new Cell(this, j, i, COLORS.BLACK, null));
        } else {
          row.push(new Cell(this, j, i, COLORS.WHITE, null));
        }
      }
      this.cells.push(row);
    }
  }

  public getCell(x: number, y: number) {
    return this.cells[y][x];
  }

  public addFigures() {
    this.addPawns();
    this.addBishops();
    this.addKnights();
    this.addRooks();
    this.addQueens();
    this.addKings();
  }

  private addPawns() {
    for (let i = 0; i < ROW_SIZE; i++) {
      new Pawn(COLORS.BLACK, this.getCell(i, 1));
      new Pawn(COLORS.WHITE, this.getCell(i, 6));
    }
  }

  private addBishops() {
    new Bishop(COLORS.BLACK, this.getCell(2, 0));
    new Bishop(COLORS.BLACK, this.getCell(5, 0));
    new Bishop(COLORS.WHITE, this.getCell(2, 7));
    new Bishop(COLORS.WHITE, this.getCell(5, 7));
  }

  private addKnights() {
    new Knight(COLORS.BLACK, this.getCell(1, 0));
    new Knight(COLORS.BLACK, this.getCell(6, 0));
    new Knight(COLORS.WHITE, this.getCell(6, 7));
    new Knight(COLORS.WHITE, this.getCell(1, 7));
  }

  private addRooks() {
    new Rook(COLORS.BLACK, this.getCell(0, 0));
    new Rook(COLORS.BLACK, this.getCell(7, 0));
    new Rook(COLORS.WHITE, this.getCell(0, 7));
    new Rook(COLORS.WHITE, this.getCell(7, 7));
  }

  private addQueens() {
    new Queen(COLORS.BLACK, this.getCell(3, 0));
    new Queen(COLORS.WHITE, this.getCell(3, 7));
  }

  private addKings() {
    new King(COLORS.BLACK, this.getCell(4, 0));
    new King(COLORS.WHITE, this.getCell(4, 7));
  }

  public highlightCells(selectedCell: Cell | null) {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const target = row[j];
        target.available = !!selectedCell?.figure?.canMove(target);
      }
    }
  }

  public getCopyBoard() {
    const newBoard = new Board();
    newBoard.cells = this.cells;
    newBoard.lostWhiteFigures = this.lostWhiteFigures;
    newBoard.lostBlackFigures = this.lostBlackFigures;
    return newBoard;
  }

  addLostFigure(figure: Figure) {
    figure.color === COLORS.BLACK ? this.lostBlackFigures.push(figure) : this.lostWhiteFigures.push(figure);
  }

  isDeadBlackKing() {
    return !!this.lostBlackFigures.find(figure => figure.name === FIGURES.KING);
  }

  isDeadWhiteKing() {
    return !!this.lostWhiteFigures.find(figure => figure.name === FIGURES.KING);
  }
}