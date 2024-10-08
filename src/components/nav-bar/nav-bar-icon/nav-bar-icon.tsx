import React, { FC } from 'react';
import css from './nav-bar-icon.module.css';
import { TNavBarIcon } from '../../../utils/types';

const NavBarIcon:FC<TNavBarIcon> = ({icon, main, handleClick}) => {
    return(
        <div className={main?css.navBarMainIconCont:css.navBarIconCont} onClick={handleClick}>
            <div className={css.navBarIcon}>
                <img src={icon} />
            </div>
        </div>
    )
}

export default NavBarIcon;