import React, { useCallback, useEffect, useRef, useState } from 'react';
import css from './start-menu-cont-apps.module.css';
import StartMenuIcon from '../../start-menu-icon/start-menu-icon';
import { useSelector } from '../../../services/types/hooks';

import {
    DndContext,
    closestCenter,
    MouseSensor,
    TouchSensor,
    DragOverlay,
    useSensor,
    useSensors,
    DragStartEvent,
    DragEndEvent,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import StartMenuContAppsListAll from './start-menu-cont-apps-list-all/start-menu-cont-apps-list-all';
import StartMenuContAppsListPined from './start-menu-cont-apps-list-pined/start-menu-cont-apps-list-pined';
import { SwitchTransition } from 'react-transition-group';
import { CSSTransition } from 'react-transition-group';

const StartMenuContApps = () => {
    const [ showPined, setShowPined ] = useState(true);

    const contTransition = {
        enter: showPined?css.contEnter:css.contEnterL,
        enterActive: css.contEnterActive,
        exit: css.contExit,
        exitActive: showPined?css.contExitActive:css.contExitActiveL
    }

    const pinedAppsRef = useRef(null);
    const allAppsRef = useRef(null);
    const nodeRef = showPined ? pinedAppsRef : allAppsRef;
    
    return(
        <div className={css.startMenuAppsCont}>
            <div className={css.startMenuAppsSwitch}>
                <div className={`${css.startMenuAppsSwitchItem} ${showPined&&css.startMenuAppsSwitchItemActive}`} onClick={e => setShowPined(true)}>Закрепленные</div>
                <div className={`${css.startMenuAppsSwitchItem} ${!showPined&&css.startMenuAppsSwitchItemActive}`} onClick={e => setShowPined(false)}>Все приложения</div>
            </div>
            <SwitchTransition>
                <CSSTransition timeout={300} classNames={contTransition} nodeRef={nodeRef} key={showPined?'pined':'all'}>
                    <div ref={nodeRef}>
                    {showPined?<StartMenuContAppsListPined />:<StartMenuContAppsListAll />}
                    </div>
                </CSSTransition>
            </SwitchTransition>
        </div>
    );
}

export default StartMenuContApps;