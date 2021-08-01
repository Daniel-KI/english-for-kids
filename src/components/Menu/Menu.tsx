import { useEffect, useRef, useState } from 'react';
import { IoMdClose, IoMdMenu } from 'react-icons/io';
import { Link, useLocation } from 'react-router-dom';
import './Menu.scss';

import routs from '../../data/routesData';
import useOutsideClick from '../../hooks/useOutsideClick';
import { playBtnSound, playMenuSound } from '../../utils/audioUtil';
import ModeToggle from '../ModeToggle/ModeToggle';
import { CategoryModel } from '../../models/CategoryModel';
import { getCategories } from '../../service/categoryService';

const Menu = (): JSX.Element => {
  const location = useLocation();
  const [currentUrl, setCurrentUrl] = useState(location.pathname);
  const [categoriesData, setCategoriesData] = useState<CategoryModel[]>([]);
  const [isCollapsed, setCollapsedStatus] = useState<boolean>(true);
  const wrapperRef = useRef(null);

  useEffect(() => {
    getCategories().then((data) => {
      setCategoriesData(data);
    });
  }, [setCategoriesData]);

  useOutsideClick(wrapperRef, () => {
    setCollapsedStatus(true);
    playMenuSound();
  });

  useEffect(() => {
    setCollapsedStatus(true);
    setCurrentUrl(location.pathname);
  }, [location]);

  const openMenuBtnOnClick = () => {
    playBtnSound();
    playMenuSound();
    setCollapsedStatus(false);
  };
  const closeBtnOnClick = () => {
    playBtnSound();
    playMenuSound();
    setCollapsedStatus(true);
  };
  const menuItemOnClick = () => {
    playMenuSound();
    playBtnSound();
  };
  const getCollapsedStyle = (status: boolean): string => (status ? 'menu__sidebar_collapsed' : '');
  const addActiveRouteStyle = (path: string) => (path === currentUrl ? 'menu__item_active' : '');

  return (
    <div className='menu' ref={!isCollapsed ? wrapperRef : undefined}>
      <header className='menu__header'>
        <div className='container menu__container'>
          <IoMdMenu className='menu__btn menu__btn_open' onClick={openMenuBtnOnClick} />
          <ModeToggle />
        </div>
      </header>
      <nav className={`menu__sidebar ${getCollapsedStyle(isCollapsed)}`}>
        <IoMdClose className='menu__btn menu__btn_close' onClick={closeBtnOnClick} />
        <ul className='menu__list'>
          {routs.map((route, index) => {
            if (route.name === 'category') {
              return categoriesData.map((category) => {
                const path = `/category/${category._id}`;
                return (
                  <li
                    className={`menu__item ${addActiveRouteStyle(path)}`}
                    key={category.name}
                    onClick={menuItemOnClick}
                  >
                    <Link className='menu__link' to={path}>
                      {category.name}
                    </Link>
                  </li>
                );
              });
            }
            if (route.name === 'authentication') {
              return (
                <li className='menu__item menu__item_authentication' key={index.toString()} onClick={menuItemOnClick}>
                  <Link className='menu__link' to={route.route}>
                    {route.label}
                  </Link>
                </li>
              );
            }
            return (
              <li
                className={`menu__item ${addActiveRouteStyle(route.route)}`}
                key={index.toString()}
                onClick={menuItemOnClick}
              >
                <Link className='menu__link' to={route.route}>
                  {route.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
