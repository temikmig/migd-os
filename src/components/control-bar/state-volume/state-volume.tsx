import React, { FC, useState } from 'react';
import css from './state-volume.module.css';
import cssCont from './../control-bar.module.css';
import ControlVolume from '../control-volume/control-volume';
import { useOutsideAlerter, useSelector } from '../../../services/types/hooks';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import VolumeIcon from '../../../ui/volume-icon/volume-icon';
import ContextMenuBottom from '../../../utils/context-menu-bottom/context-menu-bottom';

const StateVolume:any = () => {
    const volumeLevel = 100;

    const [ openedControl, setOpenedControl ] = useState(false);

    const handleClick = (e:any) => {
        setOpenedControl(!openedControl);
    }

    const outsideAlerterRef = useOutsideAlerter(() => {
        setOpenedControl(false);
    });

    const controlContainerTransitions = {
        enter: cssCont.controlContainerEnter,
        enterActive: cssCont.controlContainerEnterActive,
        exit: cssCont.controlContainerExit,
        exitActive: cssCont.controlContainerExitActive
    }

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