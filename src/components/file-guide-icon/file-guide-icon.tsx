import React, { useState, MouseEvent, useEffect, useRef, FC, useContext } from 'react';
import css from './file-guide-icon.module.css';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS as dndKitCSS } from '@dnd-kit/utilities';
import { defaultIcons, DOCUMENT_HEIGHT, DOCUMENT_WIDTH, FILEGUIDE_APP, findNode } from '../../utils/config';

import * as appsList from '../../applications';
import { useContextMenu, useDispatch, useOutsideAlerter, useSelector } from '../../services/types/hooks';
import { openWindow } from '../../services/actions/open-windows';
import uuid from 'react-uuid';
import { mergeRefs } from 'react-merge-refs';
import { repositionDesktopIcon } from '../../services/actions/desktop-icons';
import { fileGuideContext } from '../../applications/file-guide/file-guide';
import { ContextMenu } from '../../utils/context-menu/context-menu';

type T = {
    id: string,
    active?: boolean,
    desktopRef?: any
}

const FileGuideIcon:FC<T> = ({id, active}) => {
    const applications = useSelector((store) => store.applications.data);

    const fileStructure = useSelector((store) => store.fileStructure.data);

    const { strId, setStrId, backList, setBackList, forwardList, setForwardList, activeIcon, setActiveIcon } = useContext(fileGuideContext);

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

    const clickAction = (e:MouseEvent<HTMLDivElement>) => {
        // e.stopPropagation();
        setActiveIcon(id);
    }

    const doubleClickAction = (e:MouseEvent<HTMLDivElement>) => {
        // e.stopPropagation();
        if(applicationId==FILEGUIDE_APP) {
            setStrId(id);
            setBackList([...backList, strId])
            setForwardList([]);
        } else {
            openAction();
        }
        setActiveIcon('');
    }

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

    const { showContextMenu, hideContextMenu, contextMenuVisible, menuPosition } = useContextMenu();

    const contextMenuItems = [
        [
            {title: 'Открыть'+(applicationId==FILEGUIDE_APP?' в новом окне':''), action: openAction}
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
        e.preventDefault();
        showContextMenu(e);
    } 

    const outsideAlerterRef = useOutsideAlerter(() => {
        hideContextMenu();
        if(activeIcon==id) {
            setActiveIcon('');
        }
    });

    return(
        <>
            <div ref={mergeRefs([outsideAlerterRef, setNodeRef])} className={`${css.fileGuideItem} ${activeIcon==id&&css.fileGuideItemActive}`} onMouseDown={clickAction} onDoubleClick={doubleClickAction} onContextMenu={handleContextMenu}>
                <div className={css.fileGuideItemIcon}><img src={icon} /></div>
                <div className={css.fileGuideItemName}>{title}</div>
            </div>
            <ContextMenu visible={contextMenuVisible} position={menuPosition} contextMenuItems={contextMenuItems} hideContextMenu={hideContextMenu} />
        </>
    )
}

export default FileGuideIcon;