import React, { createContext, FC, useMemo, useState } from 'react';
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

}

export const iconsContext = createContext({
  activeIcon: '',
  setActiveIcon: (activeIcon:string) => {},
  renameIcon: '',
  setRenameIcon: (renameIcon:string) => {}
});

const ContentBar:FC<T> = () => {
    const dispatch = useDispatch();

    const [activeIcon, setActiveIcon] = useState('');
    const [renameIcon, setRenameIcon] = useState('');

    const openedWindows = useSelector((store) => store.openedWindows);

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
        const target = ev.activatorEvent.target.parentNode.parentNode;
        const targetProps = target.getBoundingClientRect();
        const desktopProps = target.parentNode.getBoundingClientRect();
        const rLeft =  Math.ceil((target.offsetLeft + ev.delta.x+65)/130);
        const rTop =  Math.ceil((target.offsetTop + ev.delta.y+65)/130);
        
        dispatch(repositionDesktopIcon(ev.active.id, {
          left: rLeft, top: rTop
        }));

        setActiveIcon('');
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

    const value = useMemo(() => ({
        activeIcon,
        setActiveIcon,
        renameIcon,
        setRenameIcon
    }), [activeIcon, renameIcon]);

    return(
      <iconsContext.Provider value={value}>
        <DndContext modifiers={[restrictToParentElement]} sensors={dndSensors} autoScroll={false} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className={css.contentBar}>
            <WindowsBar />
            <DesktopBar />
          </div>
        </DndContext>
      </iconsContext.Provider>
    );
}

export default ContentBar;