import React, { useState } from 'react';
import css from './start-menu-cont-search.module.css';
import { CSSTransition } from 'react-transition-group';

const StartMenuContSearch = ({view}:any) => {
    return(
        <div className={css.startSearchBox}>
            <input type="text" placeholder="Поиск..."></input>
        </div>
    );
}

export default StartMenuContSearch;