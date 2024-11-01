import React, { FC, useState, MouseEvent } from 'react';
import css from './state-volume.module.css';
import cssCont from './../control-bar.module.css';
import ControlVolume from '../control-volume/control-volume';
import { useOutsideAlerter, useSelector } from '../../../services/types/hooks';
import VolumeIcon from '../../../ui/volume-icon/volume-icon';
import ContextMenuBottom from '../../../utils/context-menu-bottom/context-menu-bottom';

const StateVolume:FC = () => {
    const [ openedControl, setOpenedControl ] = useState(false);

    const handleClick = (e:MouseEvent<HTMLDivElement>) => {
        setOpenedControl(!openedControl);
    }

    const outsideAlerterRef = useOutsideAlerter(() => {
        setOpenedControl(false);
    });

    const volume = useSelector((store) => store.system.volume);

    return(
        <div className={cssCont.controlBarIconContainer} ref={outsideAlerterRef}>
            <div className={`${css.controlBarIconCont} ${openedControl&&cssCont.controlBarIconContActive}`} onClick={handleClick}>
                <VolumeIcon level={volume} />
            </div>
            <ContextMenuBottom view={openedControl}><ControlVolume /></ContextMenuBottom>
        </div>
    );
}

export default StateVolume;