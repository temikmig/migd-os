import React, { FC, MouseEvent, useRef, useState } from 'react';
import css from './nav-bar-icon.module.css';
import { TNavBarIcon } from '../../../utils/types';
import { useDispatch, useOutsideAlerter, useSelector } from '../../../services/types/hooks';
import * as appsList from '../../../applications';
import { checkStartMenu } from '../../../services/actions/start-menu';
import { actionOpenApp } from '../../../ui/ui';
import { defaultAppProps, defaultAppSizes, defaultIcons, FILEGUIDE_APP } from '../../../utils/config';
import NavBarContextMenu from '../nav-bar-context-menu/nav-bar-context-menu';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import cssContextMenu from '../nav-bar-context-menu/nav-bar-context-menu.module.css';
import { createPortal } from 'react-dom';
import { toActiveWindow } from '../../../services/actions/open-windows';
import NavBarContextScreens from '../nav-bar-context-screens/nav-bar-context-screens';


const NavBarIcon:FC<TNavBarIcon> = ({id, sortable, isPined}) => {
    const applications = useSelector((store) => store.applications.data);

    const { icon, name } = applications.find((app:any) => app.id==id);

    const openedWindows = useSelector((store) => store.openedWindows.data);

    const isOpenedApp = openedWindows.find((app:any) => app.applicationId==id);

    const isStartMenu = useSelector((store) => store.startMenu.opened);

    const [ isContextMenu, setIsContextMenu ] = useState(false);
    const [ showScreens, setShowScreens ] = useState(false);
    
    const dispatch = useDispatch();

    const apps = appsList;

    let currentSizes:any, currentProps:any;

    try {
        currentProps = eval('apps.'+name+'.appProps');
        currentSizes = eval('apps.'+name+'.appSizes');
    } catch {
        currentProps = defaultAppProps;
        currentSizes = defaultAppSizes;
    }

    const handleOpenApp = () => {
        dispatch(actionOpenApp(id, name, currentSizes, currentProps));
    }

    const сlickAction = (e:MouseEvent<HTMLDivElement>) => {
        dispatch(checkStartMenu(false));

        setIsContextMenu(false);

        if(isOpenedApp) {
            if(!isStartMenu) setShowScreens(true);
        } else {
            setTimeout(() => {
                handleOpenApp();
            }, 300);
        }
    }

    const contextMenuAction = (e:MouseEvent<HTMLDivElement>) => {
        setIsContextMenu(true);
        setShowScreens(false);
        e.preventDefault();
    }

    // const  = (id=='00000000-0000-0000-0000-000000000002'?true:false);
    // console.log(id);

    const navBarContextTransitions = {
        enter: cssContextMenu.contextMenuEnter,
        enterActive: cssContextMenu.contextMenuEnterActive,
        exit: cssContextMenu.contextMenuExit,
        exitActive: cssContextMenu.contextMenuExitActive
    }

    const outsideAlerterRef = useOutsideAlerter(() => {
        isContextMenu&&setIsContextMenu(false);
        showScreens&&setShowScreens(false);
    });
    
    return(
        <div className={`${css.navBarIconCont} ${!sortable&&css.navBarIconNon} ${isOpenedApp&&css.navBarIconOpened}`} onClick={сlickAction} onContextMenu={contextMenuAction} ref={outsideAlerterRef}>
            <div className={css.navBarIcon}>
                <img src={sortable&&id==FILEGUIDE_APP?'/apps-icons/folder.svg':icon} />
            </div>
            <TransitionGroup component={null}>
            {showScreens&&
            <CSSTransition classNames={navBarContextTransitions} timeout={200}>
                <NavBarContextScreens appId={id} setShowScreens={setShowScreens} />
            </CSSTransition>
            }
            {isContextMenu&&
            <CSSTransition classNames={navBarContextTransitions} timeout={200}>
                <NavBarContextMenu appId={id} handleOpenApp={handleOpenApp} setIsContextMenu={setIsContextMenu} />
            </CSSTransition>
            }
            </TransitionGroup>
        </div>
    )
}

export default NavBarIcon;