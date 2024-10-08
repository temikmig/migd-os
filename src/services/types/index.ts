import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, ActionCreator, Dispatch } from 'redux';

import { store } from '../store';
import { TOpenedWindowsActions } from '../actions/open-windows';

export type RootState = ReturnType<typeof store.getState>;

export type TApplicationActions = TOpenedWindowsActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>; 

export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;