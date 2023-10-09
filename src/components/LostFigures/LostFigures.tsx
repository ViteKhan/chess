import './LostFigures.scss';
import { FC } from 'react';
import { Figure } from 'models/figures/Figure';

interface LostFiguresProps {
  title: string;
  figures: Figure[];
}

export const LostFigures: FC<LostFiguresProps> = ({ title, figures }) => {
  return (
    <div className="lost">
      <h3>{title}</h3>
      <ol>
        {figures.map(figure => (
          <li key={figure.id}>
            {figure.name} {figure.logo && <img width={20} height={20} src={figure.logo} alt={figure.name}/>}
          </li>
        ))}
      </ol>
    </div>
  );
};