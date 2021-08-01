import { useEffect, useState } from 'react';
import './VocabCard.scss';
import { CardModel } from '../../models/cardModel';
import {
  incrementCorrectMatches,
  incrementWrongMatches,
  setFinishedStatus,
  setNextRequiredCard,
  setPlayingStatus,
} from '../../store/categorySlice';
import { playCorrectSound, playVocabCardSound, playWrongSound } from '../../utils/audioUtil';
import compareVocabCards from '../../utils/compareVocabCards';
import { useDispatch, useSelector } from '../../utils/reactReduxHooks';

const VocabCard = ({ data }: { data: CardModel }): JSX.Element => {
  const dispatch = useDispatch();
  const [flippedStatus, setFlippedStatus] = useState<boolean>(false);
  const [matchedStatus, setMatchedStatus] = useState<boolean>(false);
  const isGameMode = useSelector((state) => state.category.isGameMode);
  const isPlaying = useSelector((state) => state.category.isPlaying);
  const requiredCard = useSelector((state) => state.category.requiredCard);
  const vocabCards = useSelector((state) => state.category.vocabCards);

  useEffect(() => {
    if (!isPlaying) {
      setMatchedStatus(false);
    }
  }, [isPlaying]);

  const flipBtnOnClick = (): void => {
    setFlippedStatus(true);
  };
  const vocabCardOnMouseLeave = (): void => {
    setFlippedStatus(false);
  };
  const vocabCardDefaultFrontOnClick = (): void => {
    playVocabCardSound(data.audio);
  };
  const vocabCardGameFrontOnClick = (): void => {
    if (!isPlaying) return;
    if (requiredCard && compareVocabCards(requiredCard, data)) {
      playCorrectSound();
      setMatchedStatus(true);
      dispatch(incrementCorrectMatches());
      if (vocabCards.length) {
        dispatch(setNextRequiredCard());
      } else {
        dispatch(setPlayingStatus(false));
        dispatch(setFinishedStatus(true));
      }
      return;
    }
    dispatch(incrementWrongMatches());
    playWrongSound();
  };

  const vocabCardFrontOnClick = (): (() => void) =>
    isGameMode ? vocabCardGameFrontOnClick : vocabCardDefaultFrontOnClick;

  const getFlippedVocabCardStyle = (): string => (flippedStatus ? ' vocab-card_flipped' : '');
  const getMatchingVocabCardStyle = (): string => (matchedStatus ? ' vocab-card_matched' : '');
  const getGameVocabCardStyle = (): string => (isGameMode ? ' vocab-card_game' : '');
  const setCardAdditionalStyles = (): string =>
    `${getFlippedVocabCardStyle()}${getGameVocabCardStyle()}${getMatchingVocabCardStyle()}`;

  return (
    <div className={`vocab-card${setCardAdditionalStyles()}`} onMouseLeave={vocabCardOnMouseLeave}>
      <div className='vocab-card__content'>
        <div className='vocab-card__front' onClick={vocabCardFrontOnClick()}>
          <img alt={data.word} className='vocab-card__image' src={data.image} />
          <div className='vocab-card__description'>
            <p className='vocab-card__word'>{data.word}</p>
            <button className='vocab-card__btn' onClick={flipBtnOnClick} type='button'>
              <img alt='rotate' className='vocab-card__btn-icon' src='./icons/rotate.png' />
            </button>
          </div>
        </div>
        <div className='vocab-card__back'>
          <img alt={data.word} className='vocab-card__image' src={data.image} />
          <div className='vocab-card__description'>
            <p className='vocab-card__word'>{data.translation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VocabCard;
