import { ButtonHTMLAttributes, FC } from 'react';
import { ReactComponent as RestartIcon } from '../../assets/icons/restart.svg';
import './RestartButton.scss';

export const RestartButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ onClick, ...restProps}) => {
  return (
    <button
      className="restartButton"
      onClick={onClick}
      {...restProps}
    >
      Restart game<RestartIcon/>
    </button>
  );
};