import React, { FC } from 'react';
import css from '../window-control.module.css';

const WindowControlCollapse = ({handleClick}:any) => {
    return(
        <svg width="18" height="18" viewBox="0 0 30 30" onClick={handleClick}>
            <g id="WiD33OK5" transform="matrix(-1,1.2246467991473532e-16,-1.2246467991473532e-16,-1,28.749998211860657,27.4962504196167)">
                <g transform="">
                    <g id="WiD33OK5_origin" transform="skewX(0) skewY(0)" className={css.buttonCollapse}>
                        <path id="shapepath_WiD33OK5" d="M 10 2.15 L 0.61 18.63 C -1.14 21.5 1.11 25 4.61 25 L 22.89 25 C 26.39 25 28.64 21.5 26.89 18.63 L 17.38 2.15 C 15.75 -0.72 11.62 -0.72 10 2.15 Z "></path>
                    </g>
                </g>
            </g>
        </svg>
    )
}

export default WindowControlCollapse;