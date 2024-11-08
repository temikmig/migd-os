import { FC, MouseEvent } from 'react';
import css from './background.module.css';
import { useDispatch, useSelector } from '../../services/types/hooks';

type T = {

}

const Background:FC<T> = () => {
    const dispatch = useDispatch();

    const { wallaper } = useSelector((store) => store.system);

    return(
        <div className={css.background}>
            <div className={css.backgroundImage} style={{backgroundImage: 'url(images/'+wallaper+')'}}></div>
        </div>
    )
}

export default Background;