import React, { FC, useState } from 'react';
import css from './control-volume.module.css';
import cssCont from './../control-bar.module.css';
import SliderComponent from '../../../ui/slider-component/slider-component';
import VolumeIcon from '../../../ui/volume-icon/volume-icon';
import { useDispatch, useSelector } from '../../../services/types/hooks';
import { changeVolume } from '../../../services/actions/system';
import VolumeHandler from '../../../ui/volume-handler/volume-handler';

const ControlVolume:any = () => {
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