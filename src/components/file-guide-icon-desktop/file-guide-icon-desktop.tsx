import React, { useState, MouseEvent, KeyboardEvent, useEffect, useRef, FC, useContext } from 'react';
import css from './file-guide-icon-desktop.module.css';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS as dndKitCSS } from '@dnd-kit/utilities';
import { defaultIcons, DOCUMENT_HEIGHT, DOCUMENT_WIDTH, findNode } from '../../utils/config';

import * as appsList from '../../applications';
import { useDispatch, useOutsideAlerter, useSelector } from '../../services/types/hooks';
import { openWindow } from '../../services/actions/open-windows';
import uuid from 'react-uuid';
import { mergeRefs } from 'react-merge-refs';
import { repositionDesktopIcon } from '../../services/actions/desktop-icons';
import { iconsContext } from '../content-bar/content-bar';
import { contextMenuContext } from '../app/app';

type T = {
    id: string,
    active?: boolean,
    desktopRef?: any
}

const FileGuideIconDesktop:FC<T> = ({id, active}) => {
    const { activeIcon, setActiveIcon, renameIcon, setRenameIcon } = useContext(iconsContext);

    const applications = useSelector((store) => store.applications.data);

    const fileStructure = useSelector((store) => store.fileStructure.data);

    const desktopIconsPosition = useSelector((store) => store.desktopIconsPosition.data).find((icons:any) => icons.id==id)?.properties;

    const { title, application, type, content } = findNode(id, fileStructure);

    const applicationId = applications.find((app:any) => app.name==application).id;

    const { isOver, setNodeRef  } = useDroppable({
        id: "fileGuideIcon",
        data: {
            accepts: [],
        },
    });

    // const listenersOnState = 1 ? { ...listeners } : undefined;

    const apps = appsList;

    const currentIcon = eval('apps.'+application+'.appIcon');
    const currentProps = eval('apps.'+application+'.appProps');
    const currentSizes = eval('apps.'+application+'.appSizes');

    const icon = (application=='ImageGuide')?'images/'+content:currentIcon;

    const dispatch = useDispatch();

    const openAction = () => {
        dispatch(openWindow({
            id: uuid(),
            
            properties: {
            top: (DOCUMENT_HEIGHT / 2) - (currentSizes.height / 2),
            left: (DOCUMENT_WIDTH / 2) - (currentSizes.width / 2),
            width: currentSizes.width,
            height: currentSizes.height
            },
            winProps: currentProps,
            winStates: {
            isExpand: false,
            isCollapse: false,
            isDragging: true
            },
            application: application,
            applicationId: applicationId,
            structureId: id
        }));
    }

    const handleRenameStr = (e:MouseEvent<HTMLDivElement>) => {
        setRenameIcon(id);
    }

    const contextMenuItems = [
        [
            {title: 'Открыть', action: openAction}
        ],
        [
            {title: 'Копировать', action: (e:any) => {}},
            {title: 'Вырезать', action: (e:any) => {}},
        ],
        [
            {title: 'Переименовать', action: (e:any) => {}},
            {title: 'Удалить', action: (e:any) => {}},
        ]
    ];

    const handleContextMenu = (e:MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        hideContextMenu();
        setContextMenuItems(contextMenuItems);
        showContextMenu(e);
    } 

    const [ iconTitle, setIconTitle ] = useState(title);

    // const handleChangeIconTitle = (e:KeyboardEvent<HTMLInputElement>) => {
    //     const inputTarget = e.target as HTMLInputElement;

    //     const value = String(inputTarget.value);

    //     setIconTitle(value);

    //     if(e.code === 'Enter') setRenameIcon('');
    // }

    const { showContextMenu, hideContextMenu, setContextMenuItems, openedControl, setOpenedControl } = useContext(contextMenuContext);

    const clickAction = (e:MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        hideContextMenu();
        setOpenedControl('');
        setActiveIcon('desktop-'+id);
        setRenameIcon('');
    }

    const doubleClickAction = (e:MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        openAction();
        setActiveIcon('');
    }

    // const outsideAlerterRef = useOutsideAlerter(() => {
    //     isActivesetIsActive(false);
    // });

    const [ gridPosition, setGridPosition ] = useState({left: 0, top: 0})

    const iconRef = useRef<any>(null);

    useEffect(() => {
        const icon = iconRef?.current.getBoundingClientRect();

        const posLeft = Math.ceil((icon.x+65)/130);
        const posTop = Math.ceil((icon.y+65)/130);

        if(!active) {
            dispatch(repositionDesktopIcon(id, {
                left: posLeft, top: posTop
            }));
        }
    }, [gridPosition]);

    const titleRef = useRef<any>(null);

    useEffect(() => {
        titleRef.current?.focus(); 
        titleRef.current?.select(); 
    }, [renameIcon]);

    return(
        <div ref={mergeRefs([setNodeRef, iconRef])} className={`${css.fileGuideItem} ${activeIcon=='desktop-'+id&&css.fileGuideItemActive}`} onMouseDown={clickAction} onDoubleClick={doubleClickAction} onContextMenu={handleContextMenu}>
            <div className={css.fileGuideItemIcon}><img src={icon} /></div>
            <div className={css.fileGuideItemName}>{iconTitle}</div>
        </div>
    )
}

export default FileGuideIconDesktop;