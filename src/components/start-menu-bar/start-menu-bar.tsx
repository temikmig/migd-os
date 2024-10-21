import React, { useEffect, useState } from 'react';
import css from './start-menu-bar.module.css';
import { CSSTransition } from 'react-transition-group';
import cssCont from '../app/app.module.css';
import StartMenuContApps from './start-menu-cont-apps/start-menu-cont-apps';
import StartMenuContTiles from './start-menu-cont-tiles/start-menu-cont-tiles';
import StartMenuContSearch from './start-menu-cont-search/start-menu-cont-search';
import StartMenuContSettings from './start-menu-cont-settings/start-menu-cont-settings';
import { DragOverlay } from '@dnd-kit/core';
import { snapCenterToCursor } from '@dnd-kit/modifiers';
import StartMenuIcon from '../start-menu-icon/start-menu-icon';
import StartMenuTile from '../start-menu-tile/start-menu-tile';
import { useDispatch, useOutsideAlerter } from '../../services/types/hooks';
import { checkStartMenu } from '../../services/actions/start-menu';

const StartMenuBar = ({view}:any) => {
    const dispatch = useDispatch();
    const contTransition = {
        enter: cssCont.contEnter,
        enterActive: cssCont.contEnterActive,
        exit: cssCont.contExit,
        exitActive: cssCont.contExitActive
    }

    const handleOutside = () => {
        dispatch(checkStartMenu(false));
    };

    const outsideAlerterRef = useOutsideAlerter(() => {
        // dispatch(checkStartMenu(false));
    });
   
    return(
        <CSSTransition in={view} timeout={400} classNames={contTransition} unmountOnExit>
            <div className={css.startMenuCont}>
                <div className={css.startMenuContainer} ref={outsideAlerterRef}>
                    <StartMenuContSearch />
                    <div className={css.startMenuMainCont}>
                        <StartMenuContApps />
                        <StartMenuContTiles />
                    </div>
                    <StartMenuContSettings />
                </div>
            </div>
        </CSSTransition>
    );
}

export default StartMenuBar;