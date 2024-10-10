import React, { useCallback, useEffect, useState } from 'react';
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


const StartMenuContApps = () => {
    const [ showPined, setShowPined ] = useState(true);
    
    return(
        <div className={css.startMenuAppsCont}>
            <div className={css.startMenuAppsSwitch}>
                <div className={`${css.startMenuAppsSwitchItem} ${showPined&&css.startMenuAppsSwitchItemActive}`} onClick={e => setShowPined(true)}>Закрепленные</div>
                <div className={`${css.startMenuAppsSwitchItem} ${!showPined&&css.startMenuAppsSwitchItemActive}`} onClick={e => setShowPined(false)}>Все</div>
            </div>
            {showPined?
            <StartMenuContAppsListPined />
            :<StartMenuContAppsListAll />
            }
        </div>
    );
}

export default StartMenuContApps;