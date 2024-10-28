import React, { FC, useEffect, useRef, useState } from 'react';
import css from './brightness-handler.module.css';
import VolumeIcon from '../volume-icon/volume-icon';
import SliderComponent from '../slider-component/slider-component';
import { useDispatch, useSelector } from '../../services/types/hooks';
import { changeBrightness, changeVolume } from '../../services/actions/system';
import BrightnessIcon from '../brightness-icon/brightness-icon';

const BrightnessHandler:any = () => {
    const brightnessLevel = useSelector((store) => store.system.brightness);

    const dispatch = useDispatch();

    const handleChandeBrightness = (e:any) => {
        const value = e.target.value;
        
        dispatch(changeBrightness(value));
    }
  
    return(
        <div className={css.brightnessHandlerCont}>
            <div className={css.brightnessHandlerIcon}>
                <BrightnessIcon level={brightnessLevel} />
            </div>
            <div className={css.brightnessHandlerSlider}>
                <SliderComponent value={brightnessLevel} color="#353535" handleChange={handleChandeBrightness} handleInput={handleChandeBrightness} />
            </div>
        </div>
    );
}

export default BrightnessHandler;