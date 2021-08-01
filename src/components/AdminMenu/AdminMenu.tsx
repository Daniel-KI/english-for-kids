import './AdminMenu.scss';
import { useEffect, useState } from 'react';
import { matchPath, NavLink, useLocation } from 'react-router-dom';
import { IoMdClose, IoMdMenu } from 'react-icons/io';
import { adminRoutes } from '../../data/routesData';
import { playBtnSound } from '../../utils/audioUtil';
import LogoutButton from '../LogoutButton/LogoutButton';

const AdminMenu = (): JSX.Element => {
  const location = useLocation();
  const [currentUrl, setCurrentUrl] = useState(location.pathname);
  const [isCollapsed, setCollapsedStatus] = useState<boolean>(true);

  useEffect(() => {
    setCurrentUrl(location.pathname);
  }, [location]);

  const menuItemOnClick = () => {
    playBtnSound();
  };

  const openBtnOnClick = () => {
    setCollapsedStatus(false);
  };

  const closeBtnOnClick = () => {
    setCollapsedStatus(true);
  };

  const addActiveRouteStyle = (path: string): string => {
    const match = matchPath(currentUrl, {
      path,
      exact: true,
    });
    if (match) return 'admin-menu__item_active';
    return '';
  };

  return (
    <div className='admin-menu'>
      <div className='container admin-menu__container'>
        {isCollapsed ? (
          <IoMdMenu className='admin-menu__btn admin-menu__btn_open' onClick={openBtnOnClick} />
        ) : (
          <IoMdClose className='admin-menu__btn admin-menu__btn_close' onClick={closeBtnOnClick} />
        )}
        <nav className={`admin-menu__nav ${isCollapsed ? 'admin-menu__nav_hidden' : ''}`}>
          <ul className='admin-menu__list'>
            {adminRoutes.map((route, index) => {
              if (route.name === 'words') {
                return (
                  <li
                    className={`admin-menu__item admin-menu__item_inactive ${addActiveRouteStyle(route.route)}`}
                    key={index.toString()}
                    onClick={menuItemOnClick}
                  >
                    <p className='admin-menu__link'> {route.label}</p>
                  </li>
                );
              }
              return (
                <li
                  className={`admin-menu__item ${addActiveRouteStyle(route.route)}`}
                  key={index.toString()}
                  onClick={menuItemOnClick}
                >
                  <NavLink className='admin-menu__link' to={route.route} exact>
                    {route.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
          <LogoutButton />
        </nav>
      </div>
    </div>
  );
};

export default AdminMenu;
