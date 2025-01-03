import { FC, useMemo } from 'react';
import css from './nav-bar.module.css';
import NavBarIcon from './nav-bar-icon/nav-bar-icon';
import { useDispatch, useSelector } from '../../services/types/hooks';
import { checkStartMenu } from '../../services/actions/start-menu';
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import NavBarIconMain from './nav-bar-icon-main/nav-bar-icon-main';
import Sortable from '../../utils/sortable/sortable';
import { useDroppable } from '@dnd-kit/core';
import { DELETE_BIN_APP, FILEGUIDE_APP } from '../../utils/config';
import { INavBarItem } from '../../services/reducers/nav-bar';
import { IOpenWindowItem } from '../../services/reducers/open-windows';

const NavBar:FC = () => {
    const dispatch = useDispatch();
    const isStartMenu = useSelector((store) => store.startMenu.opened);

    const items = useSelector((store) => store.navBar.apps);

    const sortableItems = useMemo(() => items.map((item:INavBarItem) => item.uid), [items]);

    const openedApps = useSelector((store) => store.openedWindows.data).map((window:IOpenWindowItem) => window.applicationId);
    const uniqOpenedApps = openedApps.filter((appId:string, index:number) => openedApps.indexOf(appId) === index);

    const openedAppsBar = uniqOpenedApps.filter((appId:string) => !items.map((item:IOpenWindowItem) => item.id).includes(appId)).filter((appId:string) => appId!=DELETE_BIN_APP).filter((appId:string) => appId!=FILEGUIDE_APP);

    const handleStartMenu = (e:any) => {
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
            <div className={`${css.navBarMain} ${isStartMenu&&css.navBarMainActive}`} onClick={handleStartMenu}>
                <NavBarIconMain />
            </div>
            <div className={css.navBar} ref={setNodeRef}>
                <NavBarIcon id={FILEGUIDE_APP} sortable={false} />
                <SortableContext items={sortableItems} strategy={horizontalListSortingStrategy}>
                    <div className={css.navBarSortable}>
                    {items.map((item:INavBarItem) => 
                    <Sortable type="navBarIcon" id={item.id} uid={item.uid} key={item.uid}>
                        <NavBarIcon id={item.id} sortable/>
                    </Sortable>
                    )}
                    </div>
                </SortableContext>
                {openedApps.length>0&&
                <div className={css.navBarOpened}>
                    {openedAppsBar.map((appId:string) => <NavBarIcon id={appId} key={appId} sortable/>)}
                </div>
                }
                <NavBarIcon id={DELETE_BIN_APP} sortable={false}/>
            </div>
        </div>
    )
}

export default NavBar;