import './Main.scss';
import { useEffect, useState } from 'react';

import CategoryCard from '../../components/CategoryCard/CategoryCard';
import { getCategories } from '../../service/categoryService';
import { CategoryModel } from '../../models/CategoryModel';

const Main = (): JSX.Element => {
  const [categoriesData, setCategoriesData] = useState<CategoryModel[]>();

  useEffect(() => {
    getCategories().then((data) => {
      setCategoriesData(data);
    });
  }, [setCategoriesData]);

  if (!categoriesData) {
    return (
      <div className='main'>
        <div className='container main__container'>
          <img className='main__preloader' src='/loader.gif' alt='loader' />
        </div>
      </div>
    );
  }

  if (!categoriesData.length) {
    return (
      <div className='main'>
        <div className='container main__container'>
          <h1 className='main__title main__title_empty'>No categories</h1>
        </div>
      </div>
    );
  }

  return (
    <div className='main'>
      <div className='container main__container'>
        <h1 className='main__title'>English for kids</h1>
        {categoriesData ? (
          <div className='main__categories'>
            {categoriesData.map((category, index) => {
              return <CategoryCard data={category} key={index.toString()} />;
            })}
          </div>
        ) : (
          <div className=''>
            <img src='./loader.gif' alt='loader' />
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
