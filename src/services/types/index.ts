import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';

import { store } from '../store';
import { TOpenedWindowsActions } from '../actions/open-windows';
import { TSystemActions } from '../actions/system';
import { TStartMenuActions } from '../actions/start-menu';
import { TNavBarActions } from '../actions/nav-bar';
import { TDesktopIsonsActions } from '../actions/desktop-icons';

export type RootState = ReturnType<typeof store.getState>;

export type TApplicationActions = TOpenedWindowsActions | TSystemActions | TStartMenuActions | TNavBarActions | TDesktopIsonsActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>; 

export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;