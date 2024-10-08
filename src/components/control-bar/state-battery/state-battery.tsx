import React, { FC } from 'react';
import css from './state-battery.module.css';
import { useBattery } from 'react-use';

const StateBattery:FC = () => {
    const battery = useBattery();

    if(battery.isSupported&&battery.fetched) return(
        <div className={css.stateBattery}>
            <div className={css.stateBatteryInside+' '+(battery.level<0.2&&css.stateBatteryInsideRed)} style={{ width: (battery.level>0.1?battery.level*100:10)+'%' }}></div>
            {/* {battery.level} */}
        </div>
    )

    return(<></>);
}

export default StateBattery;