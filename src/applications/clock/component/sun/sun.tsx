import { FC } from 'react';
import css from './sun.module.css'; 

export const Sun:FC = () => {
    return(
        <svg width="135px" height="135px" viewBox="0,0,256,256">
            <g>
                <g transform="scale(0.5,0.5)">
                    <circle cx="256" cy="256" r="140" fill="#fcd882"></circle>
                    <path d="M166,256c-5.523,0 -10,-4.477 -10,-10c0,-17.346 9.939,-39.369 25.939,-57.475c18.536,-20.974 41.286,-32.525 64.061,-32.525c5.523,0 10,4.477 10,10c0,5.523 -4.477,10 -10,10c-38.308,0 -70,46.346 -70,70c0,5.523 -4.477,10 -10,10z" fill="#ffb95a"></path>
                    <g className={css.rays}>
                        <path d="M256,16c-5.523,0 -10,4.477 -10,10v50c0,5.523 4.477,10 10,10c5.522,0 10,-4.477 10,-10v-50c0,-5.523 -4.478,-10 -10,-10z" fill="#ffb95a"></path>
                        <path d="M256,426c-5.523,0 -10,4.478 -10,10v50c0,5.522 4.477,10 10,10c5.522,0 10,-4.478 10,-10v-50c0,-5.522 -4.478,-10 -10,-10z" fill="#ffb95a"></path>
                        <path d="M383.28,138.72c2.56,0 5.118,-0.977 7.071,-2.929l35.35,-35.35c3.905,-3.905 3.905,-10.237 0,-14.142c-3.906,-3.905 -10.236,-3.905 -14.143,0l-35.35,35.35c-3.905,3.905 -3.905,10.237 0,14.142c1.954,1.953 4.513,2.929 7.072,2.929z" fill="#ffb95a"></path>
                        <path d="M121.649,376.209l-35.35,35.35c-3.905,3.905 -3.906,10.237 0,14.143c1.953,1.952 4.512,2.929 7.071,2.929c2.559,0 5.119,-0.977 7.071,-2.929l35.35,-35.35c3.905,-3.905 3.906,-10.237 0,-14.143c-3.905,-3.903 -10.237,-3.904 -14.142,0z" fill="#ffb95a"></path>
                        <path d="M486,246h-50c-5.522,0 -10,4.477 -10,10c0,5.522 4.478,10 10,10h50c5.522,0 10,-4.478 10,-10c0,-5.523 -4.478,-10 -10,-10z" fill="#ffb95a"></path><path d="M76,246h-50c-5.523,0 -10,4.477 -10,10c0,5.522 4.477,10 10,10h50c5.523,0 10,-4.478 10,-10c0,-5.523 -4.477,-10 -10,-10z" fill="#ffb95a"></path>
                        <path d="M390.352,376.209c-3.906,-3.904 -10.236,-3.904 -14.143,0c-3.905,3.905 -3.905,10.237 0,14.143l35.35,35.35c1.953,1.952 4.512,2.929 7.071,2.929c2.559,0 5.118,-0.977 7.071,-2.929c3.905,-3.905 3.905,-10.237 0,-14.143z" fill="#ffb95a"></path>
                        <path d="M100.441,86.299c-3.905,-3.905 -10.237,-3.905 -14.143,0c-3.905,3.905 -3.905,10.237 0,14.143l35.35,35.35c1.953,1.953 4.512,2.929 7.071,2.929c2.559,0 5.119,-0.976 7.071,-2.929c3.905,-3.905 3.905,-10.237 0,-14.143z" fill="#ffb95a"></path>
                    </g>
                </g>
            </g>
        </svg>
    )
}