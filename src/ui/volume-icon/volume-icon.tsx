import { FC } from 'react';

type T = {
    level: number
}

const VolumeIcon:FC<T> = ({level}) => {
    const color = level>0?"#000":"#00000050";
    return(
        <svg width="20px" height="20px" viewBox="0,0,256,256">
            <g fill={color}>
                <g transform="scale(5.33333,5.33333)">
                    <g>
                        <path d="M14,32h-7c-1.1,0 -2,-0.9 -2,-2v-12c0,-1.1 0.9,-2 2,-2h7z"></path>
                        <path d="M26,42l-12,-10v-16l12,-10z"></path>
                    </g>
                    <path fill={level>0?color:"transparent"} d="M28,17.3v2.1c1.8,0.8 3,2.5 3,4.6c0,2.1 -1.2,3.8 -3,4.6v2.1c2.9,-0.9 5,-3.5 5,-6.7c0,-3.2 -2.1,-5.8 -5,-6.7z"></path>
                    <path fill={level>25?color:"transparent"} d="M28,12.2v2c4.6,0.9 8,5 8,9.8c0,4.8 -3.4,8.9 -8,9.8v2c5.7,-1 10,-5.9 10,-11.8c0,-5.9 -4.3,-10.9 -10,-11.8z"></path>
                    <path fill={level>80?color:"transparent"} d="M28,7.1v2c7.3,1 13,7.3 13,14.9c0,7.6 -5.7,13.9 -13,14.9v2c8.4,-1 15,-8.2 15,-16.9c0,-8.7 -6.6,-15.9 -15,-16.9z"></path>
                </g>
            </g>
        </svg>
    );
}

export default VolumeIcon;