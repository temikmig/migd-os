import { FC, useRef, useState } from 'react';
import css from './start-menu-cont-apps.module.css';
import { useSelector } from '../../../services/types/hooks';

import StartMenuContAppsListAll from './start-menu-cont-apps-list-all/start-menu-cont-apps-list-all';
import StartMenuContAppsListPined from './start-menu-cont-apps-list-pined/start-menu-cont-apps-list-pined';
import { SwitchTransition } from 'react-transition-group';
import { CSSTransition } from 'react-transition-group';

type T = {
    searchQuery: string|null
}

const StartMenuContApps:FC<T> = ({searchQuery}) => {
    const pined = useSelector((store) => store.startMenu.pined);

    const [ showPined, setShowPined ] = useState((pined.length>0?true:false));

    const contTransition = {
        enter: showPined?css.contEnter:css.contEnterL,
        enterActive: css.contEnterActive,
        exit: css.contExit,
        exitActive: showPined?css.contExitActive:css.contExitActiveL
    }

    const pinedAppsRef = useRef(null);
    const allAppsRef = useRef(null);
    const nodeRef = showPined ? pinedAppsRef : allAppsRef;
    
    return(
        <div className={css.startMenuAppsCont}>
            {!searchQuery&&
            <div className={css.startMenuAppsSwitch}>
                {pined.length>0&&<div className={`${css.startMenuAppsSwitchItem} ${showPined&&css.startMenuAppsSwitchItemActive}`} onClick={e => setShowPined(true)}>Закрепленные</div>}
                <div className={`${css.startMenuAppsSwitchItem} ${!showPined&&css.startMenuAppsSwitchItemActive}`} onClick={e => setShowPined(false)}>Все приложения</div>
            </div>}
            <SwitchTransition>
                <CSSTransition timeout={300} classNames={contTransition} nodeRef={nodeRef} key={showPined?'pined':'all'}>
                    <div ref={nodeRef}>
                        {searchQuery?<StartMenuContAppsListAll searchQuery={searchQuery} setShowPined={setShowPined} />
                        :(showPined?<StartMenuContAppsListPined setShowPined={setShowPined} />:<StartMenuContAppsListAll setShowPined={setShowPined} />)}
                    </div>
                </CSSTransition>
            </SwitchTransition>
        </div>
    );
}

export default StartMenuContApps;