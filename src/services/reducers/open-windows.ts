import { 
    OPEN_WINDOW, 
    RESIZE_WINDOW,
    REPOSITION_WINDOW,
    TO_ACTIVE_WINDOW,
    TO_DISACTIVE_WINDOWS,
    TO_EXPAND_WINDOW,
    CLOSE_WINDOW
} from '../constants/open-windows';

const initialState:any = {
    data: []
};

export const openedWindowsReducer = (state = initialState, action:any) => { 
    switch (action.type) {
        case OPEN_WINDOW: return { 
            ...state, 
            data: [...state.data, action.windowData]
        }

        case RESIZE_WINDOW: {
            const windowProperties = action.windowProperties;
            
            return { 
                ...state, 
                data: state.data.map((window:any) => action.id==window.id?{...window, properties: windowProperties}:{...window})
            }
        }

        case TO_ACTIVE_WINDOW: { 
            const windowProperties = action.windowProperties;
            
            return { 
                ...state, 
                data: state.data.map((window:any) => action.id==window.id?{...window, winStates: {...window.winStates,  isActive: true}}:{...window, winStates: {...window.winStates,  isActive: false}})
            }
        }

        case TO_DISACTIVE_WINDOWS: { 
            return { 
                ...state, 
                data: state.data.map((window:any) => { return {...window, winStates: {...window.winStates,  isActive: false}}})
            }
        }

        case TO_EXPAND_WINDOW: { 
            const isExpand = action.isExpand;
            
            return { 
                ...state, 
                data: state.data.map((window:any) => action.id==window.id?{...window, winStates: {...window.winStates, isExpand: isExpand}}:{...window, winStates: {...window.winStates}})
            }
        }

        case REPOSITION_WINDOW: { 
            const windowProperties = action.windowProperties;
            
            return { 
                ...state, 
                data: state.data.map((window:any) => action.id==window.id?{...window, properties: {...window.properties, top: windowProperties.top, left: windowProperties.left}}:{...window})
            }
        }

        case CLOSE_WINDOW: return { 
            ...state, 
            data: state.data.filter((window:any) => action.uid!==window.id)
        }

        default: return state
    }
}