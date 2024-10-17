import React, { FC } from 'react';
import css from './nav-bar-icon-main.module.css';
import { TNavBarIcon } from '../../../utils/types';
import { useSelector } from '../../../services/types/hooks';

const NavBarIconMain:any = ({handleClick}:any) => {
    return(
        <div className={css.navBarIconMainCont}>
            <div className={css.navBarIconMain} onClick={handleClick}>
                <img src="/apps-icons/menu.svg" />
            </div>
        </div>
    )
}

export default NavBarIconMain;