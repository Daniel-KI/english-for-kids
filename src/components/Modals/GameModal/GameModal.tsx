import { playLosingSound, playWinSound } from '../../../utils/audioUtil';
import { useSelector } from '../../../utils/reactReduxHooks';
import './GameModal.scss';

const GameModal = (): JSX.Element => {
  const matches = useSelector((state) => state.category.matches);
  const mistakes = matches.filter((value) => value === false).length;
  const result = mistakes === 0;

  const playSound = () => (result ? playWinSound() : playLosingSound());
  const getResultImagePath = (): string => (result ? './vocabulary/game/happy.jpg' : './vocabulary/game/sad.jpg');
  const getTitle = (): string => (result ? 'You win !!!' : 'Oops...');

  playSound();

  return (
    <div className='modal_game'>
      <div className='modal__container'>
        <img alt='' className='modal__image' src={getResultImagePath()} />
        <div className='modal__description'>
          <h3 className='modal__title'>{getTitle()}</h3>
          <p className='modal__info'>{`${mistakes} mistake${mistakes > 1 ? 's' : ''}`}</p>
        </div>
      </div>
    </div>
  );
};

export default GameModal;
