import { 
    REPOSITION_DESKTOP_ICON
} from '../constants/desktop-icons';

export interface IDesktopIcons {
    data: Array<IDesktopIconItem>
}

export interface IDesktopIconItem {
    id: string,
    properties: IDesktopIconItemProperties
}

export interface IDesktopIconItemProperties {
    left: number,
    top: number,
}

const initialState:IDesktopIcons = {
    data: []
};

export const desktopIconsPositionReducer = (state = initialState, action:any) => { 
    switch (action.type) {
        case REPOSITION_DESKTOP_ICON: {
            
            const fd = state.data.find((icon) => icon.id==action.id);

            if(!fd) {
                return { 
                    ...state, 
                    data: [...state.data, {id: action.id, properties: action.properties}]
                }} else {
                    return { 
                        ...state, 
                        data: state.data.map((icon) => icon.id==action.id?{...icon, properties: action.properties}:{...icon})
                    }
                }
        }

        default: return state
    }
}