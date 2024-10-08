import React from 'react';
import css from './nav-bar.module.css';
import NavBarIcon from './nav-bar-icon/nav-bar-icon';
import apps from '../../data/apps.json';
import { useDispatch, useSelector } from '../../services/types/hooks';
import { checkStartMenu } from '../../services/actions/start-menu';

const NavBar = () => {
    const dispatch = useDispatch();
    const isStartMenu = useSelector((store) => store.startMenu.opened);
    
    const startMenu = () => {
        dispatch(checkStartMenu(!isStartMenu));
        
    }

    return(
        <div className={css.navBarCont}>
            <div className={css.navBarMain}>
                <NavBarIcon icon="/apps-icons/menu.svg" main={true} handleClick={startMenu} />
            </div>
            <div className={css.navBar}>
                {apps.map((item) => {
                    return(
                        <NavBarIcon icon={item._icon} main={false} key={item._id} />
                    );
                })}
            </div>
        </div>
    )
}

export default NavBar;