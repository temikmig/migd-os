import React, { useCallback, useEffect, useMemo, useState } from 'react';
import css from './start-menu-cont-apps-list-pined.module.css';
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

const StartMenuContAppsListPined = ({view, setShowPined}:any) => {
    const items = useSelector((store) => store.startMenu.pined);

    const sortableItems = useMemo(() => items.map((item:any) => item.uid), [items]);

    const { isOver, setNodeRef } = useDroppable({
        id: "startMenuIconsCont",
        data: {
            accepts: ['startMenuIcons'],
        },
    });

    return(
        <SortableContext items={sortableItems}>
            <div className={css.startMenuAppsContList} ref={setNodeRef}>
                {items.map((item:any, index:number) => 
                <Sortable type="startMenuIcon" id={item.id} uid={item.uid} key={item.uid} >
                    <StartMenuIcon setShowPined={setShowPined} id={item.id} index={index}  key={item.uid}/>  
                </Sortable> 
                )} 
            </div>
        </SortableContext>
    );
}

export default StartMenuContAppsListPined;