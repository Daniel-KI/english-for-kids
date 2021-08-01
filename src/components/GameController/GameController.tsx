import { useEffect } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';

import { CategoryModel } from '../../models/categoryModel';
import {
  resetCategorySliceState,
  setNextRequiredCard,
  setPlayingStatus,
  setVocabCards,
} from '../../store/categorySlice';
import { playBtnSound, playVocabCardSound } from '../../utils/audioUtil';
import { useDispatch, useSelector } from '../../utils/reactReduxHooks';
import shuffleVocabCards from '../../utils/shuffleVocabCards';
import GameModal from '../Modals/GameModal/GameModal';
import './GameController.scss';

const GameController = ({ data }: { data: CategoryModel }): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isPlaying = useSelector((state) => state.category.isPlaying);
  const isFinished = useSelector((state) => state.category.isFinished);
  const matches = useSelector((state) => state.category.matches);
  const requiredCard = useSelector((state) => state.category.requiredCard);

  useEffect(() => {
    if (requiredCard) {
      playVocabCardSound(requiredCard.audio);
    }
  }, [requiredCard]);

  useEffect(() => {
    if (data.words && isPlaying) {
      dispatch(setVocabCards(shuffleVocabCards(data.words)));
      dispatch(setNextRequiredCard());
    }
  }, [isPlaying, data, dispatch]);

  useEffect(() => {
    if (isFinished && !isPlaying) {
      setTimeout(() => {
        dispatch(resetCategorySliceState());
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
      playVocabCardSound(requiredCard.audio);
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
