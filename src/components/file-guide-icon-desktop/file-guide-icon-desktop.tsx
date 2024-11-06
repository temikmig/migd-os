import React, { useState, MouseEvent, useEffect, useRef, FC } from 'react';
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

type T = {
    id: string,
    active?: boolean,
    desktopRef?: any
}

const FileGuideIconDesktop:FC<T> = ({id, active}) => {
    const [ isActive, setIsActive ] = useState(false);

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

    const clickAction = (e:MouseEvent<HTMLDivElement>) => {
        // e.stopPropagation();
        setIsActive(true);
    }

    const doubleClickAction = (e:MouseEvent<HTMLDivElement>) => {
        // e.stopPropagation();
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
        setIsActive(false);
    }

    const outsideAlerterRef = useOutsideAlerter(() => {
        isActive&&setIsActive(false);
    });

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

    return(
        <div ref={mergeRefs([outsideAlerterRef, setNodeRef, iconRef])} className={`${css.fileGuideItem} ${isActive&&css.fileGuideItemActive}`} onMouseDown={clickAction} onDoubleClick={doubleClickAction}>
            <div className={css.fileGuideItemIcon}><img src={icon} /></div>
            <div className={css.fileGuideItemName}>{title}</div>
        </div>
    )
}

export default FileGuideIconDesktop;