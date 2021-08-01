import { useEffect, useRef, useState } from 'react';
import { IoMdClose, IoMdMenu } from 'react-icons/io';
import { Link, useLocation } from 'react-router-dom';
import './Menu.scss';

import categoriesData from '../../data/categoriesData';
import routs from '../../data/routesData';
import useOutsideClick from '../../hooks/useOutsideClick';
import { playBtnSound, playMenuSound } from '../../utils/audioUtil';
import ModeToggle from '../ModeToggle/ModeToggle';

const Menu = (): JSX.Element => {
  const location = useLocation();
  const [currentUrl, setCurrentUrl] = useState(location.pathname.split('/')[1]);
  const [isCollapsed, setCollapsedStatus] = useState<boolean>(true);
  const wrapperRef = useRef(null);

  useOutsideClick(wrapperRef, () => {
    setCollapsedStatus(true);
    playMenuSound();
  });

  useEffect(() => {
    setCollapsedStatus(true);
    setCurrentUrl(location.pathname.split('/')[1]);
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
            if (route.name !== 'category') {
              return (
                <li
                  className={`menu__item ${addActiveRouteStyle(route.name)}`}
                  key={index.toString()}
                  onClick={menuItemOnClick}
                >
                  <Link className='menu__link' to={route.route}>
                    {route.label}
                  </Link>
                </li>
              );
            }
            return '';
          })}
          {Object.entries(categoriesData).map(([name, data], index) => {
            const path = `category-${name}`;
            return (
              <li
                className={`menu__item ${addActiveRouteStyle(path)}`}
                key={index.toString()}
                onClick={menuItemOnClick}
              >
                <Link className='menu__link' to={path}>
                  {data.label}
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
