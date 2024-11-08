import { FC, MouseEvent, useEffect, useState } from "react";
import css from './volume-handler.module.css';
import VolumeIcon from "../../../../ui/volume-icon/volume-icon";
import SliderComponent from "../../../../ui/slider-component/slider-component";
import { useSelector } from "../../../../services/types/hooks";

type T = {
    volume: number,
    controls: {
        volume: (volume: number) => void;
    }
}

export const VolumeHandler:FC<T> = ({controls}) => {
    const { volume } = useSelector((store) => store.system);

    const [ volLevel, setVolLevel ] = useState(100);

    useEffect(() => {
        controls.volume(volLevel/100*volume.value/100);
    }, [volLevel, volume]);

    const handleChangeVolLevel = (e:MouseEvent<HTMLInputElement>) => {
        const inputTarget = e.target as HTMLInputElement;
        const value = Number(inputTarget.value);
        setVolLevel(value);
        controls.volume(value/100*volume.value/100);
    }
    
    return(
        <div className={css.volumeHandlerCont}>
            <div className={css.volumeHandlerIcon}>
                <VolumeIcon color="#ffffff" level={volLevel} />
            </div>
            <div className={css.volumeHandlerSlider}>
                <SliderComponent value={volLevel} color="#ffffff" handleChange={(e:any) => {}} handleInput={handleChangeVolLevel} />
            </div>
        </div>
    );
}

export default VolumeHandler;