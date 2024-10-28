import React, { useState } from 'react';
import css from './control-bar.module.css';
import StateBattery from './state-battery/state-battery';
import StateWifi from './state-wifi/state-wifi';
import StateVolume from './state-volume/state-volume';
import ControlBarHandler from './control-bar-handler/control-bar-handler';
import ControlVolume from './control-volume/control-volume';
import ControlWifi from './control-wifi/control-wifi';
import ControlBattery from './control-battery/control-battery';

const ControlBar = () => {

    return(
        <div className={css.controlBar}>
            <div className={css.controlBarCont}>
                <StateVolume />
                <StateWifi />
                <StateBattery />
            </div>
            <ControlBarHandler />
        </div>
    )
}

export default ControlBar;