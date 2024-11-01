import {
    OPEN_WINDOW,
    RESIZE_WINDOW, 
    REPOSITION_WINDOW,
    TO_ACTIVE_WINDOW,
    TO_ACTIVE_SCREEN_WINDOW,
    TO_DISACTIVE_SCREEN_WINDOW,
    TO_DISACTIVE_WINDOWS,
    TO_EXPAND_WINDOW,
    TO_COLLAPSE_WINDOW,
    CLOSE_WINDOW
} from '../constants/open-windows';
import { IOpenWindowItem, IWindowPproperties } from '../reducers/open-windows';

interface IOpenWindowAction {
    readonly type: typeof OPEN_WINDOW;
    readonly windowData: IOpenWindowItem;
}

interface IResizeWindowAction {
    readonly type: typeof RESIZE_WINDOW;
    readonly id: string;
    readonly windowProperties: IWindowPproperties;
}

interface IRepositionWindowAction {
    readonly type: typeof REPOSITION_WINDOW;
    readonly id: string;
    readonly windowProperties: IWindowPproperties;
}

interface IToActiveWindowAction {
    readonly type: typeof TO_ACTIVE_WINDOW;
    readonly id: string;
}

interface IToActiveScreenWindowAction {
    readonly type: typeof TO_ACTIVE_SCREEN_WINDOW;
    readonly id: string;
}

interface IToDisactiveScreenWindowAction {
    readonly type: typeof TO_DISACTIVE_SCREEN_WINDOW;
}

interface IToDisactiveWindowsAction {
    readonly type: typeof TO_DISACTIVE_WINDOWS;
}

interface IToCollapseWindowAction {
    readonly type: typeof TO_COLLAPSE_WINDOW;
    readonly id: string;
    readonly isCollapse: boolean;
}

interface IToExpandWindowAction {
    readonly type: typeof TO_EXPAND_WINDOW;
    readonly id: string;
    readonly isExpand: boolean;
}

interface ICloseWindowAction {
    readonly type: typeof CLOSE_WINDOW;
    readonly uid: string;
}

export const openWindow = (windowData:any):IOpenWindowAction => ({
    type: OPEN_WINDOW,
    windowData
});

export const resizeWindow = (id:string, windowProperties:any):IResizeWindowAction => ({
    type: RESIZE_WINDOW,
    id,
    windowProperties
});

export const repositionWindow = (id:string, windowProperties:any):IRepositionWindowAction => ({
    type: REPOSITION_WINDOW,
    id,
    windowProperties
});

export const toActiveWindow = (id:string):IToActiveWindowAction => ({
    type: TO_ACTIVE_WINDOW,
    id
});

export const toActiveScreenWindow = (id:string):IToActiveScreenWindowAction => ({
    type: TO_ACTIVE_SCREEN_WINDOW,
    id
});

export const toDisactiveScreenWindow = ():IToDisactiveScreenWindowAction => ({
    type: TO_DISACTIVE_SCREEN_WINDOW,
});

export const toDisactiveWindows = ():IToDisactiveWindowsAction => ({
    type: TO_DISACTIVE_WINDOWS
});

export const toExpandWindow = (id:string, isExpand:boolean):IToExpandWindowAction => ({
    type: TO_EXPAND_WINDOW,
    id,
    isExpand
});

export const toCollapseWindow = (id:string, isCollapse:boolean):IToCollapseWindowAction => ({
    type: TO_COLLAPSE_WINDOW,
    id,
    isCollapse
});

export const closeWindow = (uid:string):ICloseWindowAction => ({
    type: CLOSE_WINDOW,
    uid
});

export type TOpenedWindowsActions =
  | IOpenWindowAction
  | IResizeWindowAction
  | IRepositionWindowAction
  | IToActiveWindowAction
  | IToActiveScreenWindowAction
  | IToDisactiveScreenWindowAction
  | IToDisactiveWindowsAction
  | IToExpandWindowAction
  | IToCollapseWindowAction
  | ICloseWindowAction;