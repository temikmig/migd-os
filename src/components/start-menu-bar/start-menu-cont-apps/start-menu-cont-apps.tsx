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
import StartMenuContAppsList from './start-menu-cont-apps-list/start-menu-cont-apps-list';


const StartMenuContApps = ({view, activeIcon}:any) => {
    const [ showPined, setShowPined ] = useState(true);
    
    // const applicationsList = showPined?allApplications.filter((app:any) => pinedApplications.includes(app.id)):allApplications.sort((a:any, b:any) => {
    //     if (a.title > b.title) return 1;
    //     if (a.title < b.title) return -1;
    //     return 0;
    // });

    // const [applicationsList, setApplicationsList ] = useState([]);

    

    // useEffect(() => {

    // }, []);

    //---
    /*

    const [items, setItems] = useState(Array.from({ length: 20 }, (_, i) => (i + 1).toString()));
    const [activeId, setActiveId] = useState<string | null>(null);
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    const handleDragStart = useCallback((event: DragStartEvent) => {
        setActiveId(event.active.id);
    }, []);
    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setItems((items) => {
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over!.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }

        setActiveId(null);
    }, []);
    const handleDragCancel = useCallback(() => {
        setActiveId(null);
    }, []);
*/
    //---



    return(
        <div className={css.startMenuAppsCont}>
            <div className={css.startMenuAppsSwitch}>
                <div className={`${css.startMenuAppsSwitchItem} ${showPined&&css.startMenuAppsSwitchItemActive}`} onClick={e => setShowPined(true)}>Закрепленные</div>
                <div className={`${css.startMenuAppsSwitchItem} ${!showPined&&css.startMenuAppsSwitchItemActive}`} onClick={e => setShowPined(false)}>Все</div>
            </div>
            <StartMenuContAppsList showPined={showPined} activeIcon={activeIcon} />
        </div>
    );
}

export default StartMenuContApps;