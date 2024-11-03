import React, { FC, useEffect, useRef, useState, MouseEvent } from 'react';
import css from './volume-handler.module.css';
import VolumeIcon from '../volume-icon/volume-icon';
import SliderComponent from '../slider-component/slider-component';
import { useDispatch, useSelector } from '../../services/types/hooks';
import { changeVolume } from '../../services/actions/system';

const VolumeHandler:FC = () => {
    const volumeLevel = useSelector((store) => store.system.volume);

    const dispatch = useDispatch();

    const handleChangeVolume = (e:MouseEvent<HTMLInputElement>) => {
        const inputTarget = e.target as HTMLInputElement;
        const value = Number(inputTarget.value);
        dispatch(changeVolume(value));

        // document.querySelectorAll('audio, video').forEach((element:any) => { 
        //     element.volume = (value/100); 
        // }); 
    }
  
    return(
        <div className={css.volumeHandlerCont}>
            <div className={css.volumeHandlerIcon}>
                <VolumeIcon color="#000000" level={volumeLevel} />
            </div>
            <div className={css.volumeHandlerSlider}>
                <SliderComponent value={volumeLevel} color="#353535" handleChange={handleChangeVolume} handleInput={handleChangeVolume} />
            </div>
        </div>
    );
}

export default VolumeHandler;