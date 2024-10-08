import React, { useState } from 'react';
import css from './start-menu-cont-settings.module.css';
import { CSSTransition } from 'react-transition-group';
import StartMenuContSettingsSettings from './start-menu-cont-settings-settings/start-menu-cont-settings-settings';
import StartMenuContSettingsShutdown from './start-menu-cont-settings-shutdown/start-menu-cont-settings-shutdown';

const StartMenuContSettings = ({view}:any) => {
    return(
        <div className={css.startSettings}>
            <StartMenuContSettingsSettings />
            <StartMenuContSettingsShutdown />
        </div>
    );
}

export default StartMenuContSettings;