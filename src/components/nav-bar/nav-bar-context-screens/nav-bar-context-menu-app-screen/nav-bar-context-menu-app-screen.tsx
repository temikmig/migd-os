import React, { FC, useEffect, MouseEvent, useContext } from 'react';
import css from './nav-bar-context-menu-app-screen.module.css';
import { useScreenshot } from 'use-react-screenshot';
import { useDispatch } from '../../../../services/types/hooks';
import { closeWindow, toActiveScreenWindow, toDisactiveScreenWindow, toActiveWindow } from '../../../../services/actions/open-windows';
import WindowControlClose from '../../../window/window-control/window-control-close/window-control-close';
import { contextMenuContext } from '../../../app/app';

type T = {
    id: string,
    title: string
}

const NavBarContextMenuAppScreen:FC<T> = ({id, title}) => {
    const element = document.getElementById(id);

    const dispatch = useDispatch();

    const { openedControl, setOpenedControl } = useContext(contextMenuContext);

    const [image, takeScreenshot] = useScreenshot();
    const getImage = () => takeScreenshot(element)

    useEffect(() => {
        if(id) getImage();
    }, []);

    const handleCloseWindow = (e:MouseEvent<SVGElement>) => {
        e.stopPropagation();

        dispatch(closeWindow(id));
    }

    const handleChangeWindow = (e:MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        setOpenedControl('');

        dispatch(toActiveWindow(id));
        dispatch(toDisactiveScreenWindow());
    }

    const handleMouseEnter = (e:MouseEvent<HTMLDivElement>) => {
        dispatch(toActiveScreenWindow(id));
    }

    const handleMouseLeave = (e:MouseEvent<HTMLDivElement>) => {
        dispatch(toDisactiveScreenWindow());
    }

    return(
        <div className={css.navBarContextMenuAppScreen} onClick={handleChangeWindow} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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