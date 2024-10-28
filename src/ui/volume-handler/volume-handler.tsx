import React, { FC, useEffect, useRef, useState } from 'react';
import css from './volume-handler.module.css';
import VolumeIcon from '../volume-icon/volume-icon';
import SliderComponent from '../slider-component/slider-component';
import { useDispatch, useSelector } from '../../services/types/hooks';
import { changeVolume } from '../../services/actions/system';

const VolumeHandler:any = () => {
    const volumeLevel = useSelector((store) => store.system.volume);

    // const [ volumeLevel, setVolumeLevel ] = useState(volume);

    const dispatch = useDispatch();

    // const handleInputVolume = (e:any) => {
    //     setVolumeLevel(e.target.value);
    // }

    const handleChangeVolume = (e:any) => {
        const value = e.target.value;
        
        dispatch(changeVolume(value));
    }
  
    return(
        <div className={css.volumeHandlerCont}>
            <div className={css.volumeHandlerIcon}>
                <VolumeIcon level={volumeLevel} />
            </div>
            <div className={css.volumeHandlerSlider}>
                <SliderComponent value={volumeLevel} color="#353535" handleChange={handleChangeVolume} handleInput={handleChangeVolume} />
            </div>
        </div>
    );
}

export default VolumeHandler;