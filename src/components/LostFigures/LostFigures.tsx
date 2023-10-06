import './LostFigures.scss';
import { FC } from 'react';
import { Figure } from '../../models/figures/Figure';

interface LostFiguresProps {
  title: string;
  figures: Figure[];
}

export const LostFigures: FC<LostFiguresProps> = ({ title, figures }) => {
  return (
    <div className="lost">
      <h2>{title}</h2>
      {figures.map(figure => (
        <div key={figure.id}>
          {figure.name} {figure.logo && <img width={20} height={20} src={figure.logo} alt={figure.name}/>}
        </div>
      ))}
    </div>
  );
};