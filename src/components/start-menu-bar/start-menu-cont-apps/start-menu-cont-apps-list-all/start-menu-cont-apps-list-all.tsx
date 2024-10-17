import React, { useCallback, useEffect, useState } from 'react';
import css from './start-menu-cont-apps-list-all.module.css';
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
    useDroppable,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { snapCenterToCursor } from '@dnd-kit/modifiers';
import Sortable from '../../../../utils/sortable/sortable';

const StartMenuContAppsListAll = ({view}:any) => {
    const allApplications = useSelector((store) => store.applications.data).filter((app:any) => app.list==true);
    // console.log(allApplications);
    const items = allApplications.sort((a:any, b:any) => {
        if (a.title > b.title) return 1;
        if (a.title < b.title) return -1;
        return 0;
    });
    
    return(      
        <SortableContext items={items.map((item:any) => item.uid)}>
            <div className={css.startMenuAppsContList}>
                {items.map((item:any, index:number) => 
                <Sortable type="startMenuIcon" id={item.id} uid={item.id} key={item.id} >
                    <StartMenuIcon id={item.id} index={index}/>  
                </Sortable>
                )} 
            </div>
        </SortableContext>
    );
}

export default StartMenuContAppsListAll;