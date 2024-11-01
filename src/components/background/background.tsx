import { FC, MouseEvent } from 'react';
import css from './background.module.css';
import { useDispatch } from '../../services/types/hooks';

type T = {
    blurState: 1|2|3
}

const Background:FC<T> = ({blurState}) => {

    let backgroundClass
    switch (blurState) {
        case 1: backgroundClass = ''; break;
        case 2: backgroundClass = css.blackBlurBackground; break;
        case 3: backgroundClass = css.blurBackground; break;
        default: backgroundClass = ''; break;
    }

    const dispatch = useDispatch();

    const handleOutside = (e:MouseEvent<HTMLDivElement>) => {
        // dispatch(checkStartMenu(false));
        // console.log('adf');
    };

    return(
        <div className={`${css.background} ${backgroundClass}`} onMouseDown={handleOutside}>
            <img src="/backgrounds/bg-1.jpg" />
        </div>
    )
}

export default Background;