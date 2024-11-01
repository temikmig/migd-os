import { FC, MouseEvent, useState } from 'react';
import css from './nav-bar-icon.module.css';
import { TNavBarIcon } from '../../../utils/types';
import { useDispatch, useOutsideAlerter, useSelector } from '../../../services/types/hooks';
import * as appsList from '../../../applications';
import { checkStartMenu } from '../../../services/actions/start-menu';
import { actionOpenApp } from '../../../ui/ui';
import { defaultAppProps, defaultAppSizes, FILEGUIDE_APP } from '../../../utils/config';
import NavBarContextMenu from '../nav-bar-context-menu/nav-bar-context-menu';
import cssContextMenu from '../nav-bar-context-menu/nav-bar-context-menu.module.css';
import NavBarContextScreens from '../nav-bar-context-screens/nav-bar-context-screens';
import ContextMenuBottom from '../../../utils/context-menu-bottom/context-menu-bottom';
import { IApplicationItem } from '../../../services/reducers/applications';
import { IOpenWindowItem } from '../../../services/reducers/open-windows';


const NavBarIcon:FC<TNavBarIcon> = ({id, sortable}) => {
    const applications = useSelector((store) => store.applications.data);

    const { icon, name } = applications.find((app:IApplicationItem) => app.id==id);

    const openedWindows = useSelector((store) => store.openedWindows.data);

    const isOpenedApp:boolean = openedWindows.find((app:IOpenWindowItem) => app.applicationId==id);

    const isStartMenu:boolean = useSelector((store) => store.startMenu.opened);

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
        setIsContextMenu(false);

        if(isOpenedApp) {
            if(!isStartMenu) setShowScreens(true); else setIsContextMenu(true);
        } else {
            dispatch(checkStartMenu(false));
            
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

    const navBarContextTransitions = {
        enter: cssContextMenu.contextMenuEnter,
        enterActive: cssContextMenu.contextMenuEnterActive,
        exit: cssContextMenu.contextMenuExit,
        exitActive: cssContextMenu.contextMenuExitActive
    }

    const outsideAlerterRef = useOutsideAlerter(() => {
        setShowScreens(false);
        setIsContextMenu(false);
    });
    
    return(
        <div className={`${css.navBarIconCont} ${!sortable&&css.navBarIconNon} ${isOpenedApp&&css.navBarIconOpened}`} onClick={сlickAction} onContextMenu={contextMenuAction} ref={outsideAlerterRef}>
            <div className={css.navBarIcon}>
                <img src={sortable&&id==FILEGUIDE_APP?'/apps-icons/folder.svg':icon} />
            </div>
            <ContextMenuBottom view={showScreens}><NavBarContextScreens appId={id} setShowScreens={setShowScreens} /></ContextMenuBottom>
            <ContextMenuBottom view={isContextMenu}><NavBarContextMenu appId={id} handleOpenApp={handleOpenApp} setIsContextMenu={setIsContextMenu} /></ContextMenuBottom>
        </div>
    )
}

export default NavBarIcon;