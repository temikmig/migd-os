import React, { FC, useState, MouseEvent, useContext } from 'react';
import css from './state-brightness.module.css';
import cssCont from './../control-bar.module.css';
import ControlVolume from '../control-volume/control-volume';
import { useOutsideAlerter, useSelector } from '../../../services/types/hooks';
import VolumeIcon from '../../../ui/volume-icon/volume-icon';
import ContextMenuBottom from '../../../utils/context-menu-bottom/context-menu-bottom';
import BrightnessIcon from '../../../ui/brightness-icon/brightness-icon';
import ControlBrightness from '../control-brightness/control-brightness';
import { IValueControl } from '../../../services/reducers/system';
import { contextMenuContext } from '../../app/app';

type T = {
    brightness:IValueControl
}

const StateVolume:FC<T> = ({brightness}) => {
    const { openedControl, setOpenedControl } = useContext(contextMenuContext);

    const handleClick = (e:MouseEvent<HTMLDivElement>) => {
        setOpenedControl(openedControl=='control-brightness'?'':'control-brightness');
    }

    const outsideAlerterRef = useOutsideAlerter(() => {
        if(openedControlView) setOpenedControl('');
    });

    const openedControlView = openedControl=='control-brightness';

    return(
        <div className={cssCont.controlBarIconContainer} ref={outsideAlerterRef}>
            <div className={`${cssCont.controlBarIconCont} ${openedControlView&&cssCont.controlBarIconContActive}`} onClick={handleClick}>
                <BrightnessIcon level={brightness.value} />
            </div>
            <ContextMenuBottom view={openedControlView}><ControlBrightness /></ContextMenuBottom>
        </div>
    );
}

export default StateVolume;