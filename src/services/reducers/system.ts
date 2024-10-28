import { 
    CHANGE_VOLUME,
    CHANGE_BRIGHTNESS,
    CHANGE_WIFI,
    CHANGE_BLUETOOTH,
    CHANGE_FLIGHTMODE,
    CHANGE_FOCUSMODE,
    CHANGE_HOTSPOT,
    CHANGE_VPN
} from '../constants/system';

const initialState:any = {
    volume: 100,
    brightness: 100,
    wifi: true,
    bluetooth: true, 
    flightmode: false, 
    focusmode: false, 
    hotspot: false, 
    vpn: false
};

export const systemReducer = (state = initialState, action:any) => { 
    switch (action.type) {
        case CHANGE_VOLUME: return { 
            ...state, 
            volume: action.volume
        }

        case CHANGE_BRIGHTNESS: return { 
            ...state, 
            brightness: action.brightness
        }

        case CHANGE_WIFI: return { 
            ...state, 
            wifi: action.wifi,
            flightmode: false
        }

        case CHANGE_BLUETOOTH: return { 
            ...state, 
            bluetooth: action.bluetooth,
            flightmode: false
        }

        case CHANGE_FLIGHTMODE: return { 
            ...state, 
            flightmode: action.flightmode,
            wifi: false,
            bluetooth: false
        }

        case CHANGE_FOCUSMODE: return { 
            ...state, 
            focusmode: action.focusmode
        }

        case CHANGE_HOTSPOT: return { 
            ...state, 
            hotspot: action.hotspot
        }

        case CHANGE_VPN: return { 
            ...state, 
            vpn: action.vpn
        }

        default: return state
    }
}