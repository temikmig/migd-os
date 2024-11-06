import { FC, MouseEvent } from 'react';
import css from './nav-bar-context-menu.module.css';
import { useDispatch, useOutsideAlerter, useSelector } from '../../../services/types/hooks';
import { addNavBarUid, removeNavBar } from '../../../services/actions/nav-bar';
import uuid from 'react-uuid';
import { checkStartMenu } from '../../../services/actions/start-menu';
import { IOpenWindowItem } from '../../../services/reducers/open-windows';
import { INavBarItem } from '../../../services/reducers/nav-bar';
import { SETTINGS_APP } from '../../../utils/config';

type T = {
    appId: string, 
    handleOpenApp: () => void,
    setIsContextMenu: (IsContextMenu:boolean) => void
}

const NavBarContextMenu:FC<T> = ({appId, handleOpenApp, setIsContextMenu}) => {
    const dispatch = useDispatch();

    const allOpenedWindows = useSelector((store) => store.openedWindows.data);

    const openedWindows = allOpenedWindows.filter((item:IOpenWindowItem) => item.applicationId==appId).map((item:IOpenWindowItem) => item.id);

    const isPined = useSelector((store) => store.navBar.apps).some((app:INavBarItem) => app.id==appId);

    const handleCloseWindow = (e:MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        setIsContextMenu(false);
    }

    const handleAddNavBar = (e:MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        const uid = uuid();
        
        dispatch(addNavBarUid(appId, uid));
    }

    const handleRemoveNavBar = (e:MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        
        dispatch(removeNavBar(appId));
    }

    const handleOpenWindow = (e:MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        setIsContextMenu(false);
        dispatch(checkStartMenu(false));

        setTimeout(() => {
            handleOpenApp();
        }, 300);
    }

    const outsideAlerterRef = useOutsideAlerter(() => {
        setIsContextMenu(false);
        console.log('outContext')
    });

    return(
        <div className={css.startMenuContextMenuCont} ref={outsideAlerterRef}>
            <div className={css.startMenuContextMenu}>
                {!isPined?
                <div className={css.startMenuContextMenuGroup}>   
                    <div className={`${css.startMenuContextMenuItem}`} onClick={handleAddNavBar}>Закрепить приложение</div> 
                </div>
                :
                <div className={css.startMenuContextMenuGroup}>   
                    <div className={`${css.startMenuContextMenuItem}`} onClick={handleRemoveNavBar}>Открепить приложение</div> 
                </div>   
                }
                {appId!=SETTINGS_APP&&
                <div className={css.startMenuContextMenuGroup}>   
                    <div className={`${css.startMenuContextMenuItem}`} onClick={handleOpenWindow}>Открыть приложение</div> 
                </div> 
                }
                {/* {!sortable&&appId==FILEGUIDE_APP?
                <>
                    <div className={css.startMenuContextMenuGroup}>        
                        <div className={`${css.startMenuContextMenuItem}`}>Новое окно</div> 
                    </div>
                    <div className={css.startMenuContextMenuGroup}>        
                        <div className={`${css.startMenuContextMenuItem}`}>Окно &laquo;Первое окно&raquo;</div> 
                        <div className={`${css.startMenuContextMenuItem}`}>Окно &laquo;Второе окно&raquo;</div> 
                        <div className={`${css.startMenuContextMenuItem}`}>Окно &laquo;Третье окно&raquo;</div> 
                        <div className={`${css.startMenuContextMenuItem}`}>Окно &laquo;Четвертое окно&raquo;</div> 
                        <div className={`${css.startMenuContextMenuItem}`}>Окно &laquo;Пятое окно&raquo;</div> 
                    </div>
                    <div className={css.startMenuContextMenuGroup}>        
                        <div className={`${css.startMenuContextMenuItem}`}>Показать все окна</div> 
                        <div className={`${css.startMenuContextMenuItem}`}>Скрыть все окна</div> 
                    </div>
                </>
                :windowId?
                <div className={css.startMenuContextMenuGroup}>        
                    <div className={`${css.startMenuContextMenuItem}`} onClick={handleCloseWindow}>Закрыть</div>
                    <div className={`${css.startMenuContextMenuItem}`}>Скрыть</div> 
                </div>
                :
                <div className={css.startMenuContextMenuGroup}>        
                    <div className={`${css.startMenuContextMenuItem}`} onClick={handleOpenWindow}>Открыть</div>
                </div> 
                } */}
            </div>
        </div>
    )
}

export default NavBarContextMenu;