import React, { useState } from 'react';
import css from './start-menu-context-menu.module.css';
import { CSSTransition } from 'react-transition-group';

const StartMenuContextMenu = () => {
    return(
        <div className={css.startMenuContextMenu}>
            <div className={`${css.startMenuContextMenuItem} ${css.startMenuContextMenuItemLock}`}>Заблокировать</div>
            <div className={`${css.startMenuContextMenuItem} ${css.startMenuContextMenuItemReboot}`}>Перезагрузить</div>
            <div className={`${css.startMenuContextMenuItem} ${css.startMenuContextMenuItemShutdown}`}>Выключить</div>
        </div>
    );
}

export default StartMenuContextMenu;