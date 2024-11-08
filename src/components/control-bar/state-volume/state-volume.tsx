import React, { FC, useState, MouseEvent, useContext } from 'react';
import css from './state-volume.module.css';
import cssCont from './../control-bar.module.css';
import ControlVolume from '../control-volume/control-volume';
import { useOutsideAlerter, useSelector } from '../../../services/types/hooks';
import VolumeIcon from '../../../ui/volume-icon/volume-icon';
import ContextMenuBottom from '../../../utils/context-menu-bottom/context-menu-bottom';
import { IValueControl } from '../../../services/reducers/system';
import { contextMenuContext } from '../../app/app';

type T = {
    volume:IValueControl
}

const StateVolume:FC<T> = ({volume}) => {
    const { openedControl, setOpenedControl } = useContext(contextMenuContext);

    const handleClick = (e:MouseEvent<HTMLDivElement>) => {
        setOpenedControl(openedControl=='control-volume'?'':'control-volume');
    }

    const outsideAlerterRef = useOutsideAlerter(() => {
        if(openedControlView) setOpenedControl('');
    });

    const openedControlView = openedControl=='control-volume';

    return(
        <div className={cssCont.controlBarIconContainer} ref={outsideAlerterRef}>
            <div className={`${cssCont.controlBarIconCont} ${openedControlView&&cssCont.controlBarIconContActive}`} onClick={handleClick}>
                <VolumeIcon color="#000000" level={volume.value} />
            </div>
            <ContextMenuBottom view={openedControlView}><ControlVolume /></ContextMenuBottom>
        </div>
    );
}

export default StateVolume;