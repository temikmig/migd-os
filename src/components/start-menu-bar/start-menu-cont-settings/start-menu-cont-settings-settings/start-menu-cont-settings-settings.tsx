import React, { useState, MouseEvent } from 'react';
import css from './start-menu-cont-settings-settings.module.css';
import { CSSTransition } from 'react-transition-group';
import { useDispatch, useSelector } from '../../../../services/types/hooks';
import { checkStartMenu } from '../../../../services/actions/start-menu';
import { toActiveWindow } from '../../../../services/actions/open-windows';
import { actionOpenApp } from '../../../../ui/ui';
import { defaultAppProps, defaultAppSizes, SETTINGS_APP } from '../../../../utils/config';

import * as appsList from '../../../../applications';
import { IApplicationItem } from '../../../../services/reducers/applications';

const StartMenuContSettingsSettings = ({view}:any) => {
    const openedWindows = useSelector((store) => store.openedWindows.data);
    const applications = useSelector((store) => store.applications.data);

    const { title, icon, name } = applications.find((app:IApplicationItem) => app.id==SETTINGS_APP);

    const apps = appsList;

    let currentSizes:any, currentProps:any, CurrentTile:any;

    try {
        currentProps = eval('apps.'+name+'.appProps');
        currentSizes = eval('apps.'+name+'.appSizes');
        CurrentTile = eval('apps.'+name+'.AppTile');
    } catch {
        currentProps = defaultAppProps;
        currentSizes = defaultAppSizes;
        CurrentTile = false;
    }
    
    const dispatch = useDispatch();

    const handleOpenSettings = (e:MouseEvent<HTMLDivElement>) => {
        dispatch(checkStartMenu(false));

        const openedWindow = openedWindows.find((window:any) => window.applicationId==SETTINGS_APP);
        
        if(openedWindow) {
            dispatch(toActiveWindow(openedWindow.id));
        } else {
            setTimeout(() => {
                dispatch(actionOpenApp(SETTINGS_APP, name, currentSizes, currentProps));
            }, 300);
        }
    }

    return(
        <div className={css.settingsIcon} onClick={handleOpenSettings}>Открыть настройки</div>
    );
}

export default StartMenuContSettingsSettings;