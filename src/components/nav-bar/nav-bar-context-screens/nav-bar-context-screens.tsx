import { FC, useEffect } from 'react';
import css from './nav-bar-context-screens.module.css';
import { useSelector } from '../../../services/types/hooks';
import NavBarContextMenuAppScreen from './nav-bar-context-menu-app-screen/nav-bar-context-menu-app-screen';
import { IApplicationItem } from '../../../services/reducers/applications';
import { IOpenWindowItem } from '../../../services/reducers/open-windows';

type T = {
    appId: string,
    setShowScreens: (showScreens:boolean) => void
}

const NavBarContextScreens:FC<T> = ({appId, setShowScreens}) => {
    const applications = useSelector((store) => store.applications.data);

    const { title } = applications.find((app:IApplicationItem) => app.id==appId);

    const allOpenedWindows = useSelector((store) => store.openedWindows.data);

    const openedWindows = allOpenedWindows.filter((item:IOpenWindowItem) => item.applicationId==appId).map((item:IOpenWindowItem) => item.id);
    
    useEffect(() => {
        if(openedWindows.length==0) setShowScreens(false);
    }, [openedWindows]);

    return(
        <div className={css.startMenuContextMenuCont}>
            <div className={css.startMenuContextMenu}>
                <div className={css.navBarContextMenuScreensCont}>
                    {openedWindows.map((id:string) => <NavBarContextMenuAppScreen id={id} key={id} title={title} setShowScreens={setShowScreens} />)}
                </div>
            </div>
        </div>
    )
}

export default NavBarContextScreens;