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

const initialState:any = {
    data: [],
    isScreensShow: false
};

export const openedWindowsReducer = (state = initialState, action:any) => { 
    switch (action.type) {
        case OPEN_WINDOW: return { 
            ...state, 
            data: [...state.data, action.windowData],
            isScreensShow: false
        }

        case RESIZE_WINDOW: {
            const windowProperties = action.windowProperties;
            
            return { 
                ...state, 
                data: state.data.map((window:any) => action.id==window.id?{...window, properties: windowProperties}:{...window}),
                isScreensShow: false
            }
        }

        case TO_ACTIVE_WINDOW: { 
            const windowProperties = action.windowProperties;
            
            return { 
                ...state, 
                data: state.data.map((window:any) => action.id==window.id?{...window, winStates: {...window.winStates, isCollapse: false, isActive: true}}:{...window, winStates: {...window.winStates,  isActive: false}}),
                isScreensShow: false
            }
        }

        case TO_ACTIVE_SCREEN_WINDOW: { 
            const windowProperties = action.windowProperties;
            
            return { 
                ...state, 
                data: state.data.map((window:any) => action.id==window.id?{...window, winStates: {...window.winStates, isScreenActive: true}}:{...window, winStates: {...window.winStates,  isScreenActive: false}}),
                isScreensShow: true
            }
        }

        case TO_DISACTIVE_SCREEN_WINDOW: {      
            return { 
                ...state, 
                isScreensShow: false
            }
        }

        case TO_DISACTIVE_WINDOWS: { 
            return { 
                ...state, 
                data: state.data.map((window:any) => { return {...window, winStates: {...window.winStates, isActive: false}}}),
                isScreensShow: false
            }
        }

        case TO_EXPAND_WINDOW: { 
            const isExpand = action.isExpand;
            
            return { 
                ...state, 
                data: state.data.map((window:any) => action.id==window.id?{...window, winStates: {...window.winStates, isExpand: isExpand}}:{...window, winStates: {...window.winStates}}),
                isScreensShow: false
            }
        }

        case TO_COLLAPSE_WINDOW: { 
            const isCollapse= action.isCollapse;
            
            return { 
                ...state, 
                data: state.data.map((window:any) => action.id==window.id?{...window, winStates: {...window.winStates, isCollapse: isCollapse}}:{...window, winStates: {...window.winStates}}),
                isScreensShow: false
            }
        }

        case REPOSITION_WINDOW: { 
            const windowProperties = action.windowProperties;
            
            return { 
                ...state, 
                data: state.data.map((window:any) => action.id==window.id?{...window, properties: {...window.properties, top: windowProperties.top, left: windowProperties.left}}:{...window}),
                isScreensShow: false
            }
        }

        case CLOSE_WINDOW: return { 
            ...state, 
            data: state.data.filter((window:any) => action.uid!==window.id), 
            isScreensShow: false
        }

        default: return state
    }
}