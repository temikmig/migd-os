import React, { useRef } from 'react';
import css from './background.module.css';
import ContentBar from '../content-bar/content-bar';
import BottomBar from '../bottom-bar/bottom-bar';

const Background = ({blurState}:any) => {

    let backgroundClass
    switch (blurState) {
        case 1: backgroundClass = ''; break;
        case 2: backgroundClass = css.blackBlurBackground; break;
        case 3: backgroundClass = css.blurBackground; break;
        default: backgroundClass = ''; break;
    }

    return(
        <div className={`${css.background} ${backgroundClass}`}>
            
            <img src="/backgrounds/bg-3.jpg" />
        </div>
    )
}

export default Background;