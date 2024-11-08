import React, { FC } from 'react';
import css from './nav-bar-icon-main.module.css';

const NavBarIconMain:FC = () => {
    return(
        <div className={css.navBarIconMainCont}>
            <div className={css.navBarIconMain}>
                <img src="apps-icons/menu.svg" />
            </div>
        </div>
    )
}

export default NavBarIconMain;