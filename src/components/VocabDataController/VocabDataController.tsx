import { useState } from 'react';
import { AiFillPlayCircle } from 'react-icons/ai';
import { API_PATH } from '../../data/serverData';
import { WordModel } from '../../models/WordModel';
import { deleteWordById, updateWord } from '../../service/wordService';
import { playBtnSound, playVocabCardSound } from '../../utils/audioUtil';
import './VocabDataController.scss';

const VocabDataController = ({
  data,
  updateWordsList,
}: {
  data: WordModel;
  updateWordsList: () => void;
}): JSX.Element => {
  const [wordData, setWordData] = useState<WordModel>(data);
  const [flippedStatus, setFlippedStatus] = useState<boolean>(false);
  const getFlippedWordControllerStyle = (): string => (flippedStatus ? ' vocab-data-controller_flipped' : '');

  const updateBtnOnClick = () => {
    playBtnSound();
    setFlippedStatus(true);
  };

  const cancelBtnOnClick = () => {
    playBtnSound();
    setFlippedStatus(false);
  };

  const submitBtnOnClick = () => {
    playBtnSound();
  };

  const deleteBtnOnClick = async () => {
    playBtnSound();
    if (wordData?._id) {
      await deleteWordById(wordData._id);
      updateWordsList();
    }
  };

  const soundBtnOnClick = () => {
    playVocabCardSound(`${API_PATH}${wordData.sound}`);
  };

  const formOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    playBtnSound();
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (data._id) {
      const newWord = await updateWord(data._id, formData);
      if (newWord._id) {
        setWordData({ ...newWord });
        setFlippedStatus(false);
      }
    }
  };

  return (
    <div className={`vocab-data-controller${getFlippedWordControllerStyle()}`}>
      <div className='vocab-data-controller__content'>
        <div className='vocab-data-controller__front'>
          <img src={`${API_PATH}${wordData.image}`} alt='word' className='vocab-data-controller__image' />
          <div className='vocab-data-controller__data'>
            <h3 className='vocab-data-controller__title'>{wordData.word}</h3>
            <h4 className='vocab-data-controller__info'>{wordData.translation}</h4>
            <AiFillPlayCircle className='vocab-data-controller__sound' onClick={soundBtnOnClick} />
          </div>
          <div className='vocab-data-controller__actions'>
            <button
              className='vocab-data-controller__btn vocab-data-controller__btn_update'
              type='button'
              onClick={updateBtnOnClick}
            >
              Update
            </button>
            <button
              className='vocab-data-controller__btn vocab-data-controller__btn_delete'
              type='button'
              onClick={deleteBtnOnClick}
            >
              Delete
            </button>
          </div>
        </div>
        <div className='vocab-data-controller__back'>
          <form action='' className='vocab-data-controller__form' onSubmit={formOnSubmit}>
            <div className='vocab-data-controller__data'>
              <input type='hidden' name='categoryId' value={wordData.categoryId} />
              <input
                type='text'
                className='vocab-data-controller__input'
                name='word'
                autoComplete='true'
                maxLength={20}
                required
                defaultValue={wordData.word}
              />
              <input
                type='text'
                className='vocab-data-controller__input'
                name='translation'
                autoComplete='true'
                maxLength={20}
                required
                defaultValue={wordData.translation}
              />
              <label htmlFor='vocab-data-controller__input_image' className='vocab-data-controller__label_file'>
                Image
                <input
                  type='file'
                  className='vocab-data-controller__input vocab-data-controller__input_file'
                  name='image'
                  id={`vocab-data-controller__input_image-${wordData.word}`}
                  accept='image/*'
                />
              </label>
              <label htmlFor='vocab-data-controller__input_audio' className='vocab-data-controller__label_file'>
                Sound
                <input
                  type='file'
                  className='vocab-data-controller__input vocab-data-controller__input_file'
                  name='sound'
                  id={`vocab-data-controller__input_audio-${wordData.word}`}
                  accept='audio/*'
                />
              </label>
            </div>
            <div className='vocab-data-controller__actions'>
              <input
                className='vocab-data-controller__btn vocab-data-controller__btn_cancel'
                type='reset'
                onClick={cancelBtnOnClick}
                value='Cancel'
              />
              <button
                className='vocab-data-controller__btn vocab-data-controller__btn_apply'
                type='submit'
                onClick={submitBtnOnClick}
              >
                Apply
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VocabDataController;
