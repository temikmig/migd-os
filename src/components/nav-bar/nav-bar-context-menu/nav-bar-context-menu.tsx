import React, { FC, useEffect, useRef } from 'react';
import css from './nav-bar-context-menu.module.css';
import { TNavBarIcon } from '../../../utils/types';
import { useDispatch, useOutsideAlerter, useSelector } from '../../../services/types/hooks';
import { closeWindow } from '../../../services/actions/open-windows';
import { actionOpenApp } from '../../../ui/ui';
import { FILEGUIDE_APP } from '../../../utils/config';
import { addNavBarUid, removeNavBar } from '../../../services/actions/nav-bar';
import uuid from 'react-uuid';
import { useScreenshot } from 'use-react-screenshot';
import { checkStartMenu } from '../../../services/actions/start-menu';

const NavBarContextMenu:any = ({appId, handleOpenApp, setIsContextMenu}:any) => {
    const dispatch = useDispatch();

    const allOpenedWindows = useSelector((store) => store.openedWindows.data);

    const openedWindows = allOpenedWindows.filter((item:any) => item.applicationId==appId).map((item:any) => item.id);

    const isPined = useSelector((store) => store.navBar.apps).some((app:any) => app.id==appId);

    const handleCloseWindow = (e:any) => {
        e.stopPropagation();

        setIsContextMenu(false);

        // dispatch(closeWindow(windowId));
    }

    const handleAddNavBar = (e:any) => {
        e.stopPropagation();

        const uid = uuid();
        
        dispatch(addNavBarUid(appId, uid));
    }

    const handleRemoveNavBar = (e:any) => {
        e.stopPropagation();
        
        dispatch(removeNavBar(appId));
    }

    const handleOpenWindow = (e:any) => {
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
                <div className={css.startMenuContextMenuGroup}>   
                    <div className={`${css.startMenuContextMenuItem}`} onClick={handleOpenWindow}>Открыть приложение</div> 
                </div> 
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