import React, { useState, MouseEvent, useEffect } from 'react';
import css from './start-menu-tile.module.css';
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

import { CSSTransition } from 'react-transition-group';
import cssCont from '../app/app.module.css';
import Application from '../../applications/application/application';
import { actionOpenApp } from '../../ui/ui';

const StartMenuTile = ({id, active, size, props, refs}:any) => {
    const contTransition = {
        enter: cssCont.contEnter,
        enterActive: cssCont.contEnterActive,
        exit: cssCont.contExit,
        exitActive: cssCont.contExitActive
    }

    const applications = useSelector((store) => store.applications.data);

    const { title, icon, name } = applications.find((app:any) => app.id==id);

    const dispatch = useDispatch();

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

    const сlickAction = (e:MouseEvent<HTMLDivElement>) => {
        dispatch(checkStartMenu(false));

        setTimeout(() => {
            dispatch(actionOpenApp(id, name, currentSizes, currentProps));
        }, 300)
    }

    return(
        <div className={`${css.startMenuTile} ${size==2&&css.startMenuTileBig}`} onClick={сlickAction}>
            {(CurrentTile)?<CurrentTile />:<div className={css.startMenuTileIcon}><img src={icon} /></div>}
        </div>
    )
}

export default StartMenuTile;