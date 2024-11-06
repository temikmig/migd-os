import { FC } from 'react';
import css from './settings-pages.module.css';

type T = {

}

export const SettingsPageSupport:FC<T> = () => {
    return(
        <h1 className={css.settingsHeader}>О проекте</h1>
    );
}