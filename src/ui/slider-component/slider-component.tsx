import { FC, useEffect, useRef, MouseEvent } from 'react';
import css from './slider-component.module.css';

type T = {
    handleChange: (e:MouseEvent<HTMLInputElement>) => void,
    handleInput: (e:MouseEvent<HTMLInputElement>) => void,
    color: string,
    value: number
}

const SliderComponent:FC<T> = ({handleChange, handleInput, color, value}) => {
    const inputRef:any = useRef();

    useEffect(()=>{
        inputRef.current.addEventListener('change', handleChange)
    },[])
  
    return(
        <input value={value} ref={inputRef} className={css.controlSlider} style={{color: color}} type="range" onInput={handleInput} />
    );
}

export default SliderComponent;