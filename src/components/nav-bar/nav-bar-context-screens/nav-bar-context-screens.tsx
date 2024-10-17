import React, { FC, useEffect, useRef } from 'react';
import css from './nav-bar-context-screens.module.css';
import { TNavBarIcon } from '../../../utils/types';
import { useDispatch, useSelector } from '../../../services/types/hooks';
import { closeWindow } from '../../../services/actions/open-windows';
import { actionOpenApp } from '../../../ui/ui';
import { FILEGUIDE_APP } from '../../../utils/config';
import { addNavBarUid, removeNavBar } from '../../../services/actions/nav-bar';
import uuid from 'react-uuid';
import { useScreenshot } from 'use-react-screenshot';
import NavBarContextMenuAppScreen from './nav-bar-context-menu-app-screen/nav-bar-context-menu-app-screen';

const NavBarContextScreens:any = ({appId, handleOpenApp, setShowScreens}:any) => {
    const dispatch = useDispatch();

    const applications = useSelector((store) => store.applications.data);

    const { title } = applications.find((app:any) => app.id==appId);

    const allOpenedWindows = useSelector((store) => store.openedWindows.data);

    

    const openedWindows = allOpenedWindows.filter((item:any) => item.applicationId==appId).map((item:any) => item.id);
    
    useEffect(() => {
        if(openedWindows.length==0) setShowScreens(false);
    }, [openedWindows]);

    return(
        <div className={css.startMenuContextMenuCont}>
            <div className={css.startMenuContextMenu}>
                <div className={css.navBarContextMenuScreensCont}>
                    {openedWindows.map((id:string) => <NavBarContextMenuAppScreen id={id} title={title} setShowScreens={setShowScreens} />)}
                </div>
            </div>
        </div>
    )
}

export default NavBarContextScreens;