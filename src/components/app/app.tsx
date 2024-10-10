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
import { addStartMenuTiles, addStartMenuTilesUid, removeStartMenuTiles, removeStartMenuTilesUid, repositionStartMenuPined, repositionStartMenuTiles } from '../../services/actions/start-menu';
import StartMenuIcon from '../start-menu-icon/start-menu-icon';
import StartMenuTile from '../start-menu-tile/start-menu-tile';
import Sortable from '../../utils/sortable/sortable';
import uuid from 'react-uuid';

const App = () => {
    const dispatch = useDispatch();
    
    const isStartMenu = useSelector((store) => store.startMenu.opened);
    const isBlockScreen = false;//useSelector((store) => store.startMenu.opened);
    
    const backgroundBlurState = isStartMenu?2:isBlockScreen?3:1;

    const startMenuApplications = useSelector((store) => store.startMenu);

    const pinedApplications = startMenuApplications.pined;
    const tilesApplications = startMenuApplications.tiles;

    const [activeDnd, setActiveDnd]:any = useState({id: null, uid: null, type: null});
    const [startUid, setStartUid]:any = useState(null);

    function handleDragStart(ev:any) {
        // console.log(ev);

        const id = ev.active.data.current.title;
        const type = ev.active.data.current.type;

        setStartUid(uuid());

        setActiveDnd({id: id, uid: ev.active.id, type: type});

        

        
    }

    function handleDragOver(ev:any) {
        console.log(startUid);
        console.log(activeDnd);

        const id = ev.active.data.current.title;
        const type = ev.active.data.current.type;

        

        // console.log(tilesApplications.includes(ev.active.id))

       
        
        if(type=='startMenuIcon') {
            
            if(ev.collisions.map((item:any) => item.id).includes('startMenuTilesCont')) {
                // console.log('on')
                
                if(!tilesApplications.map((item:any) => item.id).includes(id)) {
                    dispatch(addStartMenuTilesUid(id, startUid));
                    setActiveDnd({id: id, uid: startUid, type: 'startMenuTile'});
                }
            } else {
                setActiveDnd({id: id, uid: ev.active.id, type: 'startMenuIcon'});
                
                if(activeDnd.type=='startMenuTile') {
                    dispatch(removeStartMenuTiles(id));

                    // setActiveDnd({id: id, uid: startUid, type: 'startMenuTile'});
                    // console.log('off')
                    // if(tilesApplications.map((item:any) => item.uid).includes(ev.active.uid)) dispatch(removeStartMenuTilesUid(ev.active.id)); 
                }
            }
        }

        if(type=='startMenuTile') {
            setActiveDnd({id: id, uid: ev.active.id, type: type});
            if(!ev.collisions.map((item:any) => item.id).includes('startMenuTilesCont')) {
                if(tilesApplications.map((item:any) => item.uid).includes(ev.active.id)) dispatch(removeStartMenuTiles(id));
                 
            }
        }

        if(!id&&ev.collisions.map((item:any) => item.id).includes('startMenuTilesCont')&&activeDnd.type=='startMenuTile'&&!tilesApplications.map((item:any) => item.id).includes(id)) dispatch(addStartMenuTilesUid(activeDnd.id, ev.active.id));
    }

    function handleDragEnd(ev:any) { 
        const type = ev.active.data.current.type;

        if(type=='startMenuIcon') {
            const { active, over } = ev;
            if (!over||active.id === over.id) {
                return;
            }

            const oldIndex = pinedApplications.map((item:any) => item.uid).findIndex((id:string) => id === active.id);
            const newIndex = pinedApplications.map((item:any) => item.uid).findIndex((id:string) => id === over.id);
            const repositionPinedApplications = arrayMove(pinedApplications, oldIndex, newIndex);

            if(activeDnd.type!='startMenuTile') dispatch(repositionStartMenuPined(repositionPinedApplications));
        }

        if(type=='startMenuTile') {
            const { active, over } = ev;
            if (!over||active.id === over.id) {
                return;
            }

            const oldIndex = tilesApplications.map((item:any) => item.uid).findIndex((id:string) => id === active.id);
            const newIndex = tilesApplications.map((item:any) => item.uid).findIndex((id:string) => id === over.id);
            const repositionTilesApplications = arrayMove(tilesApplications, oldIndex, newIndex);

            dispatch(repositionStartMenuTiles(repositionTilesApplications));
        }

        setStartUid(null);
        setActiveDnd({id: null, uid: null, type: null});
    }

    const dndSensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
    );

    return(
        <main className={css.mainContainer}>
            <DndContext collisionDetection={pointerWithin} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd} autoScroll={false} sensors={dndSensors}>
                <Background blurState={backgroundBlurState} />
                <StartMenuBar view={isStartMenu} />
                <DragOverlay >
                {activeDnd.type=='startMenuIcon'?(<StartMenuIcon id={activeDnd.id} active/>):null}    
                {activeDnd.type=='startMenuTile'?(<StartMenuTile id={activeDnd.id} active/>):null}    
                </DragOverlay>
                <ContentBar view={!isStartMenu} />
                <BottomBar />
            </DndContext>
        </main>
    )
}

export default App;