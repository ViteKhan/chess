import './Modal.scss';
import { FC, useEffect } from 'react';
import { useDisclosure, useGameOver } from 'hooks';
import { RestartButton } from '../RestartButton';

interface ModalProps {
  whiteTime: number;
  blackTime: number;
  onRestartGame: () => void;
}

export const Modal: FC<ModalProps> = ({ whiteTime, blackTime, onRestartGame }) => {
  const { message, isOver, reason } = useGameOver(whiteTime, blackTime);
  const { isOpen, onClose, setIsOpen } = useDisclosure(isOver);

  const onClick = () => {
    onClose();
    onRestartGame();
  };

  useEffect(() => {
    setIsOpen(isOver);
  }, [isOver]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    isOpen ?
      <div className="modal">
        <div className="modalContent">
          <h3>{message}</h3>
          <h4>{reason}</h4>
          <RestartButton onClick={onClick}/>
        </div>
      </div>
      : null
  );
};