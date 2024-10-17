import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import css from './window.module.css';
import { TWindow } from '../../utils/types';
import WindowControlExpand from './window-control/window-control-expand/window-control-expand';
import WindowControlClose from './window-control/window-control-close/window-control-close';
import WindowControlCollapse from './window-control/window-control-collapse/window-control-collapse';
import { useDraggable } from '@dnd-kit/core';
import { CSS as dndKitCSS} from '@dnd-kit/utilities';
import Resizable from '../../utils/resizable/resizable'
import { CSSTransition } from 'react-transition-group';
import { useDispatch, useInsideAlerter, useOutsideAlerter } from '../../services/types/hooks';
import { closeWindow, toActiveWindow, toDisactiveWindows, toExpandWindow } from '../../services/actions/open-windows';
import * as appsList from '../../applications';
import { mergeRefs } from "react-merge-refs";
import Application from '../../applications/application/application';

const Window:FC<TWindow> = ({title, id, properties, winProps, winStates, application, applicationId, refs}) => {
    const apps = appsList;

    const dispatch = useDispatch();
    
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: id,
        data: {
            type: 'window',
            title: id
        }
    });

    const { isActive, isExpand, isCollapse, isDragging } = winStates;
    const { canExpand, canCollapse } = winProps;

    const listenersOnState = isDragging ? { ...listeners } : undefined;

    const style = {
        left: !isExpand?`${properties.left}px`:`0px`,
        top: !isExpand?`${properties.top}px`:`0px`,
        width: !isExpand?`${properties.width}px`:`100%`,
        height: !isExpand?`${properties.height}px`:`100%`,
        transition: isExpand?`0.3s`:undefined,
        zIndex: isActive?10:undefined, 
        transform: dndKitCSS.Translate.toString(transform)
    }

    const handleWindowClose = () => {
        dispatch(closeWindow(id));
    };

    const handleWindowExpand = () => {
        dispatch(toExpandWindow(id, !isExpand));
    };

    let CurrentApp;
    
    try {
        CurrentApp = eval('apps.'+application+'.App');
    } catch {
        CurrentApp = Application;
    }

    // dispatch(toActiveWindow(props.id));

    const outsideAlerterRef = useOutsideAlerter(() => {
        isActive&&dispatch(toDisactiveWindows(id));
    });

    const insideAlerterRef = useInsideAlerter(() => {
        !isActive&&dispatch(toActiveWindow(id));
    });

    return(
        <Resizable style={{...style}} winProps={winProps} isExpand={isExpand} refs={mergeRefs([setNodeRef, outsideAlerterRef, insideAlerterRef])} id={id} {...attributes}>
        <div id={id} className={`${css.windowCont} ${isExpand&&css.windowContExpand} ${isActive&&css.windowContActive}`} ref={refs}>
            <div className={css.windowHeader} onDoubleClick={handleWindowExpand}>
                <div className={css.windowHeaderHandler} {...listenersOnState}></div>
                <div className={css.windowHeaderTitle}>{title}</div>
                <div className={css.windowHeaderControl}>
                    {canCollapse&&<WindowControlCollapse />}
                    {canExpand&&<WindowControlExpand handleClick={handleWindowExpand} />}
                    <WindowControlClose handleClick={handleWindowClose} />
                </div>
            </div>
            <div className={css.windowContent}>
                <CurrentApp id={id} appId={applicationId} />
            </div>
        </div>
        </Resizable>
    )
}

export default Window;