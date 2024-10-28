import React, { FC, useState } from 'react';
import css from './control-center.module.css';
import { useDispatch, useSelector } from '../../../services/types/hooks';
import { changeBluetooth, changeFlightmode, changeFocusmode, changeHotspot, changeVpn, changeWifi } from '../../../services/actions/system';
import VolumeHandler from '../../../ui/volume-handler/volume-handler';
import BrightnessHandler from '../../../ui/brightness-handler/brightness-handler';
import ControlCenterHandler from './control-center-handler/control-center-handler';
import ControlCenterHandlerIconWifi from './control-center-handler-icons/control-center-handler-icon-wifi';
import ControlCenterHandlerIconBluetooth from './control-center-handler-icons/control-center-handler-icon-bluetooth';
import ControlCenterHandlerIconFlightmode from './control-center-handler-icons/control-center-handler-icon-filghtmode';
import ControlCenterHandlerIconFocusmode from './control-center-handler-icons/control-center-handler-icon-focusmode';
import ControlCenterHandlerIconHotspot from './control-center-handler-icons/control-center-handler-icon-hotspot';
import ControlCenterHandlerIconVPN from './control-center-handler-icons/control-center-handler-icon-vpn';

const ControlCenter:any = () => {
    const { wifi, bluetooth, flightmode, focusmode, hotspot, vpn } = useSelector((store) => store.system);

    const dispatch = useDispatch();

    const handleChangeWifi = (e:any) => {
        dispatch(changeWifi(!wifi));
    }

    const handleChangeBluetooth = (e:any) => {
        dispatch(changeBluetooth(!bluetooth));
    }

    const handleChangeFlightmode = (e:any) => {
        dispatch(changeFlightmode(!flightmode));
    }

    const handleChangeFocusmode = (e:any) => {
        dispatch(changeFocusmode(!focusmode));
    }

    const handleChangeHotspot = (e:any) => {
        dispatch(changeHotspot(!hotspot));
    }

    const handleChangeVPN = (e:any) => {
        dispatch(changeVpn(!vpn));
    }

    return(
        <div className={css.controlCenterCont}>
            <div className={css.controlCenterHandlerCont}>
                <ControlCenterHandler handleClick={handleChangeWifi} active={wifi} title="Wi-Fi"><ControlCenterHandlerIconWifi /></ControlCenterHandler>
                <ControlCenterHandler handleClick={handleChangeBluetooth} active={bluetooth} title="Bluetooth"><ControlCenterHandlerIconBluetooth /></ControlCenterHandler>
                <ControlCenterHandler handleClick={handleChangeFlightmode} active={flightmode} title="Полет"><ControlCenterHandlerIconFlightmode /></ControlCenterHandler>
                <ControlCenterHandler handleClick={handleChangeFocusmode} active={focusmode} title="Не беспокоить"><ControlCenterHandlerIconFocusmode /></ControlCenterHandler>
                <ControlCenterHandler handleClick={handleChangeHotspot} active={hotspot} title="Точка доступа"><ControlCenterHandlerIconHotspot /></ControlCenterHandler>
                <ControlCenterHandler handleClick={handleChangeVPN} active={vpn} title="VPN"><ControlCenterHandlerIconVPN /></ControlCenterHandler>
            </div>
            <div className={css.controlCenterHandlerSliderCont}>
                <div className={css.controlCenterHandlerSlider}>
                    <VolumeHandler />
                </div>
                <div className={css.controlCenterHandlerSlider}>
                    <BrightnessHandler />
                </div>
            </div>
        </div>
    );
}

export default ControlCenter;