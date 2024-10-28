import React, { useState } from 'react';
import css from './start-menu-cont-settings-settings.module.css';
import { CSSTransition } from 'react-transition-group';

const StartMenuContSettingsSettings = ({view}:any) => {
    return(
        <div className={css.settingsIcon}>Открыть настройки</div>
    );
}

export default StartMenuContSettingsSettings;