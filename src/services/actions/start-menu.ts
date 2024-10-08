import {
    CHECK_START_MENU,
    REPOSITION_PINED_START_MENU
} from '../constants/start-menu';

export const checkStartMenu = (startMenuState:boolean):any => ({
    type: CHECK_START_MENU, 
    startMenuState
});

export const repositionPinedStartMenu = (startMenuApps:any):any => ({
    type: REPOSITION_PINED_START_MENU, 
    startMenuApps
});