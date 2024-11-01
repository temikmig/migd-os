import { FC, MouseEvent } from 'react';
import css from '../window-control.module.css';

type T = {
    handleClick: (e:MouseEvent<SVGElement>) => void
}

const WindowControlExpand:FC<T> = ({handleClick}) => {
    return(
        <svg width="18" height="18" viewBox="0 0 30 30" onClick={handleClick}>
            <g transform="matrix(1,0,0,1,2.5,2.5)" className={css.buttonExpand}>
                <path d="M4.25 0L20.75 0 C23.09721018665 0 25 1.90278981335 25 4.25 L25 20.75 C25 23.09721018665 23.09721018665 25 20.75 25 L4.25 25 C1.90278981335 25 0 23.09721018665 0 20.75 L0 4.25 C0 1.90278981335 1.90278981335 0 4.25 0z"></path>
            </g>
        </svg>
    )
}

export default WindowControlExpand;