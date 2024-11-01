import React, { FC } from 'react';
import cssWindow from '../window/window.module.css';
import Window from '../window/window';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useSelector } from '../../services/types/hooks';
import { TWindow } from '../../utils/types';

const WindowsBar:FC = () => {
    const winTransition = {
      enter: cssWindow.windowContEnter,
      enterActive: cssWindow.windowContEnterActive,
      exit: cssWindow.windowContExit,
      exitActive: cssWindow.windowContExitActive
    }

    const openedWindows = useSelector((store) => store.openedWindows.data);
  
    return(
            <TransitionGroup component={null}>
              {openedWindows&&openedWindows.map((openedWindow:TWindow) => {
                const itemRef:any = React.createRef();
                return(
                <CSSTransition nodeRef={itemRef} classNames={winTransition} timeout={300} key={openedWindow.id}>
                  <Window refs={itemRef} title={openedWindow.title} key={openedWindow.id} id={openedWindow.id} properties={openedWindow.properties} winProps={openedWindow.winProps} winStates={openedWindow.winStates} application={openedWindow.application} applicationId={openedWindow.applicationId}  />
                </CSSTransition>
                )})}
            </TransitionGroup>
    );
}

export default WindowsBar;