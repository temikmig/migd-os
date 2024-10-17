import React from 'react';
import css from './nav-bar.module.css';
import NavBarIcon from './nav-bar-icon/nav-bar-icon';
import apps from '../../data/apps.json';
import { useDispatch, useSelector } from '../../services/types/hooks';
import { checkStartMenu } from '../../services/actions/start-menu';
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import NavBarIconMain from './nav-bar-icon-main/nav-bar-icon-main';
import Sortable from '../../utils/sortable/sortable';
import { useDroppable } from '@dnd-kit/core';
import { DELETE_BIN_APP, FILEGUIDE_APP } from '../../utils/config';

const NavBar = () => {
    const dispatch = useDispatch();
    const isStartMenu = useSelector((store) => store.startMenu.opened);

    const items = useSelector((store) => store.navBar.apps);

    const openedApps = useSelector((store) => store.openedWindows.data).map((window:any) => window.applicationId);
    const uniqOpenedApps = openedApps.filter((appId:string, index:number) => openedApps.indexOf(appId) === index);

    const openedAppsBar = uniqOpenedApps.filter((appId:string) => !items.map((item:any) => item.id).includes(appId)).filter((appId:string) => appId!=DELETE_BIN_APP).filter((appId:string) => appId!=FILEGUIDE_APP);
    console.log(openedAppsBar);
    const handleStartMenu = () => {
        dispatch(checkStartMenu(!isStartMenu));
    }

    const { isOver, setNodeRef } = useDroppable({
        id: "navBarCont",
        data: {
            accepts: ['navBarIcon'],
        },
    });

    return(
        <div className={css.navBarCont}>
            <div className={css.navBarMain}>
                <NavBarIconMain handleClick={handleStartMenu} />
            </div>
            <div className={css.navBar}  ref={setNodeRef}>
                <NavBarIcon id={FILEGUIDE_APP} sortable={false} />
                <SortableContext items={items.map((item:any) => item.uid)} strategy={horizontalListSortingStrategy}>
                    <div className={css.navBarSortable}>
                    {items.map((item:any) => 
                    <Sortable type="navBarIcon" id={item.id} uid={item.uid} key={item.uid}>
                        <NavBarIcon id={item.id} sortable/>
                    </Sortable>
                    )}
                    </div>
                </SortableContext>
                {openedApps.length>0&&
                <div className={css.navBarOpened}>
                    {openedAppsBar.map((appId:string) => <NavBarIcon id={appId} sortable/>)}
                </div>
                }
                <NavBarIcon id={DELETE_BIN_APP} sortable={false}/>
            </div>
        </div>
    )
}

export default NavBar;