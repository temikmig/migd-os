import React, { useState, MouseEvent } from 'react';
import css from './desktop-bar.module.css';
import FileGuideIcon from '../file-guide-icon/file-guide-icon';
import { DndContext, DragOverlay, MouseSensor, PointerSensor, pointerWithin, TouchSensor, useDroppable, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToParentElement, snapCenterToCursor } from '@dnd-kit/modifiers';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from '../../services/types/hooks';
import { openWindow } from '../../services/actions/open-windows';
import uuid from 'react-uuid';
import { repositionDesktopIcon } from '../../services/actions/desktop-icons';

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

    const [desktopIcons, setDesktopIcons] = useState(desktopData);
    
    return(
        <div className={css.desktopCont} ref={setNodeRef}>
            {desktopIcons.map((item:any) => 
            <FileGuideIcon id={item.id} key={item.id} />
            )}
            <DragOverlay>
                {activeIcon?(<FileGuideIcon id={activeIcon} active/>):null}
            </DragOverlay>
        </div>
    )
}

export default DesktopBar;