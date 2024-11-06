import { TOpenedWindowsActions } from '../actions/open-windows';
import { 
    OPEN_WINDOW, 
    OPEN_WINDOW_ONCE,
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

interface IOpenWindows {
    data: Array<IOpenWindowItem>,
    isScreensShow: boolean,
    activeWindow: null | string,
    activeScreenWindow: null | string
}

export interface IOpenWindowItem {
    id: string,
    properties: IWindowPproperties,
    winProps: {
        canExpand: boolean,
        canCollapse: boolean,
        canResize: boolean
    },
    winStates: {
        isExpand: boolean,
        isCollapse: boolean,
        isDragging: boolean
    },
    application: string,
    applicationId: string
}

export interface IWindowPproperties {
    top: number,
    left: number,
    width?: number,
    height?: number
}

const initialState:IOpenWindows = {
    data: [],
    isScreensShow: false,
    activeWindow: null,
    activeScreenWindow: null
};

export const openedWindowsReducer = (state = initialState, action:TOpenedWindowsActions) => { 
    switch (action.type) {
        case OPEN_WINDOW: return { 
            ...state, 
            data: [...state.data, action.windowData],
            isScreensShow: false,
            activeWindow: action.windowData.id
        }

        case OPEN_WINDOW_ONCE: return { 
            ...state, 
            data: [...state.data, state.data.map((window) => window.application!=action.windowData.application?window:'')],
            // isScreensShow: false,
            // activeWindow: action.windowData.id
        }

        case RESIZE_WINDOW: {
            const windowProperties = action.windowProperties;
            
            return { 
                ...state, 
                data: state.data.map((window) => action.id==window.id?{...window, properties: windowProperties}:{...window}),
                isScreensShow: false,
                activeWindow: action.id
            }
        }

        case TO_ACTIVE_WINDOW: { 
            return { 
                ...state, 
                data: state.data.map((window) => action.id==window.id?{...window, winStates: {...window.winStates, isCollapse: false}}:{...window, winStates: {...window.winStates}}),
                isScreensShow: false,
                activeWindow: action.id
            }
        }

        case TO_ACTIVE_SCREEN_WINDOW: { 
            return { 
                ...state, 
                isScreensShow: true,
                activeScreenWindow: action.id
            }
        }

        case TO_DISACTIVE_SCREEN_WINDOW: {      
            return { 
                ...state, 
                isScreensShow: false,
                activeScreenWindow: null
            }
        }

        case TO_DISACTIVE_WINDOWS: { 
            return { 
                ...state, 
                isScreensShow: false,
                activeWindow: null
            }
        }

        case TO_EXPAND_WINDOW: { 
            const isExpand = action.isExpand;
            
            return { 
                ...state, 
                data: state.data.map((window) => action.id==window.id?{...window, winStates: {...window.winStates, isExpand: isExpand}}:{...window, winStates: {...window.winStates}}),
                isScreensShow: false
            }
        }

        case TO_COLLAPSE_WINDOW: { 
            const isCollapse= action.isCollapse;
            
            return { 
                ...state, 
                data: state.data.map((window) => action.id==window.id?{...window, winStates: {...window.winStates, isCollapse: isCollapse}}:{...window, winStates: {...window.winStates}}),
                isScreensShow: false,
                activeWindow: null
            }
        }

        case REPOSITION_WINDOW: { 
            const windowProperties = action.windowProperties;
            
            return { 
                ...state, 
                data: state.data.map((window) => action.id==window.id?{...window, properties: {...window.properties, top: windowProperties.top, left: windowProperties.left}}:{...window}),
                isScreensShow: false
            }
        }

        case CLOSE_WINDOW: return { 
            ...state, 
            data: state.data.filter((window) => action.uid!==window.id), 
            isScreensShow: false
        }

        default: return state
    }
}