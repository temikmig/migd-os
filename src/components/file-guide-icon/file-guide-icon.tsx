import React, { useState, MouseEvent, useEffect, useRef, FC, useContext, KeyboardEvent } from 'react';
import css from './file-guide-icon.module.css';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS as dndKitCSS } from '@dnd-kit/utilities';
import { defaultIcons, DELETE_BIN_APP, DOCUMENT_HEIGHT, DOCUMENT_WIDTH, FILEGUIDE_APP, findNode } from '../../utils/config';

import * as appsList from '../../applications';
import { useDispatch, useOutsideAlerter, useSelector } from '../../services/types/hooks';
import { openWindow } from '../../services/actions/open-windows';
import uuid from 'react-uuid';
import { mergeRefs } from 'react-merge-refs';
import { repositionDesktopIcon } from '../../services/actions/desktop-icons';
import { fileGuideContext } from '../../applications/file-guide/file-guide';
import { ContextMenu } from '../../utils/context-menu/context-menu';
import { contextMenuContext } from '../app/app';
import { iconsContext } from '../content-bar/content-bar';

type T = {
    id: string,
    basis: string,
    active?: boolean,
    desktopRef?: any,
}

const FileGuideIcon:FC<T> = ({id, basis, active}) => {
    const applications = useSelector((store) => store.applications.data);

    const fileStructure = useSelector((store) => store.fileStructure.data);

    const { strId, setStrId, backList, setBackList, forwardList, setForwardList } = useContext(fileGuideContext);
    const { activeIcon, setActiveIcon, renameIcon, setRenameIcon } = useContext(iconsContext);

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

    const icon = (application=='ImageGuide')?'images/'+content:(id=='id-recyclebin'?'apps-icons/delete-bin.svg':(id=='id-desktop'?'apps-icons/desktop.svg':(id=='id-images'?'apps-icons/images.svg':currentIcon)));

    const dispatch = useDispatch();

    const { showContextMenu, hideContextMenu, setContextMenuItems, openedControl, setOpenedControl } = useContext(contextMenuContext);

    const clickAction = (e:MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setOpenedControl('');
        hideContextMenu();
        setActiveIcon(basis+'-'+id);
        setRenameIcon('');
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

    const contextMenuItemsSys = [
        [
            {title: 'Открыть'+(applicationId==FILEGUIDE_APP?' в новом окне':''), action: openAction}
        ]
    ];

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

    const sysStrFlag = id=='id-recyclebin'||id=='id-desktop'||id=='id-images';

    const handleContextMenu = (e:MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        hideContextMenu();
        setContextMenuItems(sysStrFlag?contextMenuItemsSys:contextMenuItems);
        showContextMenu(e);
    } 

    const [ iconTitle, setIconTitle ] = useState(title);

    // const handleChangeIconTitle = (e:KeyboardEvent<HTMLInputElement>) => {
    //     const inputTarget = e.target as HTMLInputElement;

    //     const value = String(inputTarget.value);

    //     setIconTitle(value);

    //     if(e.code === 'Enter') setRenameIcon('');
    // }

    const titleRef = useRef<any>(null);

    useEffect(() => {
        titleRef.current?.focus(); 
        titleRef.current?.select(); 
    }, [renameIcon]);

    return(
        <>
            <div ref={setNodeRef} className={`${css.fileGuideItem} ${activeIcon==basis+'-'+id&&css.fileGuideItemActive}`} onMouseDown={clickAction} onDoubleClick={doubleClickAction} onContextMenu={handleContextMenu}>
                <div className={css.fileGuideItemIcon}><img src={icon} /></div>
                <div className={css.fileGuideItemName}>{iconTitle}</div>
            </div>
        </>
    )
}

export default FileGuideIcon;