import { FC, MouseEvent } from 'react';
import css from '../window-control.module.css';

type T = {
    handleClick: (e:MouseEvent<SVGElement>) => void
}

const WindowControlClose:FC<T> = ({handleClick}) => {
    return(
        <svg width="18" height="18" viewBox="0 0 30 30" onClick={handleClick}>
            <g transform="matrix(1,0,0,1,2.5,2.5)" className={css.buttonClose}>
                <path d="M12.5 0a12.5 12.5 0 0 1 0 25a12.5 12.5 0 0 1 0 -25z"></path>
            </g>
        </svg>
    )
}

export default WindowControlClose;