import React, { FC, useState, MouseEvent } from 'react';
import css from './state-volume.module.css';
import cssCont from './../control-bar.module.css';
import ControlVolume from '../control-volume/control-volume';
import { useOutsideAlerter, useSelector } from '../../../services/types/hooks';
import VolumeIcon from '../../../ui/volume-icon/volume-icon';
import ContextMenuBottom from '../../../utils/context-menu-bottom/context-menu-bottom';
import { IValueControl } from '../../../services/reducers/system';

type T = {
    volume:IValueControl
}

const StateVolume:FC<T> = ({volume}) => {
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
                <VolumeIcon color="#000000" level={volume.value} />
            </div>
            <ContextMenuBottom view={openedControl}><ControlVolume /></ContextMenuBottom>
        </div>
    );
}

export default StateVolume;