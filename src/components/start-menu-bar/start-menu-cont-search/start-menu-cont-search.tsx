import { FC } from 'react';
import css from './start-menu-cont-search.module.css';

type T = {
    view?: boolean
}

const StartMenuContSearch:FC<T> = ({view}) => {
    return(
        <div className={css.startSearchBox}>
            <input type="text" placeholder="Поиск..."></input>
        </div>
    );
}

export default StartMenuContSearch;