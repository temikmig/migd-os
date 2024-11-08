import uuid from 'react-uuid';
import {
    CHECK_START_MENU,

    REPOSITION_START_MENU_PINED,
    ADD_START_MENU_PINED,
    ADD_START_MENU_PINED_UID,
    REMOVE_START_MENU_PINED,
    REMOVE_START_MENU_PINED_UID,

    REPOSITION_START_MENU_TILES,
    ADD_START_MENU_TILES,
    ADD_START_MENU_TILES_UID,
    REMOVE_START_MENU_TILES,
    REMOVE_START_MENU_TILES_UID
} from '../constants/start-menu';
import { IStartMenuItem } from '../reducers/start-menu';

export interface ICheckStartMenuAction {
    readonly type: typeof CHECK_START_MENU;
    readonly startMenuState: boolean
}

export interface IRepositionStartMenuPinedAction {
    readonly type: typeof REPOSITION_START_MENU_PINED;
    readonly startMenuApps: Array<IStartMenuItem>
}

export interface IRepositionStartMenuTilesAction {
    readonly type: typeof REPOSITION_START_MENU_TILES;
    readonly startMenuApps: Array<IStartMenuItem>
}

export interface IAddStartMenuPinedAction {
    readonly type: typeof ADD_START_MENU_PINED;
    readonly id: string,
    readonly uid: string
}

export interface IAddStartMenuPinedUidAction {
    readonly type: typeof ADD_START_MENU_PINED_UID;
    readonly id: string,
    readonly uid: string
}

export interface IRemoveStartMenuPinedAction {
    readonly type: typeof REMOVE_START_MENU_PINED;
    readonly id: string
}

export interface IRemoveStartMenuPinedUidAction {
    readonly type: typeof REMOVE_START_MENU_PINED_UID;
    readonly uid: string
}

export interface IAddStartMenuTilesAction {
    readonly type: typeof ADD_START_MENU_TILES;
    readonly id: string,
    readonly uid: string
}

export interface IAddStartMenuTilesUidAction {
    readonly type: typeof ADD_START_MENU_TILES_UID;
    readonly id: string,
    readonly uid: string
}

export interface IRemoveStartMenuTilesAction {
    readonly type: typeof REMOVE_START_MENU_TILES;
    readonly id: string
}

export interface IRemoveStartMenuTilesUidAction {
    readonly type: typeof REMOVE_START_MENU_TILES_UID;
    readonly uid: string
}

export const checkStartMenu = (startMenuState:boolean):ICheckStartMenuAction => ({
    type: CHECK_START_MENU, 
    startMenuState
});

export const repositionStartMenuPined = (startMenuApps:Array<IStartMenuItem>):IRepositionStartMenuPinedAction => ({
    type: REPOSITION_START_MENU_PINED, 
    startMenuApps
});

export const repositionStartMenuTiles = (startMenuApps:Array<IStartMenuItem>):IRepositionStartMenuTilesAction => ({
    type: REPOSITION_START_MENU_TILES, 
    startMenuApps
});

export const addStartMenuPined = (id:string):IAddStartMenuPinedAction => {
    const uid = uuid();
    
    return({
        type: ADD_START_MENU_PINED, 
        id,
        uid
    });
};

export const addStartMenuPinedUid = (id:string, uid:string):IAddStartMenuPinedUidAction => ({
    type: ADD_START_MENU_PINED_UID, 
    id, 
    uid
});

export const removeStartMenuPined = (id:string):IRemoveStartMenuPinedAction => ({
    type: REMOVE_START_MENU_PINED, 
    id
});

export const removeStartMenuPinedUid = (uid:string):IRemoveStartMenuPinedUidAction => ({
    type: REMOVE_START_MENU_PINED_UID, 
    uid
});

export const addStartMenuTiles = (id:string):IAddStartMenuTilesAction => {
    const uid = uuid();
    
    return({
        type: ADD_START_MENU_TILES, 
        id,
        uid
    });
};

export const addStartMenuTilesUid = (id:string, uid:string):IAddStartMenuTilesUidAction => ({
    type: ADD_START_MENU_TILES_UID, 
    id, 
    uid
});

export const removeStartMenuTiles = (id:string):IRemoveStartMenuTilesAction => ({
    type: REMOVE_START_MENU_TILES, 
    id
});

export const removeStartMenuTilesUid = (uid:string):IRemoveStartMenuTilesUidAction => ({
    type: REMOVE_START_MENU_TILES_UID, 
    uid
});

export type TStartMenuActions =
  | ICheckStartMenuAction
  | IRepositionStartMenuPinedAction
  | IRepositionStartMenuTilesAction
  | IAddStartMenuPinedAction
  | IAddStartMenuPinedUidAction
  | IRemoveStartMenuPinedAction
  | IRemoveStartMenuPinedUidAction
  | IAddStartMenuTilesAction
  | IAddStartMenuTilesUidAction
  | IRemoveStartMenuTilesAction
  | IRemoveStartMenuTilesUidAction;