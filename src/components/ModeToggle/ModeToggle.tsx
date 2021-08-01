import { toggleGameMode } from '../../store/categorySlice';
import { playToggleSound } from '../../utils/audioUtil';
import { useDispatch, useSelector } from '../../utils/reactReduxHooks';
import './ModeToggle.scss';

const ModeToggle = (): JSX.Element => {
  const isGameMode = useSelector((state) => state.category.isGameMode);
  const dispatch = useDispatch();

  const toggleInputOnChange = () => {
    playToggleSound();
    dispatch(toggleGameMode());
  };

  return (
    <div className='toggle'>
      <label className='toggle__label' htmlFor='toggle__input'>
        <input
          checked={isGameMode}
          className='toggle__input'
          id='toggle__input'
          onChange={toggleInputOnChange}
          type='checkbox'
        />
        <p className='toggle__control' data-checked='play' data-unchecked='train' />
      </label>
    </div>
  );
};

export default ModeToggle;
