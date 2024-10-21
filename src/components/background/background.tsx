import React, { useRef } from 'react';
import css from './background.module.css';
import ContentBar from '../content-bar/content-bar';
import BottomBar from '../bottom-bar/bottom-bar';
import { checkStartMenu } from '../../services/actions/start-menu';
import { useDispatch } from '../../services/types/hooks';

const Background = ({blurState}:any) => {

    let backgroundClass
    switch (blurState) {
        case 1: backgroundClass = ''; break;
        case 2: backgroundClass = css.blackBlurBackground; break;
        case 3: backgroundClass = css.blurBackground; break;
        default: backgroundClass = ''; break;
    }

    const dispatch = useDispatch();

    const handleOutside = () => {
        // dispatch(checkStartMenu(false));
        // console.log('adf');
    };

    return(
        <div className={`${css.background} ${backgroundClass}`} onMouseDown={handleOutside}>
            <img src="/backgrounds/bg-4.jpg" />
        </div>
    )
}

export default Background;