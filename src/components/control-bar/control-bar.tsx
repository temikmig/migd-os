import React, { useState } from 'react';
import css from './control-bar.module.css';
import StateBattery from './state-battery/state-battery';
import StateWifi from './state-wifi/state-wifi';
import StateVolume from './state-volume/state-volume';
import ControlBarHandler from './control-bar-handler/control-bar-handler';
import StateBluetooth from './state-bluetooth/state-bluetooth';
import StateBrightness from './state-brightness/state-brightness';
import { useSelector } from '../../services/types/hooks';
import { ISystem } from '../../services/reducers/system';

const ControlBar = () => {
    const { volume, brightness, wifi, bluetooth } = useSelector<ISystem>((store) => store.system);

    return(
        <div className={css.controlBar}>
            <div className={css.controlBarCont}>
                {volume.controlBar&&<StateVolume volume={volume} />}
                {brightness.controlBar&&<StateBrightness brightness={brightness} />}
                {wifi.controlBar&&<StateWifi wifi={wifi} />}
                {bluetooth.controlBar&&<StateBluetooth bluetooth={bluetooth} />}
                <StateBattery />
            </div>
            <ControlBarHandler />
        </div>
    )
}

export default ControlBar;