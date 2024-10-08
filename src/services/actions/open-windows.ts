import {
    OPEN_WINDOW,
    RESIZE_WINDOW, 
    REPOSITION_WINDOW,
    TO_ACTIVE_WINDOW,
    TO_DISACTIVE_WINDOWS,
    TO_EXPAND_WINDOW,
    CLOSE_WINDOW
} from '../constants/open-windows';

export interface IOpenWindowAction {
    readonly type: typeof OPEN_WINDOW;
    readonly windowData: any;
}

export interface IResizeWindowAction {
    readonly type: typeof RESIZE_WINDOW;
    readonly id: any;
    readonly windowProperties: any;
}

export interface IRepositionWindowAction {
    readonly type: typeof REPOSITION_WINDOW;
    readonly id: any;
    readonly windowProperties: any;
}

export interface IToActiveWindowAction {
    readonly type: typeof TO_ACTIVE_WINDOW;
    readonly id: any;
}

export interface IToDisactiveWindowsAction {
    readonly type: typeof TO_DISACTIVE_WINDOWS;
    readonly id: any;
}

export interface IToExpandWindowAction {
    readonly type: typeof TO_EXPAND_WINDOW;
    readonly id: any;
    readonly isExpand: boolean;
}

export interface ICloseWindowAction {
    readonly type: typeof CLOSE_WINDOW;
    readonly uid: string;
}

export const openWindow = (windowData:any):any => ({
    type: OPEN_WINDOW,
    windowData
});

export const resizeWindow = (id:any, windowProperties:any):any => ({
    type: RESIZE_WINDOW,
    id,
    windowProperties
});

export const repositionWindow = (id:any, windowProperties:any):any => ({
    type: REPOSITION_WINDOW,
    id,
    windowProperties
});

export const toActiveWindow = (id:any):any => ({
    type: TO_ACTIVE_WINDOW,
    id
});

export const toDisactiveWindows = (id:any):any => ({
    type: TO_DISACTIVE_WINDOWS,
    id
});

export const toExpandWindow = (id:any, isExpand:boolean):any => ({
    type: TO_EXPAND_WINDOW,
    id,
    isExpand
});

export const closeWindow = (uid:any):any => ({
    type: CLOSE_WINDOW,
    uid
});

export type TOpenedWindowsActions =
  | IOpenWindowAction
  | ICloseWindowAction;