import React, { FC } from 'react';
import css from './control-battery.module.css';
import cssCont from './../control-bar.module.css';
import { useBattery } from 'react-use';

const ControlBattery:any = ({level, charging}:any) => {
    return(
        <div className={cssCont.controlContainer}>
            <div className={cssCont.controlContainerCont} style={{minWidth: 150}}>
                <h1 className={css.header}>Аккумулятор</h1>
                <div className={css.controlBatteryCont}>
                    <div className={css.stateBattery}>
                        <div className={css.stateBatteryInside+' '+(level<0.2&&css.stateBatteryInsideRed)+' '+(charging&&css.stateBatteryInsideGreen)} style={{ width: (level>0.1?level*100:10)+'%' }}></div>
                    </div>
                    {Math.round(level*100)}%
                </div>
            </div>
        </div>
    );
}

export default ControlBattery;