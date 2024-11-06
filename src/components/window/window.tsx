import { FC, MouseEvent } from 'react';
import css from './window.module.css';
import { TWindow } from '../../utils/types';
import WindowControlExpand from './window-control/window-control-expand/window-control-expand';
import WindowControlClose from './window-control/window-control-close/window-control-close';
import WindowControlCollapse from './window-control/window-control-collapse/window-control-collapse';
import { useDraggable } from '@dnd-kit/core';
import { CSS as dndKitCSS} from '@dnd-kit/utilities';
import Resizable from '../../utils/resizable/resizable'
import { useDispatch, useOutsideAlerter, useSelector } from '../../services/types/hooks';
import { closeWindow, toActiveWindow, toCollapseWindow, toDisactiveWindows, toExpandWindow } from '../../services/actions/open-windows';
import * as appsList from '../../applications';
import { mergeRefs } from "react-merge-refs";
import Application from '../../applications/application/application';

const Window:FC<TWindow> = ({title, id, properties, winProps, winStates, application, applicationId, structureId, refs}) => {
    const apps = appsList;

    const dispatch = useDispatch();
    
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: id,
        data: {
            type: 'window',
            title: id
        }
    });

    const { isExpand, isCollapse, isDragging } = winStates;
    const { canExpand, canCollapse } = winProps;

    const { isScreensShow, activeWindow, activeScreenWindow }  = useSelector((store) => store.openedWindows);

    const isActive = activeWindow==id?true:false;
    const isScreenActive = activeScreenWindow==id?true:false;

    const listenersOnState = isDragging ? { ...listeners } : undefined;

    const style = {
        left: !isExpand?`${properties.left}px`:`0px`,
        top: isScreenActive?`${properties.top}px`:(!isCollapse?(!isExpand?`${properties.top}px`:`0px`):`2200px`),
        width: !isExpand?`${properties.width}px`:`100%`,
        height: !isExpand?`${properties.height}px`:`100%`,
        transition: isExpand||isCollapse?`0.75s`:undefined,
        pointerEvents: isCollapse?`none`:undefined,
        zIndex: isActive||isScreenActive?10:isCollapse?1:undefined, 
        transform: dndKitCSS.Translate.toString(transform)
    }

    const handleWindowClose = () => {
        dispatch(closeWindow(id));
    };

    const handleWindowExpand = (e:MouseEvent) => {
        if(canExpand) {
            e.stopPropagation();

            if(!isCollapse) dispatch(toExpandWindow(id, !isExpand));
        }
    };

    const handleWindowCollapse = (e:MouseEvent) => {
        e.stopPropagation();
        dispatch(toCollapseWindow(id, true));
    };

    let CurrentApp;
    
    try {
        CurrentApp = eval('apps.'+application+'.App');
    } catch {
        CurrentApp = Application;
    }

    // dispatch(toActiveWindow(props.id));

    const outsideAlerterRef = useOutsideAlerter(() => {
        console.log('outwin'+id)
        isActive&&dispatch(toDisactiveWindows());
    });

    const insideAlerter = (e:MouseEvent<HTMLDivElement>) => {
        !isActive&&dispatch(toActiveWindow(id));
    };

    return(
        <Resizable style={{...style}} winProps={winProps} isExpand={isExpand} refs={mergeRefs([setNodeRef, outsideAlerterRef])} id={id} {...attributes}>
        <div id={id} onMouseDown={insideAlerter} className={`${css.windowCont} ${isExpand&&css.windowContExpand} ${isCollapse&&css.windowContCollapse} ${isActive&&css.windowContActive} ${isScreensShow&&!isScreenActive&&css.windowContScreenActive} ${isScreensShow&&css.activeScreenWindows}`} ref={refs}>
            {/* <div> */}
                <div className={css.windowHeader} onDoubleClick={handleWindowExpand}>
                    <div className={css.windowHeaderHandler} {...listenersOnState}></div>
                    <div className={css.windowHeaderTitle}>{title}</div>
                    <div className={css.windowHeaderControl}>
                        {canCollapse&&<WindowControlCollapse handleClick={handleWindowCollapse} />}
                        {canExpand&&<WindowControlExpand handleClick={handleWindowExpand} />}
                        <WindowControlClose handleClick={handleWindowClose} />
                    </div>
                </div>
                <div className={css.windowContent}>
                    <CurrentApp id={id} structureId={structureId} appId={applicationId} />
                </div>
            {/* </div> */}
        </div>
        </Resizable>
    )
}

export default Window;