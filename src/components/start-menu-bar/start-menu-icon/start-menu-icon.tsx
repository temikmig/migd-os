import React, { MouseEvent, FC, useContext } from 'react';
import css from './start-menu-icon.module.css';
import { defaultAppProps, defaultAppSizes } from '../../../utils/config';

import * as appsList from '../../../applications';
import { useDispatch, useSelector } from '../../../services/types/hooks';
import { addStartMenuPined, addStartMenuTiles, checkStartMenu, removeStartMenuPined, removeStartMenuTiles } from '../../../services/actions/start-menu';
import { actionOpenApp } from '../../../ui/ui';
import { addNavBar, removeNavBar } from '../../../services/actions/nav-bar';
import { IApplicationItem } from '../../../services/reducers/applications';
import { contextMenuContext } from '../../app/app';

type T = {
    id: string,
    setShowPined: any//(showPined:boolean) => void
}

const StartMenuIcon:FC<T> = ({id, setShowPined}) => {
    const applications = useSelector((store) => store.applications.data);
    const pined = useSelector((store) => store.startMenu.pined);

    const isPinedIcon = useSelector((store) => store.startMenu.pined)?.some((application:IApplicationItem) => application.id === id);
    const isTilePinedIcon = useSelector((store) => store.startMenu.tiles)?.some((application:IApplicationItem) => application.id === id);
    const isNavBarPinedIcon = useSelector((store) => store.navBar.apps)?.some((application:IApplicationItem) => application.id === id);

    const { title, icon, name } = applications.find((app:IApplicationItem) => app.id==id);

    const dispatch = useDispatch();

    const apps = appsList;

    let currentSizes:any, currentProps:any;

    try {
        currentProps = eval('apps.'+name+'.appProps');
        currentSizes = eval('apps.'+name+'.appSizes');
    } catch {
        currentProps = defaultAppProps;
        currentSizes = defaultAppSizes;
    }

    const сlickAction = (e:MouseEvent<HTMLDivElement>) => {
        dispatch(checkStartMenu(false));

        setTimeout(() => {
            dispatch(actionOpenApp(id, name, currentSizes, currentProps));
        }, 300)
    }

    const handleAddStartMenuTiles = (e:MouseEvent<HTMLDivElement>) => {
        dispatch(addStartMenuTiles(id))
    }

    const handleRemoveStartMenuTiles = (e:MouseEvent<HTMLDivElement>) => {
        dispatch(removeStartMenuTiles(id))
    }

    const handleAddStartMenuPined = (e:MouseEvent<HTMLDivElement>) => {
        dispatch(addStartMenuPined(id))
    }

    const handleRemoveStartMenuPined = (e:MouseEvent<HTMLDivElement>) => {
        if(pined.length==1) setShowPined(false);

        dispatch(removeStartMenuPined(id));
    }

    const handleAddNavBar = (e:MouseEvent<HTMLDivElement>) => {
        dispatch(addNavBar(id))
    }

    const handleRemoveNavBar = (e:MouseEvent<HTMLDivElement>) => {
        dispatch(removeNavBar(id))
    }
    
    const contextMenuItems = [
        [
            {title: 'Открыть '+title, action: сlickAction}
        ],
        [
            isNavBarPinedIcon?{title: 'Открепить из нижнего меню', action: handleRemoveNavBar}
            :{title: 'Закрепить в нижнем меню', action: handleAddNavBar},
            isPinedIcon?{title: 'Открепить из стартового меню', action: handleRemoveStartMenuPined}
            :{title: 'Закрепить в стартовом меню', action: handleAddStartMenuPined},
            isTilePinedIcon?{title: 'Открепить из панели виджетов', action: handleRemoveStartMenuTiles}
            :{title: 'Закрепить на панель виджетов', action: handleAddStartMenuTiles}
        ]
    ];

    const { showContextMenu, hideContextMenu, setContextMenuItems } = useContext(contextMenuContext);

    const handleContextMenu = (e:MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setContextMenuItems(contextMenuItems);
        showContextMenu(e);
    } 

    return(
        <>
        <div className={css.startMenuItem} onClick={сlickAction} onContextMenu={handleContextMenu}>
            <div className={css.startMenuItemIcon}><img src={icon} /></div>
            <div className={css.startMenuItemName}>{ title }</div>
        </div>
        </>
    )
}

export default StartMenuIcon;