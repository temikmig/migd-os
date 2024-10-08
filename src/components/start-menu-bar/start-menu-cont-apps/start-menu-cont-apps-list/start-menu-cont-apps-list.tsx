import React, { useCallback, useEffect, useState } from 'react';
import css from './start-menu-cont-apps-list.module.css';
import StartMenuIcon from '../../../start-menu-icon/start-menu-icon';
import { useSelector } from '../../../../services/types/hooks';

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
    PointerSensor,
    pointerWithin,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { snapCenterToCursor } from '@dnd-kit/modifiers';


const StartMenuContAppsList = ({showPined, activeIcon}:any) => {
    const allApplications = useSelector((store) => store.applications.data);
    const pinedApps = useSelector((store) => store.startMenu.pined);

    const showAllApplications = allApplications.sort((a:any, b:any) => {
        if (a.title > b.title) return 1;
        if (a.title < b.title) return -1;
        return 0;
    }).map((app:any) => app.id);

    // const applicationsList = allApplications;

    const list = showPined?pinedApps:showAllApplications;
    
    return(
        <SortableContext items={list} disabled={!showPined}>
            <div className={css.startMenuAppsContList}>
                {list.map((id:any, index:number) => 
                <StartMenuIcon id={id} index={index} key={id} />   
                )} 
            </div>
        </SortableContext>
    );
}

export default StartMenuContAppsList;