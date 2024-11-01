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

export interface IChangeVolumeAction {
    readonly type: typeof CHANGE_VOLUME;
    readonly volume: number
}

export interface IChangeBrightnessAction {
    readonly type: typeof CHANGE_BRIGHTNESS;
    readonly brightness: number
}

export interface IChangeWifiAction {
    readonly type: typeof CHANGE_WIFI;
    readonly wifi: boolean
}

export interface IChangeBluetoothAction {
    readonly type: typeof CHANGE_BLUETOOTH;
    readonly bluetooth: boolean
}

export interface IChangeFlightmodeAction {
    readonly type: typeof CHANGE_FLIGHTMODE;
    readonly flightmode: boolean
}

export interface IChangeFocusmodeAction {
    readonly type: typeof CHANGE_FOCUSMODE;
    readonly focusmode: boolean
}

export interface IChangeHotspotAction {
    readonly type: typeof CHANGE_HOTSPOT;
    readonly hotspot: boolean
}

export interface IChangeVpnAction {
    readonly type: typeof CHANGE_VPN;
    readonly vpn: boolean
}

export const changeVolume = (volume:number):IChangeVolumeAction => ({
    type: CHANGE_VOLUME, 
    volume
});

export const changeBrightness = (brightness:number):IChangeBrightnessAction => ({
    type: CHANGE_BRIGHTNESS, 
    brightness
});

export const changeWifi = (wifi:boolean):IChangeWifiAction => ({
    type: CHANGE_WIFI, 
    wifi
});

export const changeBluetooth = (bluetooth:boolean):IChangeBluetoothAction => ({
    type: CHANGE_BLUETOOTH, 
    bluetooth
});

export const changeFlightmode = (flightmode:boolean):IChangeFlightmodeAction => ({
    type: CHANGE_FLIGHTMODE, 
    flightmode
});

export const changeFocusmode = (focusmode:boolean):IChangeFocusmodeAction => ({
    type: CHANGE_FOCUSMODE, 
    focusmode
});

export const changeHotspot = (hotspot:boolean):IChangeHotspotAction => ({
    type: CHANGE_HOTSPOT, 
    hotspot
});

export const changeVpn = (vpn:boolean):IChangeVpnAction => ({
    type: CHANGE_VPN, 
    vpn
});

export type TSystemActions =
  | IChangeVolumeAction
  | IChangeBrightnessAction
  | IChangeWifiAction
  | IChangeBluetoothAction
  | IChangeFlightmodeAction
  | IChangeFocusmodeAction
  | IChangeHotspotAction
  | IChangeVpnAction;