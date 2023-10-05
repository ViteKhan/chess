import './Cell.scss';
import { Cell } from 'models/Cell';
import { FC } from 'react';

interface CellComponentProps {
  cell: Cell;
}

export const CellComponent: FC<CellComponentProps> = ({ cell }) => {
  return (
    <div className={['cell', cell.color].join(' ')}>
    </div>
  );
};