import React, { useState } from 'react';
import css from './start-menu-cont-settings-shutdown.module.css';
import cssContextMenu from '../../start-menu-context-menu/start-menu-context-menu.module.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import StartMenuContextMenu from '../../start-menu-context-menu/start-menu-context-menu';
import { useOutsideAlerter } from '../../../../services/types/hooks';

const StartMenuContSettingsShutdown = ({view}:any) => {
    const [ isContextMenuActive, setIsContextMenuActive ] = useState(false);

    const handleContextMenu = (e:any) => {
        setIsContextMenuActive(!isContextMenuActive);
    }

    const startMenuContextTransitions = {
        enter: cssContextMenu.contextMenuEnter,
        enterActive: cssContextMenu.contextMenuEnterActive,
        exit: cssContextMenu.contextMenuExit,
        exitActive: cssContextMenu.contextMenuExitActive
    }

    const outsideAlerterRef = useOutsideAlerter(() => {
        isContextMenuActive&&setIsContextMenuActive(false);
    });

    return(
        <>
            <div className={css.shutdownIcon} onClick={handleContextMenu} ref={outsideAlerterRef}>
                <TransitionGroup component={null}>
                    {isContextMenuActive&&
                    <CSSTransition classNames={startMenuContextTransitions} timeout={200}>
                        <StartMenuContextMenu />
                    </CSSTransition>
                    }
                </TransitionGroup>
            </div>
        </>
    );
}

export default StartMenuContSettingsShutdown;