import { TSystemActions } from '../actions/system';
import { 
    CHANGE_VOLUME,
    CHANGE_VOLUME_CONTROLBAR,
    CHANGE_BRIGHTNESS,
    CHANGE_BRIGHTNESS_CONTROLBAR,
    CHANGE_WIFI,
    CHANGE_WIFI_CONTROLBAR,
    CHANGE_BLUETOOTH,
    CHANGE_BLUETOOTH_CONTROLBAR,
    CHANGE_FLIGHTMODE,
    CHANGE_FOCUSMODE,
    CHANGE_HOTSPOT,
    CHANGE_VPN,
    CHANGE_WALLAPER
} from '../constants/system';

export interface ISystem {
    volume:IValueControl,
    brightness:IValueControl,
    wifi:IEnabledControl,
    bluetooth:IEnabledControl, 
    flightmode:IEnabled, 
    focusmode:IEnabled, 
    hotspot:IEnabled, 
    vpn:IEnabled,
    wallaper:string
}

export interface IEnabled {
    enabled: boolean
}

export interface IEnabledControl {
    enabled: boolean,
    controlBar: boolean
}

export interface IValueControl {
    value: number,
    controlBar: boolean
}

const initialState:ISystem = {
    volume: {
        value: 100,
        controlBar: true
    },
    brightness: {
        value: 100,
        controlBar: false
    },
    wifi: {
        enabled: true,
        controlBar: true
    },
    bluetooth: {
        enabled: false,
        controlBar: false
    }, 
    flightmode: {
        enabled: false
    }, 
    focusmode: {
        enabled: false
    }, 
    hotspot: {
        enabled: false
    }, 
    vpn: {
        enabled: false
    },
    wallaper: 'image1.jpg'
};

export const systemReducer = (state = initialState, action:TSystemActions):ISystem => { 
    switch (action.type) {
        case CHANGE_VOLUME: return { 
            ...state, 
            volume: {...state.volume, value: action.volume}
        }

        case CHANGE_VOLUME_CONTROLBAR: return { 
            ...state, 
            volume: {...state.volume, controlBar: action.controlBar}
        }

        case CHANGE_BRIGHTNESS: return { 
            ...state, 
            brightness: {...state.brightness, value: action.brightness}
        }

        case CHANGE_BRIGHTNESS_CONTROLBAR: return { 
            ...state, 
            brightness: {...state.brightness, controlBar: action.controlBar}
        }

        case CHANGE_WIFI: return { 
            ...state, 
            wifi: {...state.wifi, enabled: action.wifi},
            flightmode: {...state.flightmode, enabled: false}
        }

        case CHANGE_WIFI_CONTROLBAR: return { 
            ...state, 
            wifi: {...state.wifi, controlBar: action.controlBar}
        }

        case CHANGE_BLUETOOTH: return { 
            ...state, 
            bluetooth: {...state.bluetooth, enabled: action.bluetooth},
            flightmode: {...state.flightmode, enabled: false}
        }

        case CHANGE_BLUETOOTH_CONTROLBAR: return { 
            ...state, 
            bluetooth: {...state.bluetooth, controlBar: action.controlBar}
        }

        case CHANGE_FLIGHTMODE: return { 
            ...state, 
            flightmode: {...state.flightmode, enabled: action.flightmode},
            wifi: {...state.wifi, enabled: false},
            bluetooth: {...state.bluetooth, enabled: false}
        }

        case CHANGE_FOCUSMODE: return { 
            ...state, 
            focusmode: {...state.focusmode, enabled: action.focusmode}
        }

        case CHANGE_HOTSPOT: return { 
            ...state, 
            hotspot: {...state.hotspot, enabled: action.hotspot}
        }

        case CHANGE_VPN: return { 
            ...state, 
            vpn: {...state.vpn, enabled: action.vpn}
        }

        case CHANGE_WALLAPER: return { 
            ...state, 
            wallaper: action.content
        }

        default: return state
    }
}