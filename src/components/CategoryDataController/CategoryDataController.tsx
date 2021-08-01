import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_PATH } from '../../data/serverData';
import { CategoryModel } from '../../models/CategoryModel';
import { deleteCategoryById, updateCategory } from '../../service/categoryService';
import { getWordsByCategoryId } from '../../service/wordService';
import { playBtnSound } from '../../utils/audioUtil';
import './CategoryDataController.scss';

const CategoryDataController = ({
  data,
  updateCategoriesList,
}: {
  data: CategoryModel;
  updateCategoriesList: () => void;
}): JSX.Element => {
  const [categoryData, setCategoryData] = useState<CategoryModel>(data);
  const [flippedStatus, setFlippedStatus] = useState<boolean>(false);
  const [wordsAmount, setWordsAmount] = useState<number>();
  const getFlippedCategoryControllerStyle = (): string => (flippedStatus ? ' category-data-controller_flipped' : '');

  const loadWordsData = () => {
    if (data._id) {
      getWordsByCategoryId(data._id).then((wordsData) => {
        setWordsAmount(wordsData.length);
      });
    }
  };

  useEffect(() => {
    if (!wordsAmount) {
      loadWordsData();
    }
  });

  const updateBtnOnClick = () => {
    playBtnSound();
    setFlippedStatus(true);
  };

  const wordsBtnOnClick = () => {
    playBtnSound();
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
    if (categoryData?._id) {
      setFlippedStatus(false);
      await deleteCategoryById(categoryData._id);
      updateCategoriesList();
    }
  };

  const formOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    playBtnSound();
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (data._id) {
      const newData = await updateCategory(data._id, formData);
      if (newData._id) {
        setCategoryData({ ...newData });
        setFlippedStatus(false);
      }
    }
  };

  return (
    <div className={`category-data-controller${getFlippedCategoryControllerStyle()}`}>
      <div className='category-data-controller__content'>
        <div className='category-data-controller__front'>
          <img src={`${API_PATH}${categoryData.image}`} alt='category' className='category-data-controller__image' />
          <div className='category-data-controller__data'>
            <h3 className='category-data-controller__title'>{categoryData.name}</h3>
            <h4 className='category-data-controller__info'>{wordsAmount} words</h4>
          </div>
          <div className='category-data-controller__actions'>
            <button
              className='category-data-controller__btn category-data-controller__btn_update'
              type='button'
              onClick={updateBtnOnClick}
            >
              Update
            </button>
            <Link
              to={`/admin-panel/${categoryData._id}/words`}
              className='category-data-controller__btn category-data-controller__btn_words'
              onClick={wordsBtnOnClick}
            >
              Words
            </Link>
            <button
              className='category-data-controller__btn category-data-controller__btn_delete'
              type='button'
              onClick={deleteBtnOnClick}
            >
              Delete
            </button>
          </div>
        </div>
        <div className='category-data-controller__back'>
          <form action='' className='category-data-controller__form' onSubmit={formOnSubmit}>
            <div className='category-data-controller__data'>
              <input
                type='text'
                className='category-data-controller__input'
                name='name'
                autoComplete='true'
                maxLength={20}
                required
                defaultValue={categoryData.name}
              />
              <label
                htmlFor={`category-data-controller__input_image-${categoryData.name}`}
                className='category-data-controller__label_file'
              >
                Image
                <input
                  type='file'
                  className='category-data-controller__input category-data-controller__input_file'
                  name='image'
                  id={`category-data-controller__input_image-${categoryData.name}`}
                  accept='image/*'
                />
              </label>
            </div>
            <div className='category-data-controller__actions'>
              <input
                className='category-data-controller__btn category-data-controller__btn_cancel'
                type='reset'
                onClick={cancelBtnOnClick}
                value='Cancel'
              />
              <button
                className='category-data-controller__btn category-data-controller__btn_apply'
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

export default CategoryDataController;
