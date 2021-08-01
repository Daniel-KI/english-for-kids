import { useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { createWord } from '../../service/wordService';
import { playBtnSound } from '../../utils/audioUtil';
import './CreateVocabController.scss';

const CreateVocabController = ({
  categoryId,
  updateWordsList,
}: {
  categoryId: string;
  updateWordsList: () => void;
}): JSX.Element => {
  const [flippedStatus, setFlippedStatus] = useState<boolean>(false);
  const getFlippedCategoryControllerStyle = (): string => (flippedStatus ? ' create-vocab-controller_flipped' : '');

  const createBtnOnClick = () => {
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

  const formOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append('categoryId', categoryId);
    event.currentTarget.reset();
    const newWord = await createWord(formData);
    if (newWord && newWord.word) {
      setFlippedStatus(false);
      updateWordsList();
    }
  };

  return (
    <div className={`create-vocab-controller${getFlippedCategoryControllerStyle()}`}>
      <div className='create-vocab-controller__content'>
        <div className='create-vocab-controller__front'>
          <div className='create-vocab-controller__data'>
            <h3 className='create-vocab-controller__title'>Add word</h3>
          </div>
          <div className='create-vocab-controller__actions'>
            <button
              className='create-vocab-controller__btn create-vocab-controller__btn_add'
              type='button'
              onClick={createBtnOnClick}
            >
              <AiOutlinePlusCircle className='create-vocab-controller__btn-icon' />
            </button>
          </div>
        </div>
        <div className='create-vocab-controller__back'>
          <form action='' className='create-vocab-controller__form' onSubmit={formOnSubmit}>
            <div className='create-vocab-controller__data'>
              <input
                type='text'
                className='create-vocab-controller__input'
                name='word'
                autoComplete='true'
                maxLength={20}
                placeholder='Word'
                required
              />
              <input
                type='text'
                className='create-vocab-controller__input'
                name='translation'
                autoComplete='true'
                maxLength={20}
                placeholder='Translation'
                required
              />
              <label htmlFor='create-vocab-controller__input_image' className='create-vocab-controller__label_file'>
                Image
                <input
                  type='file'
                  className='create-vocab-controller__input create-vocab-controller__input_file'
                  name='image'
                  id='create-vocab-controller__input_image'
                  accept='image/*'
                />
              </label>
              <label htmlFor='create-vocab-controller__input_audio' className='create-vocab-controller__label_file'>
                Sound
                <input
                  type='file'
                  className='create-vocab-controller__input create-vocab-controller__input_file'
                  name='sound'
                  id='create-vocab-controller__input_audio'
                  accept='audio/*'
                />
              </label>
            </div>
            <div className='create-vocab-controller__actions'>
              <input
                className='create-vocab-controller__btn create-vocab-controller__btn_cancel'
                type='reset'
                onClick={cancelBtnOnClick}
                value='Cancel'
              />
              <button
                className='create-vocab-controller__btn create-vocab-controller__btn_apply'
                type='submit'
                onClick={submitBtnOnClick}
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateVocabController;
