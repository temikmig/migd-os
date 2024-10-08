import React, { useRef, useState } from 'react';
import css from './app.module.css';
import ContentBar from '../content-bar/content-bar';
import BottomBar from '../bottom-bar/bottom-bar';
import { useDispatch, useSelector } from '../../services/types/hooks';
import Background from '../background/background';
import StartMenuBar from '../start-menu-bar/start-menu-bar';

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
import { repositionPinedStartMenu } from '../../services/actions/start-menu';
import StartMenuIcon from '../start-menu-icon/start-menu-icon';
import StartMenuTile from '../start-menu-tile/start-menu-tile';

const App = () => {
    const dispatch = useDispatch();
    
    const isStartMenu = useSelector((store) => store.startMenu.opened);
    const isBlockScreen = false;//useSelector((store) => store.startMenu.opened);
    
    const backgroundBlurState = isStartMenu?2:isBlockScreen?3:1;

    const pinedApplications = useSelector((store) => store.startMenu.pined);

    const [activeIcon, setActiveIcon]:any = useState(null);
    const [activeTile, setActiveTile]:any = useState(null);

    function handleDragStart(ev:any) {
        const type = ev.active.data.current.type;

        if(type=='startMenuIcon') {
            setActiveIcon(ev.active.id);
        }

        if(type=='startMenuTile') {
            setActiveTile(ev.active.id);
        }
    }

    function handleDragEnd(ev:any) { 
        const type = ev.active.data.current.type;

        if(type=='startMenuIcon') {
            setActiveIcon(null);

            const { active, over } = ev;
            if (!over||active.id === over.id) {
                return;
            }

            const oldIndex = pinedApplications.findIndex((id:string) => id === active.id);
            const newIndex = pinedApplications.findIndex((id:string) => id === over.id);
            const repositionPinedApplications = arrayMove(pinedApplications, oldIndex, newIndex);

            dispatch(repositionPinedStartMenu(repositionPinedApplications));
        }

        if(type=='startMenuTile') {
            setActiveTile(null);
        }
    }

    const dndSensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
    );

    return(
        <main className={css.mainContainer}>
            <DndContext collisionDetection={pointerWithin} onDragStart={handleDragStart} onDragEnd={handleDragEnd} autoScroll={false} sensors={dndSensors}>
                <Background blurState={backgroundBlurState} />
                <StartMenuBar view={isStartMenu} activeIcon={activeIcon} activeTile={activeTile} />
                <DragOverlay modifiers={[snapCenterToCursor]}>
                {activeIcon?(<StartMenuIcon id={activeIcon} active/>):null}    
                {activeTile?(<StartMenuTile id={activeTile} active/>):null}    
                </DragOverlay>
                <ContentBar view={!isStartMenu} />
                <BottomBar />
            </DndContext>
        </main>
    )
}

export default App;