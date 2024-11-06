import { FC, MouseEvent } from 'react';
import css from './brightness-handler.module.css';
import SliderComponent from '../slider-component/slider-component';
import { useDispatch, useSelector } from '../../services/types/hooks';
import { changeBrightness } from '../../services/actions/system';
import BrightnessIcon from '../brightness-icon/brightness-icon';

const BrightnessHandler:FC = () => {
    const { brightness } = useSelector((store) => store.system);

    const dispatch = useDispatch();

    const handleChandeBrightness = (e:MouseEvent<HTMLInputElement>) => {
        const inputTarget = e.target as HTMLInputElement;
        const value = Number(inputTarget.value);
        
        dispatch(changeBrightness(value));
    }
  
    return(
        <div className={css.brightnessHandlerCont}>
            <div className={css.brightnessHandlerIcon}>
                <BrightnessIcon level={brightness.value} />
            </div>
            <div className={css.brightnessHandlerSlider}>
                <SliderComponent value={brightness.value} color="#353535" handleChange={handleChandeBrightness} handleInput={handleChandeBrightness} />
            </div>
        </div>
    );
}

export default BrightnessHandler;