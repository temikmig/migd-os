import uuid from 'react-uuid';
import {
    CHECK_START_MENU,
    REPOSITION_START_MENU_PINED,
    REPOSITION_START_MENU_TILES,
    ADD_START_MENU_TILES,
    ADD_START_MENU_TILES_UID,
    REMOVE_START_MENU_TILES,
    REMOVE_START_MENU_TILES_UID
} from '../constants/start-menu';

export const checkStartMenu = (startMenuState:boolean):any => ({
    type: CHECK_START_MENU, 
    startMenuState
});

export const repositionStartMenuPined = (startMenuApps:any):any => ({
    type: REPOSITION_START_MENU_PINED, 
    startMenuApps
});

export const repositionStartMenuTiles = (startMenuApps:any):any => ({
    type: REPOSITION_START_MENU_TILES, 
    startMenuApps
});

export const addStartMenuTiles = (id:string):any => {
    const uid = uuid();
    
    return({
        type: ADD_START_MENU_TILES, 
        id,
        uid
    });
};

export const addStartMenuTilesUid = (id:string, uid:string):any => ({
    type: ADD_START_MENU_TILES_UID, 
    id, 
    uid
});

export const removeStartMenuTiles = (id:string):any => ({
    type: REMOVE_START_MENU_TILES, 
    id
});

export const removeStartMenuTilesUid = (uid:string):any => ({
    type: REMOVE_START_MENU_TILES_UID, 
    uid
});