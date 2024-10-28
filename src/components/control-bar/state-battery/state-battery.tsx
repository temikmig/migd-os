import React, { FC, useState } from 'react';
import css from './state-battery.module.css';
import cssCont from './../control-bar.module.css';
import { useBattery } from 'react-use';
import ControlBattery from '../control-battery/control-battery';
import { useOutsideAlerter } from '../../../services/types/hooks';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContextMenuBottom from '../../../utils/context-menu-bottom/context-menu-bottom';

const StateBattery:any = () => {
    const battery = useBattery();

    const [ openedControl, setOpenedControl ] = useState(false);

    const handleClick = (e:any) => {
        setOpenedControl(!openedControl);
    }

    const outsideAlerterRef = useOutsideAlerter(() => {
        setOpenedControl(false);
    });

    return(
        (battery.isSupported&&battery.fetched)&& 
        <div className={cssCont.controlBarIconContainer}  ref={outsideAlerterRef}>
            <div className={`${cssCont.controlBarIconCont} ${openedControl&&cssCont.controlBarIconContActive}`}>
                <div className={cssCont.controlBarIconCont} onClick={handleClick}>
                    <div className={css.stateBattery}>
                        <div className={css.stateBatteryInside+' '+(battery.level<0.2&&css.stateBatteryInsideRed)+' '+(battery.charging&&css.stateBatteryInsideGreen)} style={{ width: (battery.level>0.1?battery.level*100:10)+'%' }}></div>
                    </div>
                </div>
            </div>
            <ContextMenuBottom view={openedControl}><ControlBattery level={battery.level} charging={battery.charging} /></ContextMenuBottom>
        </div>
        
    )
}

export default StateBattery;