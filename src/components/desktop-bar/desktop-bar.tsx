import React, { useState, MouseEvent, useRef, useContext } from 'react';
import css from './desktop-bar.module.css';
import FileGuideIcon from '../file-guide-icon/file-guide-icon';
import { DndContext, DragOverlay, MouseSensor, PointerSensor, pointerWithin, TouchSensor, useDroppable, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToParentElement, snapCenterToCursor } from '@dnd-kit/modifiers';
import { createPortal } from 'react-dom';
import { useDispatch, useOutsideAlerter, useSelector } from '../../services/types/hooks';
import { openWindow, toActiveWindow } from '../../services/actions/open-windows';
import uuid from 'react-uuid';
import { repositionDesktopIcon } from '../../services/actions/desktop-icons';
import { ContextMenu } from '../../utils/context-menu/context-menu';
import { mergeRefs } from 'react-merge-refs';
import Draggable from '../../utils/draggable/draggable';
import FileGuideIconDesktop from '../file-guide-icon-desktop/file-guide-icon-desktop';
import { contextMenuContext } from '../app/app';
import { iconsContext } from '../content-bar/content-bar';
import { SETTINGS_APP } from '../../utils/config';
import { actionOpenApp } from '../../ui/ui';
import { IApplicationItem } from '../../services/reducers/applications';
import * as appsList from '../../applications';

const DesktopBar = () => {
    const { setNodeRef } = useDroppable({
        id: "desktop",
        data: {
          accepts: ['window', 'fileGuideIcon'],
        },
    });

    const dispatch = useDispatch();

    const fileStructure = useSelector((store) => store.fileStructure.data);
    const openedWindows = useSelector((store) => store.openedWindows.data);

    const desktopData = fileStructure.children.find((item:any) => item.id=='id-desktop').children;

    const [desktopIcons, setDesktopIcons ] = useState(desktopData);

    const apps = appsList;

    const currentProps = eval('apps.Settings.appProps');
    const currentSizes = eval('apps.Settings.appSizes');

    const handleOpenSettings = () => {
        const openedWindow = openedWindows.find((window:any) => window.applicationId==SETTINGS_APP);
        
        if(openedWindow) {
            dispatch(toActiveWindow(openedWindow.id));
        } else {
            setTimeout(() => {
                dispatch(actionOpenApp(SETTINGS_APP, 'Settings', currentSizes, currentProps));
            }, 300);
        }
    }

    const contextMenuItems = [
        [
            {title: 'Создать папку', action: (e:any) => handleCreateFolder}
        ],
        [
            {title: 'Открыть настройки', action: handleOpenSettings}
        ]
    ];

    const { showContextMenu, hideContextMenu, setContextMenuItems } = useContext(contextMenuContext);
    
    const handleContextMenu = (e:any) => {
        e.stopPropagation();
        setContextMenuItems(contextMenuItems);
        showContextMenu(e);
    } 

    const handleCreateFolder = (e:any) => {
        hideContextMenu();
        alert('Создать папку');
    }
    
    const desktopRef = useRef(null);

    const { activeIcon, setActiveIcon, renameIcon, setRenameIcon } = useContext(iconsContext);

    const handleOutsideFileGuide = (e:MouseEvent<HTMLDivElement>) => {
        if(activeIcon.startsWith('desktop')) {
            e.stopPropagation();
            setActiveIcon('');
            setRenameIcon('');
        }
    } 

    const outsideAlerterRef = useOutsideAlerter(() => {
        if(activeIcon.startsWith('desktop')) {
            setActiveIcon('');
            setRenameIcon('');
        }
    });

    return(
        <div className={css.desktopCont} ref={mergeRefs([setNodeRef, desktopRef, outsideAlerterRef])} onMouseDown={handleOutsideFileGuide} onContextMenu={handleContextMenu}>
            {desktopIcons.map((item:any) => 
            <Draggable id={item.id} uid={item.id} key={item.id} type="fileGuideIcon">
                <FileGuideIconDesktop id={item.id} />
            </Draggable>
            )}
            <DragOverlay>
                {activeIcon?(<FileGuideIconDesktop id={activeIcon} active/>):null}
            </DragOverlay>
        </div>
    )
}

export default DesktopBar;