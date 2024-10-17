import React, { useState, MouseEvent, useEffect } from 'react';
import css from './start-menu-icon.module.css';
import { useDraggable } from '@dnd-kit/core';
import { CSS as dndKitCSS } from '@dnd-kit/utilities';
import { defaultAppProps, defaultAppSizes, defaultIcons, DOCUMENT_HEIGHT, DOCUMENT_WIDTH, findNode } from '../../utils/config';

import * as appsList from '../../applications';
import { useDispatch, useOutsideAlerter, useSelector } from '../../services/types/hooks';
import { openWindow } from '../../services/actions/open-windows';
import uuid from 'react-uuid';
import { mergeRefs } from 'react-merge-refs';
import { checkStartMenu } from '../../services/actions/start-menu';
import { useSortable } from '@dnd-kit/sortable';
import { actionOpenApp } from '../../ui/ui';

const StartMenuIcon = ({id, active}:any) => {
    const applications = useSelector((store) => store.applications.data);

    const { title, icon, name } = applications.find((app:any) => app.id==id);

    const dispatch = useDispatch();

    const apps = appsList;

    let currentSizes:any, currentProps:any;

    try {
        currentProps = eval('apps.'+name+'.appProps');
        currentSizes = eval('apps.'+name+'.appSizes');
    } catch {
        currentProps = defaultAppProps;
        currentSizes = defaultAppSizes;
    }

    const сlickAction = (e:MouseEvent<HTMLDivElement>) => {
        dispatch(checkStartMenu(false));

        setTimeout(() => {
            dispatch(actionOpenApp(id, name, currentSizes, currentProps));
        }, 300)
    }

    return(
        <div className={css.startMenuItem} onClick={сlickAction}>
            <div className={css.startMenuItemIcon}><img src={icon} /></div>
            <div className={css.startMenuItemName}>{ title }</div>
        </div>
    )
}

export default StartMenuIcon;