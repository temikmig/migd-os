import { FC } from 'react';
import css from './start-menu-cont-settings.module.css';
import StartMenuContSettingsSettings from './start-menu-cont-settings-settings/start-menu-cont-settings-settings';

type T = {
    view?: boolean
}

const StartMenuContSettings:FC<T> = ({view}) => {
    return(
        <div className={css.startSettings}>
            <StartMenuContSettingsSettings />
        </div>
    );
}

export default StartMenuContSettings;