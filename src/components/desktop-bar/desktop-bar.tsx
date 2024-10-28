import React, { useState, MouseEvent } from 'react';
import css from './desktop-bar.module.css';
import FileGuideIcon from '../file-guide-icon/file-guide-icon';
import { DndContext, DragOverlay, MouseSensor, PointerSensor, pointerWithin, TouchSensor, useDroppable, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToParentElement, snapCenterToCursor } from '@dnd-kit/modifiers';
import { createPortal } from 'react-dom';
import { useContextMenu, useDispatch, useSelector } from '../../services/types/hooks';
import { openWindow } from '../../services/actions/open-windows';
import uuid from 'react-uuid';
import { repositionDesktopIcon } from '../../services/actions/desktop-icons';
import { ContextMenu } from '../../utils/context-menu/context-menu';

const DesktopBar = ({activeIcon}:any) => {
    const { setNodeRef } = useDroppable({
        id: "desktop",
        data: {
          accepts: ['window', 'fileGuideIcon'],
        },
    });

    const dispatch = useDispatch();

    const fileStructure = useSelector((store) => store.fileStructure.data);

    const desktopData = fileStructure.children.find((item:any) => item.id=='id-desktop').children;

    const [desktopIcons, setDesktopIcons ] = useState(desktopData);

    const contextMenuItems = [
        [
            {title: 'Создать папку', action: (e:any) => handleCreateFolder}
        ],
        [
            {title: 'Сменить обои...', action: (e:any) => handleChangeWallapers},
            {title: 'Открыть настройки', action: (e:any) => handleOpenSettings}
        ]
    ];

    const { showContextMenu, hideContextMenu, contextMenuVisible, menuPosition } = useContextMenu();
    
    const handleContextMenu = (e:any) => {
        showContextMenu(e);
    } 

    const handleCreateFolder = (e:any) => {
        hideContextMenu();
        alert('Создать папку');
    }

    const handleChangeWallapers = (e:any) => {
        hideContextMenu();
        alert('Сменить обои');
    }

    const handleOpenSettings = (e:any) => {
        hideContextMenu();
        alert('Открыть настройки');
    }
    
    return(
        <div className={css.desktopCont} ref={setNodeRef} onContextMenu={handleContextMenu}>
            {desktopIcons.map((item:any) => 
            <FileGuideIcon id={item.id} key={item.id} />
            )}
            <DragOverlay>
                {activeIcon?(<FileGuideIcon id={activeIcon} active/>):null}
            </DragOverlay>
            <ContextMenu visible={contextMenuVisible} position={menuPosition} contextMenuItems={contextMenuItems} hideContextMenu={hideContextMenu} />
        </div>
    )
}

export default DesktopBar;