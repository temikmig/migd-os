import { FC } from 'react';

type T = {
    level: number
}

const BrightnessIcon:FC<T> = ({level}) => {
    const color = level>0?"#000":"#00000050";

    const widthLevel = 8 + 35*level/100;

    return(
        <svg width="20px" height="20px" viewBox="0,0,256,256">
            <g fill={color}>
                <circle cx="128" cy="128" r="32" />
                <rect x="176" y="124" rx="4" ry="4" width={widthLevel} height="8" style={{transformOrigin: 'center', transform: 'rotateZ(0deg)'}} />
                <rect x="176" y="124" rx="4" ry="4" width={widthLevel} height="8" style={{transformOrigin: 'center', transform: 'rotateZ(30deg)'}} />
                <rect x="176" y="124" rx="4" ry="4" width={widthLevel} height="8" style={{transformOrigin: 'center', transform: 'rotateZ(60deg)'}} />
                <rect x="176" y="124" rx="4" ry="4" width={widthLevel} height="8" style={{transformOrigin: 'center', transform: 'rotateZ(90deg)'}} />
                <rect x="176" y="124" rx="4" ry="4" width={widthLevel} height="8" style={{transformOrigin: 'center', transform: 'rotateZ(120deg)'}} />
                <rect x="176" y="124" rx="4" ry="4" width={widthLevel} height="8" style={{transformOrigin: 'center', transform: 'rotateZ(150deg)'}} />
                <rect x="176" y="124" rx="4" ry="4" width={widthLevel} height="8" style={{transformOrigin: 'center', transform: 'rotateZ(180deg)'}} />
                <rect x="176" y="124" rx="4" ry="4" width={widthLevel} height="8" style={{transformOrigin: 'center', transform: 'rotateZ(210deg)'}} />
                <rect x="176" y="124" rx="4" ry="4" width={widthLevel} height="8" style={{transformOrigin: 'center', transform: 'rotateZ(240deg)'}} />
                <rect x="176" y="124" rx="4" ry="4" width={widthLevel} height="8" style={{transformOrigin: 'center', transform: 'rotateZ(270deg)'}} />
                <rect x="176" y="124" rx="4" ry="4" width={widthLevel} height="8" style={{transformOrigin: 'center', transform: 'rotateZ(300deg)'}} />
                <rect x="176" y="124" rx="4" ry="4" width={widthLevel} height="8" style={{transformOrigin: 'center', transform: 'rotateZ(330deg)'}} />
            </g>
        </svg>
    );
}

export default BrightnessIcon;