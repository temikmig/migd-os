import { FC } from 'react';
import css from './control-volume.module.css';
import cssCont from './../control-bar.module.css';
import VolumeHandler from '../../../ui/volume-handler/volume-handler';

const ControlVolume:FC = () => {
    return(
        <div className={cssCont.controlContainer}>
            <div className={cssCont.controlContainerCont}>
                <h1 className={css.header}>Звук</h1>
                <VolumeHandler />
            </div>
        </div>
    );
}

export default ControlVolume;