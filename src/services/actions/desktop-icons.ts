import {
    REPOSITION_DESKTOP_ICON
} from '../constants/desktop-icons'
import { IDesktopIconItemProperties } from '../reducers/desktop-icons';

export interface IRepositionDesktopIconAction {
    readonly type: typeof REPOSITION_DESKTOP_ICON,
    readonly id: string, 
    readonly properties: IDesktopIconItemProperties
}

export const repositionDesktopIcon = (id:string, properties:IDesktopIconItemProperties):IRepositionDesktopIconAction => ({
    type: REPOSITION_DESKTOP_ICON, 
    id,
    properties
});

export type TDesktopIsonsActions =
  | IRepositionDesktopIconAction;