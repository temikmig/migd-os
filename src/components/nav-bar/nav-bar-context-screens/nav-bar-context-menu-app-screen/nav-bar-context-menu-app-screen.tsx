import React, { FC, useEffect } from 'react';
import css from './nav-bar-context-menu-app-screen.module.css';
import { useScreenshot } from 'use-react-screenshot';
import { useDispatch } from '../../../../services/types/hooks';
import { closeWindow } from '../../../../services/actions/open-windows';
import WindowControlClose from '../../../window/window-control/window-control-close/window-control-close';

const NavBarContextMenuAppScreen:any = ({id, title, setShowScreens}:any) => {
    const element = document.getElementById(id);

    const dispatch = useDispatch();

    const [image, takeScreenshot] = useScreenshot();
    const getImage = () => takeScreenshot(element)

    useEffect(() => {
        if(id) getImage();
    }, []);

    const handleCloseWindow = (e:any) => {
        e.stopPropagation();

        // setShowScreens(false);

        dispatch(closeWindow(id));
    }

    return(
        <div className={css.navBarContextMenuAppScreen}>
            <div className={css.navBarContextMenuAppScreenHeader}>
                {title}
                <WindowControlClose handleClick={handleCloseWindow} />
            </div>
            <div className={css.navBarContextMenuAppScreenImage}>
                <img src={image} />
            </div>
        </div>
    )
}

export default NavBarContextMenuAppScreen;