import './Category.scss';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GameController from '../../components/GameController/GameController';
import VocabCard from '../../components/VocabCard/VocabCard';
import categoriesData from '../../data/categoriesData';
import { resetCategorySliceState } from '../../store/categorySlice';
import { useDispatch, useSelector } from '../../utils/reactReduxHooks';

const Category = (): JSX.Element => {
  const dispatch = useDispatch();
  const { name } = useParams<{ name: string }>();
  const isGameMode = useSelector((state) => state.category.isGameMode);
  const data = Object.entries(categoriesData).find(([categoryName]) => categoryName === name)?.[1];

  useEffect(() => {
    dispatch(resetCategorySliceState());
  }, [data, dispatch]);

  if (!data || !data.words) {
    return (
      <div className='category'>
        <div className='container category__container'>
          <h1 className='category__title category__title_empty'>Category does not exist</h1>
        </div>
      </div>
    );
  }

  return (
    <div className='category'>
      <div className='container category__container'>
        <h1 className='category__title'>{data.label}</h1>
        <div className='category__words'>
          {data.words.map((word, index) => (
            <VocabCard data={word} key={index.toString()} />
          ))}
        </div>
        {isGameMode ? <GameController data={data} /> : ''}
      </div>
    </div>
  );
};

export default Category;
