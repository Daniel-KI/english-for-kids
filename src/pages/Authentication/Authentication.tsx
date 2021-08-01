import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { UserModel } from '../../models/UserModel';
import signInUser from '../../service/userService';
import { playBtnSound } from '../../utils/audioUtil';
import { useDispatch, useSelector } from '../../utils/reactReduxHooks';
import { login } from '../../store/authenticationSlice';
import './Authentication.scss';

const Authentication = (): JSX.Element => {
  const { isAuth } = useSelector((state) => state.authentication);
  const history = useHistory();
  const dispatch = useDispatch();

  if (isAuth) {
    return <Redirect to='/admin-panel' />;
  }

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const loginData = formData.get('login');
    const passwordData = formData.get('password');
    if (!loginData || !passwordData) return;
    const user: UserModel = {
      login: loginData.toString(),
      password: passwordData.toString(),
    };
    const existsUser = await signInUser(user);
    if (existsUser !== null) {
      dispatch(login());
      history.push('/admin-panel');
      return;
    }
    history.push('/');
  };

  const submitButtonOnClick = () => {
    playBtnSound();
  };

  return (
    <div className='authentication'>
      <div className='container authentication__container'>
        <h1 className='authentication__title'>Log in</h1>
        <p className='authentication__info'>Test data - admin/admin</p>
        <div className='authentication__controls'>
          <form className='authentication__form' onSubmit={onFormSubmit}>
            <div className='authentication__form-data'>
              <label htmlFor='authentication__input_login' className='authentication__label'>
                Login
                <input
                  type='text'
                  className='authentication__input'
                  name='login'
                  id='authentication__input_login'
                  autoComplete='true'
                  maxLength={20}
                  required
                />
              </label>
              <label htmlFor='authentication__input_password' className='authentication__label'>
                Password
                <input
                  type='password'
                  className='authentication__input'
                  name='password'
                  id='authentication__input_password'
                  autoComplete='true'
                  maxLength={20}
                  required
                />
              </label>
            </div>
            <div className='authentication__form-controls'>
              <button
                className='authentication__btn authentication__btn_submit'
                type='submit'
                onClick={submitButtonOnClick}
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
