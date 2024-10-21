import React from 'react';
import css from './windows-bar.module.css';
import cssWindow from '../window/window.module.css';
import Window from '../window/window';
import { useDroppable } from '@dnd-kit/core';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useDispatch, useSelector } from '../../services/types/hooks';

const WindowsBar = () => {
    const winTransition = {
      enter: cssWindow.windowContEnter,
      enterActive: cssWindow.windowContEnterActive,
      exit: cssWindow.windowContExit,
      exitActive: cssWindow.windowContExitActive
    }

    const winCollapseTransition = {
      enter: cssWindow.windowCollapseContEnter,
      enterActive: cssWindow.windowCollapseContEnterActive,
      exit: cssWindow.windowCollapseContExit,
      exitActive: cssWindow.windowCollapseContExitActive
    }

    const openedWindows = useSelector((store) => store.openedWindows.data);//.filter((window:any) => window.winStates.isCollapse==false);
  
    return(
            <TransitionGroup component={null}>
              {openedWindows&&openedWindows.map((openedWindow:any) => {
                const itemRef:any = React.createRef();
                // const isCollapse = openedWindow.winStates.isCollapse;
                return(
                <CSSTransition nodeRef={itemRef} classNames={winTransition} timeout={300} key={openedWindow.id}>
                  <Window refs={itemRef} title={openedWindow.title} key={openedWindow.id} id={openedWindow.id} properties={openedWindow.properties} winProps={openedWindow.winProps} winStates={openedWindow.winStates} application={openedWindow.application} applicationId={openedWindow.applicationId}  />
                </CSSTransition>
                )})}
            </TransitionGroup>
    );
}

export default WindowsBar;