import React, { useState, MouseEvent, useEffect } from 'react';
import css from './start-menu-icon.module.css';
import { useDraggable } from '@dnd-kit/core';
import { CSS as dndKitCSS } from '@dnd-kit/utilities';
import { defaultAppProps, defaultAppSizes, defaultIcons, DOCUMENT_HEIGHT, DOCUMENT_WIDTH, findNode } from '../../utils/config';

import * as appsList from '../../applications';
import { useContextMenu, useDispatch, useOutsideAlerter, useSelector } from '../../services/types/hooks';
import { openWindow } from '../../services/actions/open-windows';
import uuid from 'react-uuid';
import { mergeRefs } from 'react-merge-refs';
import { addStartMenuPined, addStartMenuTiles, checkStartMenu, removeStartMenuPined, removeStartMenuTiles } from '../../services/actions/start-menu';
import { useSortable } from '@dnd-kit/sortable';
import { actionOpenApp } from '../../ui/ui';
import { ContextMenu } from '../../utils/context-menu/context-menu';
import { addNavBar, removeNavBar } from '../../services/actions/nav-bar';

const StartMenuIcon = ({id, active, setShowPined}:any) => {
    const applications = useSelector((store) => store.applications.data);
    const pined = useSelector((store) => store.startMenu.pined);

    const isPinedIcon = useSelector((store) => store.startMenu.pined)?.some((application:any) => application.id === id);
    const isTilePinedIcon = useSelector((store) => store.startMenu.tiles)?.some((application:any) => application.id === id);
    const isNavBarPinedIcon = useSelector((store) => store.navBar.apps)?.some((application:any) => application.id === id);

    const { title, icon, name } = applications.find((app:any) => app.id==id);

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

    const { showContextMenu, hideContextMenu, contextMenuVisible, menuPosition } = useContextMenu();
    
    const handleAddStartMenuTiles = (e:any) => {
        dispatch(addStartMenuTiles(id))
    }

    const handleRemoveStartMenuTiles = (e:any) => {
        dispatch(removeStartMenuTiles(id))
    }

    const handleAddStartMenuPined = (e:any) => {
        dispatch(addStartMenuPined(id))
    }

    const handleRemoveStartMenuPined = (e:any) => {
        if(pined.length==1) setShowPined(false);

        dispatch(removeStartMenuPined(id));
    }

    const handleAddNavBar = (e:any) => {
        dispatch(addNavBar(id))
    }

    const handleRemoveNavBar = (e:any) => {
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

    const handleContextMenu = (e:any) => {
        showContextMenu(e);
    } 

    return(
        <>
        <div className={css.startMenuItem} onClick={сlickAction} onContextMenu={handleContextMenu}>
            <div className={css.startMenuItemIcon}><img src={icon} /></div>
            <div className={css.startMenuItemName}>{ title }</div>
        </div>
        <ContextMenu visible={contextMenuVisible} position={menuPosition} contextMenuItems={contextMenuItems} hideContextMenu={hideContextMenu} />
        </>
    )
}

export default StartMenuIcon;