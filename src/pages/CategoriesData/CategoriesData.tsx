import React, { useEffect, useState } from 'react';
import CategoryDataController from '../../components/CategoryDataController/CategoryDataController';
import CreateCategoryController from '../../components/CreateCategoryController/CreateCategoryController';
import { CategoryModel } from '../../models/CategoryModel';
import { getCategories } from '../../service/categoryService';
import './CategoriesData.scss';

const CategoriesData = (): JSX.Element => {
  const limit = 4;
  const [categoriesData, setCategoriesData] = useState<CategoryModel[]>();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [fetching, setFetching] = useState<boolean>(true);

  const scrollHandler = () => {
    const pagePosition =
      document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight);
    if (pagePosition < 30) {
      setFetching(true);
    }
  };

  const loadCategoriesData = () => {
    getCategories(currentPage, limit)
      .then((data) => {
        if (categoriesData) {
          setCategoriesData([...categoriesData, ...data]);
        } else {
          setCategoriesData(data);
        }
        setCurrentPage((prevState) => prevState + 1);
      })
      .finally(() => {
        setFetching(false);
      });
  };

  useEffect(() => {
    if (fetching) {
      loadCategoriesData();
    }
  }, [fetching]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  });

  const updateCategoriesList = () => {
    setCurrentPage(0);
    setCategoriesData([]);
    setFetching(true);
  };

  if (!categoriesData) {
    return (
      <div className='categories-data'>
        <div className='container categories-data__container'>
          <img className='categories-data__preloader' src='/loader.gif' alt='loader' />
        </div>
      </div>
    );
  }

  if (!categoriesData.length) {
    return (
      <div className='categories-data'>
        <div className='container categories-data__container'>
          <h1 className='categories-data__title categories-data__title_empty'>No data received</h1>
          <CreateCategoryController updateCategoriesList={updateCategoriesList} />
        </div>
      </div>
    );
  }

  return (
    <div className='categories-data'>
      <div className='container categories-data__container'>
        <h1 className='categories-data__title'>Categories data</h1>
        <div className='categories-data__records'>
          {categoriesData.map((data, categoryIndex) => {
            return (
              <CategoryDataController
                data={data}
                updateCategoriesList={updateCategoriesList}
                key={categoryIndex.toString()}
              />
            );
          })}
          <CreateCategoryController updateCategoriesList={updateCategoriesList} />
        </div>
      </div>
    </div>
  );
};

export default CategoriesData;
