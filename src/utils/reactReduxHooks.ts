import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';

import { AppDispatch, RootState } from '../store/store';

export const useDispatch = (): AppDispatch => useReduxDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
