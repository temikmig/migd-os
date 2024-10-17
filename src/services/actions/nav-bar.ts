import uuid from 'react-uuid';
import {
    REPOSITION_NAV_BAR,
    ADD_NAV_BAR_UID,
    REMOVE_NAV_BAR
} from '../constants/nav-bar';

export const repositionNavBar = (navBarApps:any):any => ({
    type: REPOSITION_NAV_BAR, 
    navBarApps
});

export const addNavBarUid = (id:string, uid:string):any => ({
    type: ADD_NAV_BAR_UID, 
    id, 
    uid
});

export const removeNavBar = (id:string):any => ({
    type: REMOVE_NAV_BAR, 
    id
});