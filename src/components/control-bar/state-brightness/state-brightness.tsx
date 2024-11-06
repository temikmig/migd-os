import React, { FC, useState, MouseEvent } from 'react';
import css from './state-brightness.module.css';
import cssCont from './../control-bar.module.css';
import ControlVolume from '../control-volume/control-volume';
import { useOutsideAlerter, useSelector } from '../../../services/types/hooks';
import VolumeIcon from '../../../ui/volume-icon/volume-icon';
import ContextMenuBottom from '../../../utils/context-menu-bottom/context-menu-bottom';
import BrightnessIcon from '../../../ui/brightness-icon/brightness-icon';
import ControlBrightness from '../control-brightness/control-brightness';
import { IValueControl } from '../../../services/reducers/system';

type T = {
    brightness:IValueControl
}

const StateVolume:FC<T> = ({brightness}) => {
    const [ openedControl, setOpenedControl ] = useState(false);

    const handleClick = (e:MouseEvent<HTMLDivElement>) => {
        setOpenedControl(!openedControl);
    }

    const outsideAlerterRef = useOutsideAlerter(() => {
        setOpenedControl(false);
    });

    return(
        <div className={cssCont.controlBarIconContainer} ref={outsideAlerterRef}>
            <div className={`${cssCont.controlBarIconCont} ${openedControl&&cssCont.controlBarIconContActive}`} onClick={handleClick}>
                <BrightnessIcon level={brightness.value} />
            </div>
            <ContextMenuBottom view={openedControl}><ControlBrightness /></ContextMenuBottom>
        </div>
    );
}

export default StateVolume;