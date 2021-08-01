import './GameController.scss';
import { useEffect } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import { WordModel } from '../../models/WordModel';

import { resetGameSliceState, setNextRequiredWord, setPlayingStatus, setWords } from '../../store/gameSlice';
import { playBtnSound, playVocabCardSound } from '../../utils/audioUtil';
import { useDispatch, useSelector } from '../../utils/reactReduxHooks';
import shuffleVocabCards from '../../utils/shuffleVocabCards';
import GameModal from '../GameModal/GameModal';
import { API_PATH } from '../../data/serverData';

const GameController = ({ categoryWords }: { categoryWords: WordModel[] }): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isPlaying = useSelector((state) => state.game.isPlaying);
  const isFinished = useSelector((state) => state.game.isFinished);
  const matches = useSelector((state) => state.game.matches);
  const requiredCard = useSelector((state) => state.game.requiredWord);

  useEffect(() => {
    if (requiredCard) {
      playVocabCardSound(`${API_PATH}${requiredCard.sound}`);
    }
  }, [requiredCard]);

  useEffect(() => {
    if (categoryWords && isPlaying) {
      dispatch(setWords(shuffleVocabCards(categoryWords)));
      dispatch(setNextRequiredWord());
    }
  }, [isPlaying, categoryWords, dispatch]);

  useEffect(() => {
    if (isFinished && !isPlaying) {
      setTimeout(() => {
        dispatch(resetGameSliceState());
        history.push('/');
      }, 5000);
    }
  }, [isFinished, isPlaying, dispatch, history]);

  const gameBtnStartOnClick = (): void => {
    playBtnSound();
    dispatch(setPlayingStatus(true));
  };

  const gameBtnRepeatOnClick = (): void => {
    if (requiredCard) {
      playVocabCardSound(`${API_PATH}${requiredCard.sound}`);
    }
  };

  return (
    <div className='game-controller'>
      <button
        className='game-controller__btn'
        onClick={isPlaying ? gameBtnRepeatOnClick : gameBtnStartOnClick}
        type='button'
      >
        {isPlaying ? 'Repeat' : 'Start'}
      </button>
      {matches.length && isPlaying ? (
        <div className='game-controller__hp'>
          {matches.map((match, index) => {
            if (match) {
              return <AiFillHeart className='game-controller__hp-plus' key={index.toString()} />;
            }
            return <AiOutlineHeart className='game-controller__hp-minus' key={index.toString()} />;
          })}
        </div>
      ) : (
        ''
      )}
      {isFinished && !isPlaying ? <GameModal /> : ''}
    </div>
  );
};

export default GameController;
