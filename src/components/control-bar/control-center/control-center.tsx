import React, { FC, MouseEvent, useState } from 'react';
import css from './control-center.module.css';
import { useDispatch, useSelector } from '../../../services/types/hooks';
import { changeBluetooth, changeFlightmode, changeFocusmode, changeHotspot, changeVpn, changeWifi } from '../../../services/actions/system';
import VolumeHandler from '../../../ui/volume-handler/volume-handler';
import BrightnessHandler from '../../../ui/brightness-handler/brightness-handler';
import ControlCenterHandler from './control-center-handler/control-center-handler';
import { SVGIconBluetooth, SVGIconFlightmode, SVGIconFocusmode, SVGIconHotspot, SVGIconVPN, SVGIconWifi } from '../../../ui/svg-icons';

const ControlCenter:FC = () => {
    const { wifi, bluetooth, flightmode, focusmode, hotspot, vpn } = useSelector((store) => store.system);

    const dispatch = useDispatch();

    const handleChangeWifi = (e:MouseEvent<HTMLDivElement>) => {
        dispatch(changeWifi(!wifi.enabled));
    }

    const handleChangeBluetooth = (e:MouseEvent<HTMLDivElement>) => {
        dispatch(changeBluetooth(!bluetooth.enabled));
    }

    const handleChangeFlightmode = (e:MouseEvent<HTMLDivElement>) => {
        dispatch(changeFlightmode(!flightmode.enabled));
    }

    const handleChangeFocusmode = (e:MouseEvent<HTMLDivElement>) => {
        dispatch(changeFocusmode(!focusmode.enabled));
    }

    const handleChangeHotspot = (e:MouseEvent<HTMLDivElement>) => {
        dispatch(changeHotspot(!hotspot.enabled));
    }

    const handleChangeVPN = (e:MouseEvent<HTMLDivElement>) => {
        dispatch(changeVpn(!vpn.enabled));
    }

    return(
        <div className={css.controlCenterCont}>
            <div className={css.controlCenterHandlerCont}>
                <ControlCenterHandler handleClick={handleChangeWifi} active={wifi.enabled} title="Wi-Fi"><SVGIconWifi /></ControlCenterHandler>
                <ControlCenterHandler handleClick={handleChangeBluetooth} active={bluetooth.enabled} title="Bluetooth"><SVGIconBluetooth /></ControlCenterHandler>
                <ControlCenterHandler handleClick={handleChangeFlightmode} active={flightmode.enabled} title="Полет"><SVGIconFlightmode /></ControlCenterHandler>
                <ControlCenterHandler handleClick={handleChangeFocusmode} active={focusmode.enabled} title="Не беспокоить"><SVGIconFocusmode /></ControlCenterHandler>
                <ControlCenterHandler handleClick={handleChangeHotspot} active={hotspot.enabled} title="Точка доступа"><SVGIconHotspot /></ControlCenterHandler>
                <ControlCenterHandler handleClick={handleChangeVPN} active={vpn.enabled} title="VPN"><SVGIconVPN /></ControlCenterHandler>
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