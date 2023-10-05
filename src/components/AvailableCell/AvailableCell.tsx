import { FC } from 'react';
import { Cell } from 'models/Cell';
import './AvailableCell.scss';

interface AvailableCellProps {
  cell: Cell | null;
}

export const AvailableCell: FC<AvailableCellProps> = ({ cell }) => (
  <img
    className="available"
    src={cell?.figure?.logo}
    alt={cell?.figure?.name}
  />
);