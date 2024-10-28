import React, { useRef, useState } from 'react';
import css from './app.module.css';
import ContentBar from '../content-bar/content-bar';
import BottomBar from '../bottom-bar/bottom-bar';
import { useDispatch, useOutsideAlerter, useSelector } from '../../services/types/hooks';
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
import { addStartMenuTiles, addStartMenuTilesUid, checkStartMenu, removeStartMenuTiles, removeStartMenuTilesUid, repositionStartMenuPined, repositionStartMenuTiles } from '../../services/actions/start-menu';
import StartMenuIcon from '../start-menu-icon/start-menu-icon';
import StartMenuTile from '../start-menu-tile/start-menu-tile';
import Sortable from '../../utils/sortable/sortable';
import uuid from 'react-uuid';
import NavBarIcon from '../nav-bar/nav-bar-icon/nav-bar-icon';
import { addNavBarUid, removeNavBar, repositionNavBar } from '../../services/actions/nav-bar';
import { adjustScale } from '@dnd-kit/core/dist/utilities';

const App = () => {
    const dispatch = useDispatch();

    const isStartMenu = useSelector((store) => store.startMenu.opened);
    const isBlockScreen = false;//useSelector((store) => store.startMenu.opened);
    
    const backgroundBlurState = isStartMenu?2:isBlockScreen?3:1;

    const startMenuApplications = useSelector((store) => store.startMenu);

    const pinedApplications = startMenuApplications.pined;
    const tilesApplications = startMenuApplications.tiles;
    const navBarApplications = useSelector((store) => store.navBar.apps);

    const [activeDnd, setActiveDnd]:any = useState({id: null, uid: null, type: null});
    const [startUid, setStartUid]:any = useState(null);
    const [isDrag, setIsDrag]:any = useState(false);

    function handleDragStart(ev:any) {
        const id = ev.active.data.current.title;
        const type = ev.active.data.current.type;


        setIsDrag(true);
        setStartUid(uuid());
        setActiveDnd({id: id, uid: ev.active.id, type: type});
    }

    function handleDragOver(ev:any) {
        const id = ev.active.data.current.title;
        const type = ev.active.data.current.type;

        
        const collision = ev.collisions.map((item:any) => item.id);
        const includeTilesApplications = tilesApplications.map((item:any) => item.id);
        const includeNavBarApplications = navBarApplications.map((item:any) => item.id);

        if(type=='startMenuIcon') {
            if(collision.includes('startMenuTilesCont')||collision.includes('navBarCont')) {
                if(!includeTilesApplications.includes(id)&&collision.includes('startMenuTilesCont')) {
                    setActiveDnd({id: id, uid: startUid, type: 'startMenuTile'});
                    dispatch(addStartMenuTilesUid(id, startUid));
                } 
                
                if(!includeNavBarApplications.includes(id)&&collision.includes('navBarCont')) {
                    dispatch(addNavBarUid(id, startUid));
                    setActiveDnd({id: id, uid: startUid, type: 'navBarIcon'});
                }
            } else {
                // console.log('active = '+activeDnd.type);
                setActiveDnd({id: id, uid: ev.active.id, type: 'startMenuIcon'});
                if(includeTilesApplications.includes(id)&&activeDnd.type!='startMenuIcon'&&activeDnd.type!='navBarIcon') dispatch(removeStartMenuTiles(id));
                if(includeNavBarApplications.includes(id)&&activeDnd.type=='navBarIcon') dispatch(removeNavBar(id));
            }
        }

        if(type=='startMenuTile') {
            setActiveDnd({id: id, uid: ev.active.id, type: type});
            if(!collision.includes('startMenuTilesCont')) {
                if(includeTilesApplications.includes(id)) dispatch(removeStartMenuTiles(id));
            }
        }

        if(type=='navBarIcon') {
            setActiveDnd({id: id, uid: ev.active.id, type: type});
            if(!collision.includes('navBarCont')) {
                if(includeNavBarApplications.includes(id)) dispatch(removeNavBar(id));
            }
        }

        if(!id&&collision.includes('startMenuTilesCont')&&activeDnd.type=='startMenuTile'&&!includeTilesApplications.includes(id)) dispatch(addStartMenuTilesUid(activeDnd.id, ev.active.id));
        if(!id&&collision.includes('navBarCont')&&activeDnd.type=='navBarIcon'&&!includeNavBarApplications.includes(id)) dispatch(addNavBarUid(activeDnd.id, ev.active.id));
    }

    function handleDragEnd(ev:any) { 
        const type = ev.active.data.current.type;

        if(type=='startMenuIcon') {
            const { active, over } = ev;
            if (!over||active.id === over.id||pinedApplications.length==0) {
                return;
            }

            if(over.id!='startMenuIconsCont'&&over.data.current.type!=type) setIsDrag(false);

            const oldIndex = pinedApplications.map((item:any) => item.uid).findIndex((id:string) => id === active.id);
            const newIndex = pinedApplications.map((item:any) => item.uid).findIndex((id:string) => id === over.id);
            const repositionPinedApplications = arrayMove(pinedApplications, oldIndex, newIndex);

            if(activeDnd.type!='startMenuTile'&&activeDnd.type!='navBarIcon') dispatch(repositionStartMenuPined(repositionPinedApplications));
        }

        if(type=='startMenuTile') {
            const { active, over } = ev;
            if (!over||active.id === over.id) {
                return;
            }

            if(over.id!='startMenuTilesCont'&&over.data.current.type!=type) setIsDrag(false);

            const oldIndex = tilesApplications.map((item:any) => item.uid).findIndex((id:string) => id === active.id);
            const newIndex = tilesApplications.map((item:any) => item.uid).findIndex((id:string) => id === over.id);
            const repositionTilesApplications = arrayMove(tilesApplications, oldIndex, newIndex);

            dispatch(repositionStartMenuTiles(repositionTilesApplications));
        }

        if(type=='navBarIcon') {
            const { active, over } = ev;
            if (!over||active.id === over.id) {
                return;
            }

            if(over.id!='navBarCont') setIsDrag(false);
            if(over.id!='startMenuIconsCont'&&over.data.current.type!=type) setIsDrag(false);

            const oldIndex = navBarApplications.map((item:any) => item.uid).findIndex((id:string) => id === active.id);
            const newIndex = navBarApplications.map((item:any) => item.uid).findIndex((id:string) => id === over.id);
            const repositionNavBarApplications = arrayMove(navBarApplications, oldIndex, newIndex);

            dispatch(repositionNavBar(repositionNavBarApplications));
        }
        
        setActiveDnd({id: null, uid: null, type: null});
        setStartUid(null);
    }

    const dndSensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
    );

    // const dropAnimation = isDrag?{
    //     duration: 500,
    //     easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
    // }:null;

    const brightnessLevel = useSelector((store) => store.system.brightness);
    const brightness = 30+(0.7*brightnessLevel);


    return(
        <main id="main" style={{filter: 'brightness('+brightness+'%)'}} className={css.mainContainer} onContextMenu={(e:any) => e.preventDefault()}>
            <DndContext collisionDetection={pointerWithin} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd} autoScroll={false} sensors={dndSensors}>
                <Background blurState={backgroundBlurState} />
                <StartMenuBar view={isStartMenu} />
                <ContentBar view={!isStartMenu} />
                <BottomBar />
                <DragOverlay  modifiers={[snapCenterToCursor]}>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        {activeDnd.type=='startMenuIcon'?(<StartMenuIcon id={activeDnd.id} />):null}    
                        {activeDnd.type=='startMenuTile'?(<StartMenuTile id={activeDnd.id} />):null}    
                        {activeDnd.type=='navBarIcon'?(<NavBarIcon id={activeDnd.id} />):null}   
                    </div> 
                </DragOverlay>
            </DndContext>
        </main>
    )
}

export default App;