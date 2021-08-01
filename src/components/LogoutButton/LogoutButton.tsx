import './LogoutButton.scss';
import { playBtnSound } from '../../utils/audioUtil';
import { logout } from '../../store/authenticationSlice';
import { useDispatch } from '../../utils/reactReduxHooks';

const LogoutButton = (): JSX.Element => {
  const dispatch = useDispatch();
  const logoutBtnOnClick = () => {
    playBtnSound();
    dispatch(logout());
  };

  return (
    <button className='logout-button' type='button' onClick={logoutBtnOnClick}>
      Logout
    </button>
  );
};

export default LogoutButton;
