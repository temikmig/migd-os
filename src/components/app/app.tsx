import { createContext, MouseEvent, useMemo, useState } from 'react';
import css from './app.module.css';
import ContentBar from '../content-bar/content-bar';
import BottomBar from '../bottom-bar/bottom-bar';
import { useContextMenu, useDispatch, useSelector } from '../../services/types/hooks';
import Background from '../background/background';
import StartMenuBar from '../start-menu-bar/start-menu-bar';

import {
    DndContext,
    DragOverlay,
    useSensor,
    useSensors,
    PointerSensor,
    pointerWithin,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { snapCenterToCursor } from '@dnd-kit/modifiers';
import { addStartMenuTilesUid, removeStartMenuTiles, repositionStartMenuPined, repositionStartMenuTiles } from '../../services/actions/start-menu';
import StartMenuIcon from '../start-menu-bar/start-menu-icon/start-menu-icon';
import StartMenuTile from '../start-menu-bar/start-menu-tile/start-menu-tile';
import uuid from 'react-uuid';
import NavBarIcon from '../nav-bar/nav-bar-icon/nav-bar-icon';
import { addNavBarUid, removeNavBar, repositionNavBar } from '../../services/actions/nav-bar';
import { INavBarItem } from '../../services/reducers/nav-bar';
import { IStartMenuItem } from '../../services/reducers/start-menu';
import BlurLayer from '../blur-layer/blur-layer';
import { ContextMenu, IContextMenuItems } from '../../utils/context-menu/context-menu';

export const contextMenuContext = createContext({
    contextMenuItems: [[{title: '', action: (e:any) => {}}]],
    setContextMenuItems: (contextMenuItems:IContextMenuItems[][]) => {},
    showContextMenu: (e:any) => {},
    hideContextMenu: () => {},
    openedControl: '',
    setOpenedControl: (openedControl:string) => {}
});

const App = () => {
    const dispatch = useDispatch();

    const isStartMenu = useSelector((store) => store.startMenu.opened);
    const isBlockScreen = false;//useSelector((store) => store.startMenu.opened);
    
    const backgroundBlurState = isStartMenu?2:isBlockScreen?3:1;

    const startMenuApplications = useSelector((store) => store.startMenu);

    const pinedApplications = startMenuApplications.pined;
    const tilesApplications = startMenuApplications.tiles;
    const navBarApplications = useSelector((store) => store.navBar.apps);

    const [activeDnd, setActiveDnd] = useState<{id: string, uid: string, type: string}>({id: '', uid: '', type: ''});
    const [startUid, setStartUid] = useState('');
    const [isDrag, setIsDrag] = useState(false);

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
        const includeTilesApplications = tilesApplications.map((item:IStartMenuItem) => item.id);
        const includeNavBarApplications = navBarApplications.map((item:INavBarItem) => item.id);

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

            const oldIndex = pinedApplications.map((item:IStartMenuItem) => item.uid).findIndex((id:string) => id === active.id);
            const newIndex = pinedApplications.map((item:IStartMenuItem) => item.uid).findIndex((id:string) => id === over.id);
            const repositionPinedApplications:Array<IStartMenuItem> = arrayMove(pinedApplications, oldIndex, newIndex);

            if(activeDnd.type!='startMenuTile'&&activeDnd.type!='navBarIcon') dispatch(repositionStartMenuPined(repositionPinedApplications));
        }

        if(type=='startMenuTile') {
            const { active, over } = ev;
            if (!over||active.id === over.id) {
                return;
            }

            if(over.id!='startMenuTilesCont'&&over.data.current.type!=type) setIsDrag(false);

            const oldIndex = tilesApplications.map((item:IStartMenuItem) => item.uid).findIndex((id:string) => id === active.id);
            const newIndex = tilesApplications.map((item:IStartMenuItem) => item.uid).findIndex((id:string) => id === over.id);
            const repositionTilesApplications:Array<IStartMenuItem> = arrayMove(tilesApplications, oldIndex, newIndex);

            dispatch(repositionStartMenuTiles(repositionTilesApplications));
        }

        if(type=='navBarIcon') {
            const { active, over } = ev;
            if (!over||active.id === over.id) {
                return;
            }

            if(over.id!='navBarCont') setIsDrag(false);
            if(over.id!='startMenuIconsCont'&&over.data.current.type!=type) setIsDrag(false);

            const oldIndex = navBarApplications.map((item:INavBarItem) => item.uid).findIndex((id:string) => id === active.id);
            const newIndex = navBarApplications.map((item:INavBarItem) => item.uid).findIndex((id:string) => id === over.id);
            const repositionNavBarApplications:Array<INavBarItem> = arrayMove(navBarApplications, oldIndex, newIndex);
                
            dispatch(repositionNavBar(repositionNavBarApplications));
        }
        
        setActiveDnd({id: '', uid: '', type: ''});
        setStartUid('');
    }

    const dndSensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
    );

    // const dropAnimation = isDrag?{
    //     duration: 500,
    //     easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
    // }:null;

    const { brightness } = useSelector((store) => store.system);
    const brightnessLevel = 30+(0.7*brightness.value);

    const { showContextMenu, hideContextMenu, contextMenuVisible, menuPosition } = useContextMenu();

    const [ contextMenuItems, setContextMenuItems ] = useState([[{title: '', action: (e:any) => {}}]]);
    const [ openedControl, setOpenedControl ] = useState('');

    const value = useMemo(() => ({
        contextMenuItems,
        setContextMenuItems,
        showContextMenu,
        hideContextMenu,
        openedControl,
        setOpenedControl
    }), [contextMenuItems, openedControl]);

    return(
        <contextMenuContext.Provider value={value}>
        <main id="main" style={{filter: 'brightness('+brightnessLevel+'%)'}} className={css.mainContainer} onContextMenu={(e:MouseEvent<HTMLDivElement>) => e.preventDefault()}>
            <DndContext collisionDetection={pointerWithin} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd} autoScroll={false} sensors={dndSensors}>
                <Background />
                <BlurLayer view={isStartMenu} />
                <ContentBar />
                <BottomBar />
                {isStartMenu&&<StartMenuBar view={isStartMenu} />}
                
                <DragOverlay modifiers={[snapCenterToCursor]}>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        {activeDnd.type=='startMenuIcon'?(<StartMenuIcon id={activeDnd.id} setShowPined={null} />):null}    
                        {activeDnd.type=='startMenuTile'?(<StartMenuTile id={activeDnd.id} />):null}    
                        {activeDnd.type=='navBarIcon'?(<NavBarIcon id={activeDnd.id} />):null}   
                    </div> 
                </DragOverlay>
            </DndContext>
            <ContextMenu visible={contextMenuVisible} position={menuPosition} contextMenuItems={contextMenuItems} hideContextMenu={hideContextMenu} />
        </main>
        </contextMenuContext.Provider>
    )
}

export default App;