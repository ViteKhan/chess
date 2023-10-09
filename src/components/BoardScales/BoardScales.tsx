import { FC, ReactNode } from 'react';
import './BoardScales.scss';
import { SCALE } from '../../constants';

const Letters = () => (
  <div className="letters">
    {SCALE.map((_, idx) => (
      <div key={idx} className="letterLabel">
        {String.fromCharCode(65 + idx)}
      </div>
    ))}
  </div>
);

const Numbers = () => (
  <div className="numbers">
    {SCALE.map((_, idx) => (
      <div key={idx} className="numberLabel">
        {8 - idx}
      </div>
    ))}
  </div>
);

interface BoardScalesProps {
  children: ReactNode;
}

export const BoardScales: FC<BoardScalesProps> = ({ children }) => {
  return (
    <div className="boardScales">
      <Numbers/>
      <div>
        <Letters/>
        {children}
        <Letters/>
      </div>
      <Numbers/>
    </div>
  );
};