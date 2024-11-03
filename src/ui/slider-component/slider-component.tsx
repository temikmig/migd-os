import { FC, useEffect, useRef, MouseEvent, useState } from 'react';
import css from './slider-component.module.css';

type T = {
    handleChange: (e:MouseEvent<HTMLInputElement>) => void,
    handleInput: (e:MouseEvent<HTMLInputElement>) => void,
    color: string,
    value: number
}

const SliderComponent:FC<T> = ({handleChange, handleInput, color, value}) => {
    const inputRef:any = useRef();

    const [ sliderValue, setSliderValue ] = useState(value);

    useEffect(()=>{
        inputRef.current.addEventListener('change', handleChange)
    },[])
  
    return(
        <input value={value.toString()} ref={inputRef} className={css.controlSlider} style={{color: color}} type="range" onInput={handleInput} />
    );
}

export default SliderComponent;