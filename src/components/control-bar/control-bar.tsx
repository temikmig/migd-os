import React from 'react';
import css from './control-bar.module.css';
import StateBattery from './state-battery/state-battery';

const ControlBar = () => {
    return(
        <div className={css.controlBar}>
            <StateBattery />
        </div>
    )
}

export default ControlBar;