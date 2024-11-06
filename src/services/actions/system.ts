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

export interface IChangeVolumeAction {
    readonly type: typeof CHANGE_VOLUME;
    readonly volume: number
}

export interface IChangeVolumeControlBarAction {
    readonly type: typeof CHANGE_VOLUME_CONTROLBAR;
    readonly controlBar: boolean
}

export interface IChangeBrightnessAction {
    readonly type: typeof CHANGE_BRIGHTNESS;
    readonly brightness: number
}

export interface IChangeBrightnessControlBarAction {
    readonly type: typeof CHANGE_BRIGHTNESS_CONTROLBAR;
    readonly controlBar: boolean
}

export interface IChangeWifiAction {
    readonly type: typeof CHANGE_WIFI;
    readonly wifi: boolean
}

export interface IChangeWifiControlBarAction {
    readonly type: typeof CHANGE_WIFI_CONTROLBAR;
    readonly controlBar: boolean
}

export interface IChangeBluetoothAction {
    readonly type: typeof CHANGE_BLUETOOTH;
    readonly bluetooth: boolean
}

export interface IChangeBluetoothControlBarAction {
    readonly type: typeof CHANGE_BLUETOOTH_CONTROLBAR;
    readonly controlBar: boolean
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

export interface IChangeWallaperAction {
    readonly type: typeof CHANGE_WALLAPER;
    readonly content: string
}

export const changeVolume = (volume:number):IChangeVolumeAction => ({
    type: CHANGE_VOLUME, 
    volume
});

export const changeVolumeControlBar = (controlBar:boolean):IChangeVolumeControlBarAction => ({
    type: CHANGE_VOLUME_CONTROLBAR, 
    controlBar
});

export const changeBrightness = (brightness:number):IChangeBrightnessAction => ({
    type: CHANGE_BRIGHTNESS, 
    brightness
});

export const changeBrightnessControlBar = (controlBar:boolean):IChangeBrightnessControlBarAction => ({
    type: CHANGE_BRIGHTNESS_CONTROLBAR, 
    controlBar
});

export const changeWifi = (wifi:boolean):IChangeWifiAction => ({
    type: CHANGE_WIFI, 
    wifi
});

export const changeWifiControlBar = (controlBar:boolean):IChangeWifiControlBarAction => ({
    type: CHANGE_WIFI_CONTROLBAR, 
    controlBar
});

export const changeBluetooth = (bluetooth:boolean):IChangeBluetoothAction => ({
    type: CHANGE_BLUETOOTH, 
    bluetooth
});

export const changeBluetoothControlBar = (controlBar:boolean):IChangeBluetoothControlBarAction => ({
    type: CHANGE_BLUETOOTH_CONTROLBAR, 
    controlBar
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

export const changeWallaper = (content:string):IChangeWallaperAction => ({
    type: CHANGE_WALLAPER, 
    content
});

export type TSystemActions =
  | IChangeVolumeAction
  | IChangeVolumeControlBarAction
  | IChangeBrightnessAction
  | IChangeBrightnessControlBarAction
  | IChangeWifiAction
  | IChangeWifiControlBarAction
  | IChangeBluetoothAction
  | IChangeBluetoothControlBarAction
  | IChangeFlightmodeAction
  | IChangeFocusmodeAction
  | IChangeHotspotAction
  | IChangeVpnAction
  | IChangeWallaperAction;