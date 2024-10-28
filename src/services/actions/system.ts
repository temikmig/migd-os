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

export const changeVolume = (volume:number):any => ({
    type: CHANGE_VOLUME, 
    volume
});

export const changeBrightness = (brightness:number):any => ({
    type: CHANGE_BRIGHTNESS, 
    brightness
});

export const changeWifi = (wifi:boolean):any => ({
    type: CHANGE_WIFI, 
    wifi
});

export const changeBluetooth = (bluetooth:boolean):any => ({
    type: CHANGE_BLUETOOTH, 
    bluetooth
});

export const changeFlightmode = (flightmode:boolean):any => ({
    type: CHANGE_FLIGHTMODE, 
    flightmode
});

export const changeFocusmode = (focusmode:boolean):any => ({
    type: CHANGE_FOCUSMODE, 
    focusmode
});

export const changeHotspot = (hotspot:boolean):any => ({
    type: CHANGE_HOTSPOT, 
    hotspot
});

export const changeVpn = (vpn:boolean):any => ({
    type: CHANGE_VPN, 
    vpn
});