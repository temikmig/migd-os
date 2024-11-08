import React, { FC, KeyboardEvent, useEffect, useState } from 'react';
import css from './start-menu-bar.module.css';
import { CSSTransition } from 'react-transition-group';
import cssCont from '../app/app.module.css';
import StartMenuContApps from './start-menu-cont-apps/start-menu-cont-apps';
import StartMenuContTiles from './start-menu-cont-tiles/start-menu-cont-tiles';
import StartMenuContSearch from './start-menu-cont-search/start-menu-cont-search';
import StartMenuContSettings from './start-menu-cont-settings/start-menu-cont-settings';

type T = {
    view: boolean
}

const StartMenuBar:FC<T> = ({view}) => {
    const contTransition = {
        enter: cssCont.contEnter,
        enterActive: cssCont.contEnterActive,
        exit: cssCont.contExit,
        exitActive: cssCont.contExitActive
    }

    const startMenuRef:any = React.createRef();

    const [ searchQuery, setSearchQuery ] = useState<string | null>(null);

    

    const handleSearch = (e:KeyboardEvent<HTMLInputElement>) => {
        const inputTarget = e.target as HTMLInputElement;

        const value = String(inputTarget.value);

        setSearchQuery(value);
    }

    useEffect(() => {
        setSearchQuery(null);
        return setSearchQuery(null);
    }, []);

    return(
        <CSSTransition nodeRef={startMenuRef} in={view} timeout={400} classNames={contTransition} unmountOnExit>
            <div className={css.startMenuCont} ref={startMenuRef}>
                <div className={css.startMenuContainer}>
                    <div className={css.startSearchBox}>
                        <input type="text" onKeyUp={handleSearch} placeholder="Поиск..."></input>
                    </div>
                    <div className={css.startMenuMainCont}>
                        <StartMenuContApps searchQuery={searchQuery} />
                        <StartMenuContTiles />
                    </div>
                    <StartMenuContSettings />
                </div>
            </div>
        </CSSTransition>
    );
}

export default StartMenuBar;