import {
    REPOSITION_DESKTOP_ICON
} from '../constants/desktop-icons'

export const repositionDesktopIcon = (id:any, properties:any):any => ({
    type: REPOSITION_DESKTOP_ICON, 
    id,
    properties
});