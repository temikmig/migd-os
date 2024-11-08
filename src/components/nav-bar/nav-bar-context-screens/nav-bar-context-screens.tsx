import { FC, useContext, useEffect } from 'react';
import css from './nav-bar-context-screens.module.css';
import { useSelector } from '../../../services/types/hooks';
import NavBarContextMenuAppScreen from './nav-bar-context-menu-app-screen/nav-bar-context-menu-app-screen';
import { IApplicationItem } from '../../../services/reducers/applications';
import { IOpenWindowItem } from '../../../services/reducers/open-windows';
import { contextMenuContext } from '../../app/app';

type T = {
    appId: string
}

const NavBarContextScreens:FC<T> = ({appId}) => {
    const applications = useSelector((store) => store.applications.data);

    const { title } = applications.find((app:IApplicationItem) => app.id==appId);

    const allOpenedWindows = useSelector((store) => store.openedWindows.data);

    const openedWindows = allOpenedWindows.filter((item:IOpenWindowItem) => item.applicationId==appId).map((item:IOpenWindowItem) => item.id);
    
    const { openedControl, setOpenedControl } = useContext(contextMenuContext);

    useEffect(() => {
        if(openedWindows.length==0) setOpenedControl('');
    }, [openedWindows]);

    return(
        <div className={css.startMenuContextMenuCont}>
            <div className={css.startMenuContextMenu}>
                <div className={css.navBarContextMenuScreensCont}>
                    {openedWindows.map((id:string) => <NavBarContextMenuAppScreen id={id} key={id} title={title} />)}
                </div>
            </div>
        </div>
    )
}

export default NavBarContextScreens;