import React from 'react';
import css from './nav-bar.module.css';
import NavBarIcon from './nav-bar-icon/nav-bar-icon';

const NavBar = () => {
    return(
        <div className={css.navBarCont}>
            <div className={css.navBarMain}>
                <NavBarIcon icon="../icons/menu.svg" />
            </div>
            <div className={css.navBar}>
                <NavBarIcon icon="static/icons/folder.svg" />
                <NavBarIcon icon="../icons/calculator.svg" />
                <NavBarIcon icon="../icons/browser.svg" />
                <NavBarIcon icon="../icons/delete-bin.svg" />
            </div>
        </div>
    )
}

export default NavBar;