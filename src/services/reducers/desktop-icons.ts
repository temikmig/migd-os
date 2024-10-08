import { 
    REPOSITION_DESKTOP_ICON
} from '../constants/desktop-icons';

const initialState:any = {
    data: []
};

export const desktopIconsPositionReducer = (state = initialState, action:any) => { 
    switch (action.type) {
        case REPOSITION_DESKTOP_ICON: {
            
            const fd = state.data.find((icon:any) => icon.id==action.id);

            if(!fd) {
                return { 
                    ...state, 
                    data: [...state.data, {id: action.id, properties: action.properties}]
                }} else {
                    return { 
                        ...state, 
                        data: state.data.map((icon:any) => icon.id==action.id?{...icon, properties: action.properties}:{...icon})
                    }
                }
        }

        default: return state
    }
}