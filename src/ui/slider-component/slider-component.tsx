import React, { FC, useEffect, useRef, useState } from 'react';
import css from './slider-component.module.css';

const SliderComponent:any = ({handleChange, handleInput, width, color, value}:any) => {
    const inputRef:any = useRef();

    useEffect(()=>{
        inputRef.current.addEventListener('change', handleChange)
    },[])
  
    return(
        <input value={value} ref={inputRef} className={css.controlSlider} style={{color: color}} type="range" onInput={handleInput} />
    );
}

export default SliderComponent;