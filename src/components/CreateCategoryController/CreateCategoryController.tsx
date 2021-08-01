import { useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { createCategory } from '../../service/categoryService';
import { playBtnSound } from '../../utils/audioUtil';
import './CreateCategoryController.scss';

const CreateCategoryController = ({ updateCategoriesList }: { updateCategoriesList: () => void }): JSX.Element => {
  const [flippedStatus, setFlippedStatus] = useState<boolean>(false);
  const getFlippedCategoryControllerStyle = (): string => (flippedStatus ? ' create-category-controller_flipped' : '');

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
    event.currentTarget.reset();
    const newCategory = await createCategory(formData);
    if (newCategory && newCategory.image) {
      setFlippedStatus(false);
      updateCategoriesList();
    }
  };

  return (
    <div className={`create-category-controller${getFlippedCategoryControllerStyle()}`}>
      <div className='create-category-controller__content'>
        <div className='create-category-controller__front'>
          <div className='create-category-controller__data'>
            <h3 className='create-category-controller__title'>Add category</h3>
          </div>
          <div className='create-category-controller__actions'>
            <button
              className='create-category-controller__btn create-category-controller__btn_add'
              type='button'
              onClick={createBtnOnClick}
            >
              <AiOutlinePlusCircle className='create-category-controller__btn-icon' />
            </button>
          </div>
        </div>
        <div className='create-category-controller__back'>
          <form action='' className='create-category-controller__form' onSubmit={formOnSubmit}>
            <div className='create-category-controller__data'>
              <input
                type='text'
                className='create-category-controller__input'
                name='name'
                autoComplete='true'
                maxLength={20}
                required
                placeholder='Name'
              />

              <label
                htmlFor='create-category-controller__input_image'
                className='create-category-controller__label_file'
              >
                Image
                <input
                  type='file'
                  className='create-category-controller__input create-category-controller__input_file'
                  name='image'
                  id='create-category-controller__input_image'
                  accept='image/*'
                />
              </label>
            </div>
            <div className='create-category-controller__actions'>
              <input
                className='create-category-controller__btn create-category-controller__btn_cancel'
                type='reset'
                onClick={cancelBtnOnClick}
                value='Cancel'
              />
              <button
                className='create-category-controller__btn create-category-controller__btn_apply'
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

export default CreateCategoryController;
