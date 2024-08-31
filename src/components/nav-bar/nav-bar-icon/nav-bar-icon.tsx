import React, { FC } from 'react';
import css from './nav-bar-icon.module.css';

const NavBarIcon = ({icon}:any) => {
    return(
        <div className={css.navBarIconCont}>
            <div className={css.navBarIcon}>
                <img src={icon} />
            </div>
        </div>
    )
}

export default NavBarIcon;