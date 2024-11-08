import { FC } from 'react';
import css from './control-brightness.module.css';
import cssCont from './../control-bar.module.css';
import VolumeHandler from '../../../ui/volume-handler/volume-handler';
import BrightnessHandler from '../../../ui/brightness-handler/brightness-handler';

const ControlBrightness:FC = () => {
    return(
        <div className={cssCont.controlContainer}>
            <div className={cssCont.controlContainerCont}>
                <h1 className={css.header}>Яркость</h1>
                <BrightnessHandler />
            </div>
        </div>
    );
}

export default ControlBrightness;