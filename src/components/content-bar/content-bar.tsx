import React, { FC, useState } from 'react';
import css from './content-bar.module.css';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { CSSTransition } from 'react-transition-group';
import DesktopBar from '../desktop-bar/desktop-bar';
import { useDispatch, useSelector } from '../../services/types/hooks';
import { repositionWindow, toActiveWindow } from '../../services/actions/open-windows';
import cssCont from '../app/app.module.css';
import WindowsBar from '../windows-bar/windows-bar';
import { repositionDesktopIcon } from '../../services/actions/desktop-icons';
import { IOpenWindowItem } from '../../services/reducers/open-windows';
import { IDesktopIconItem } from '../../services/reducers/desktop-icons';

type T = {
  view: boolean
}

const ContentBar:FC<T> = ({view}) => {
    const dispatch = useDispatch();

    const contTransition = {
      enter: cssCont.contEnter,
      enterActive: cssCont.contEnterActive,
      exit: cssCont.contExit,
      exitActive: cssCont.contExitActive
    }

    const [activeIcon, setActiveIcon] = useState(null);

    const openedWindows = useSelector((store) => store.openedWindows);
    // const iconsPositions = useSelector((store) => store.desktopIconsPosition);

    // const iconsPositionsList = iconsPositions.length>0&&iconsPositions.map((icon:IDesktopIconItem) => icon.properties);

    // console.log(iconsPositionsList);

    function handleDragStart(ev:any) {
      const isActiveWindow = openedWindows.activeWindow==ev.active.id?true:false;

      const type = ev.active.data.current.type;

      if(type=='fileGuideIcon') {
        setActiveIcon(ev.active.id);
        
      }

      if(type=='window') {
        if(!isActiveWindow) dispatch(toActiveWindow(ev.active.id));
      }
    }

    function handleDragEnd(ev:any) {
      const type = ev.active.data.current.type;

      if(type=='fileGuideIcon') {
        console.log(ev)

        const target = ev.activatorEvent.target.parentNode.parentNode;
        const targetProps = target.getBoundingClientRect();
        const desktopProps = target.parentNode.getBoundingClientRect();
        const rLeft =  Math.ceil((target.offsetLeft + ev.delta.x+65)/130);
        const rTop =  Math.ceil((target.offsetTop + ev.delta.y+65)/130);
        
        dispatch(repositionDesktopIcon(ev.active.id, {
          left: rLeft, top: rTop
        }));

        setActiveIcon(null);
      }

      if(type=='window') {
        const openedWindow:IOpenWindowItem = openedWindows.data.find((window:IOpenWindowItem) => window.id === ev.active.id);

        dispatch(repositionWindow(ev.active.id, {
          left: openedWindow.properties.left + ev.delta.x,
          top: openedWindow.properties.top + ev.delta.y
        }));
      }
    }

    const dndSensors = useSensors(
      useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
    );
      
    return(
      <CSSTransition in={view} timeout={400} classNames={contTransition} unmountOnExit>
        <DndContext modifiers={[restrictToParentElement]} sensors={dndSensors} autoScroll={false} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className={css.contentBar}>
            <WindowsBar />
            <DesktopBar activeIcon={activeIcon} />
          </div>
        </DndContext>
      </CSSTransition>
    );
}

export default ContentBar;