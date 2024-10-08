import React, { useState, MouseEvent, useEffect } from 'react';
import css from './file-guide-icon.module.css';
import { useDraggable } from '@dnd-kit/core';
import { CSS as dndKitCSS } from '@dnd-kit/utilities';
import { defaultIcons, DOCUMENT_HEIGHT, DOCUMENT_WIDTH, findNode } from '../../utils/config';

import * as appsList from '../../applications';
import { useDispatch, useOutsideAlerter, useSelector } from '../../services/types/hooks';
import { openWindow } from '../../services/actions/open-windows';
import uuid from 'react-uuid';
import { mergeRefs } from 'react-merge-refs';

const FileGuideIcon = ({id, active, props}:any) => {
    const [ isActive, setIsActive ] = useState(false);

    // useEffect(() => {
    //     setIsActive(true);
    // }, [])

    const fileStructure = useSelector((store) => store.fileStructure.data);

    const desktopIconsPosition = useSelector((store) => store.desktopIconsPosition.data).find((icons:any) => icons.id==id)?.properties;

    const {name, application, type } = findNode(id, fileStructure);

    const {attributes, listeners, setNodeRef} = useDraggable({
        id: id,
        data: {
            type: 'fileGuideIcon',
            title: id
        }
    });

    const listenersOnState = 1 ? { ...listeners } : undefined;

    const apps = appsList;

    const currentIcon = eval('apps.'+application+'.appIcon');
    const currentProps = eval('apps.'+application+'.appProps');
    const currentSizes = eval('apps.'+application+'.appSizes');

    const icon = (application=='FileGuide')?defaultIcons.find(item => item.type==type)?.icon:currentIcon;

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
              isActive: true,
              isExpand: false,
              isCollapse: false,
              isDragging: true
            },
            application: application
          }));
        setIsActive(false);
    }



    const styles = {
        left: !active&&desktopIconsPosition?`${desktopIconsPosition.left}px`:undefined,
        top: !active&&desktopIconsPosition?`${desktopIconsPosition.top}px`:undefined,
        // position: desktopIconsPosition?'absolute' as 'absolute':'relative' as 'relative'
        
        // transform: dndKitCSS.Translate.toString(transform)
    }

    const outsideAlerterRef = useOutsideAlerter(() => {
        isActive&&setIsActive(false);
    });

    return(
        <div ref={mergeRefs([outsideAlerterRef, setNodeRef])} style={styles} className={`${css.fileGuideItem} ${isActive&&css.fileGuideItemActive}`} onMouseDown={clickAction} onDoubleClick={doubleClickAction}>
            <div className={css.fileGuideItemIcon} {...attributes} {...listenersOnState}><img src={icon} /></div>
            <div className={css.fileGuideItemName}>{name}</div>
        </div>
    )
}

export default FileGuideIcon;