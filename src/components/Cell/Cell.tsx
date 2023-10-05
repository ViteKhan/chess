import './Cell.scss';
import { Cell } from 'models/Cell';
import { FC } from 'react';
import { AvailableCell } from '../AvailableCell';

interface CellComponentProps {
  cell: Cell;
  isSelected: boolean;
  onClick: (cell: Cell) => void;
  selectedCell: Cell | null;
}

export const CellComponent: FC<CellComponentProps> = ({ cell, selectedCell, isSelected, onClick }) => {
  return (
    <div
      className={['cell', cell.color, isSelected ? 'selected' : ''].join(' ')}
      onClick={() => onClick(cell)}
      // TODO fix styles
      style={{ background: cell.available && cell.figure ? 'green' : '' }}
    >
      {cell.available && !cell.figure && <AvailableCell cell={selectedCell}/>}
      {cell.figure?.logo && <img src={cell.figure.logo} alt={cell.figure.name} title={cell.figure.name} />}
    </div>
  );
};