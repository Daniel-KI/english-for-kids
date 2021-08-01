import './Category.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import GameController from '../../components/GameController/GameController';
import VocabCard from '../../components/VocabCard/VocabCard';
import { resetGameSliceState } from '../../store/gameSlice';
import { useDispatch, useSelector } from '../../utils/reactReduxHooks';
import { WordModel } from '../../models/WordModel';
import { getWordsByCategoryId } from '../../service/wordService';
import { CategoryModel } from '../../models/CategoryModel';
import { getCategoryById } from '../../service/categoryService';

const Category = (): JSX.Element => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const isGameMode = useSelector((state) => state.game.isGameMode);

  const [categoryData, setCategoryData] = useState<CategoryModel>();
  const [categoryWords, setCategoryWords] = useState<WordModel[]>([]);

  useEffect(() => {
    getCategoryById(id).then((data) => {
      setCategoryData(data);
    });
  }, [id, setCategoryData]);

  useEffect(() => {
    getWordsByCategoryId(id).then((data) => {
      setCategoryWords(data);
    });
  }, [id, setCategoryWords]);

  useEffect(() => {
    dispatch(resetGameSliceState());
  }, [categoryData, dispatch]);

  if (categoryData === null && !categoryWords.length) {
    return (
      <div className='category'>
        <div className='container category__container'>
          <h1 className='category__title category__title_empty'>No data received</h1>
        </div>
      </div>
    );
  }

  if (categoryData === undefined || !categoryWords.length) {
    return (
      <div className='category'>
        <div className='container category__container'>
          <img className='category__preloader' src='/loader.gif' alt='loader' />
        </div>
      </div>
    );
  }

  return (
    <div className='category'>
      <div className='container category__container'>
        <h1 className='category__title'>{categoryData.name}</h1>
        <div className='category__words'>
          {categoryWords.map((word, index) => (
            <VocabCard data={word} key={index.toString()} />
          ))}
        </div>
        {isGameMode ? <GameController categoryWords={categoryWords} /> : ''}
      </div>
    </div>
  );
};

export default Category;
