import uuid from 'react-uuid';
import {
    REPOSITION_NAV_BAR,
    ADD_NAV_BAR,
    REMOVE_NAV_BAR
} from '../constants/nav-bar';
import { INavBar, INavBarItem } from '../reducers/nav-bar';

export interface IRepositionNavBarAction {
    readonly type: typeof REPOSITION_NAV_BAR,
    readonly navBarApps: Array<INavBarItem>
}

export interface IAddNavBarAction {
    readonly type: typeof ADD_NAV_BAR,
    readonly id: string,
    readonly uid: string
}

export interface IAddNavBarUidAction {
    readonly type: typeof ADD_NAV_BAR,
    readonly id: string,
    readonly uid: string
}

export interface IRemoveNavBarAction {
    readonly type: typeof REMOVE_NAV_BAR,
    readonly id: string
}

export const repositionNavBar = (navBarApps:Array<INavBarItem>):IRepositionNavBarAction => ({
    type: REPOSITION_NAV_BAR, 
    navBarApps
});

export const addNavBar = (id:string):IAddNavBarAction => {
    const uid = uuid();
    
    return({
        type: ADD_NAV_BAR, 
        id,
        uid
    });
};

export const addNavBarUid = (id:string, uid:string):IAddNavBarUidAction => ({
    type: ADD_NAV_BAR, 
    id, 
    uid
});

export const removeNavBar = (id:string):IRemoveNavBarAction => ({
    type: REMOVE_NAV_BAR, 
    id
});

export type TNavBarActions =
  | IRepositionNavBarAction
  | IAddNavBarAction
  | IAddNavBarUidAction
  | IRemoveNavBarAction;