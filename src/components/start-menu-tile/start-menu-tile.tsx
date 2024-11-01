import { MouseEvent, FC } from 'react';
import css from './start-menu-tile.module.css';
import { defaultAppProps, defaultAppSizes } from '../../utils/config';

import * as appsList from '../../applications';
import { useContextMenu, useDispatch, useSelector } from '../../services/types/hooks';
import { checkStartMenu, removeStartMenuTiles } from '../../services/actions/start-menu';

import { actionOpenApp } from '../../ui/ui';
import { ContextMenu } from '../../utils/context-menu/context-menu';
import { IApplicationItem } from '../../services/reducers/applications';

type T = {
    id:string
}

const StartMenuTile:FC<T> = ({id}) => {
    const applications = useSelector((store) => store.applications.data);

    const { title, icon, name } = applications.find((app:IApplicationItem) => app.id==id);

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

    const { showContextMenu, hideContextMenu, contextMenuVisible, menuPosition } = useContextMenu();

    const handleRemoveStartMenuTiles = (e:MouseEvent<HTMLDivElement>) => {
        dispatch(removeStartMenuTiles(id))
    }
    
    const contextMenuItems = [
        [
            {title: 'Открыть '+title, action: сlickAction}
        ],
        [
            {title: 'Открепить из панели виджетов', action: handleRemoveStartMenuTiles}
        ]
    ];

    const handleContextMenu = (e:MouseEvent<HTMLDivElement>) => {
        showContextMenu(e);
    } 

    return(
        <>
        <div className={css.startMenuTile} onClick={сlickAction} onContextMenu={handleContextMenu}>
            {(CurrentTile)?<CurrentTile />:<div className={css.startMenuTileIcon}><img src={icon} /></div>}
        </div>
        <ContextMenu visible={contextMenuVisible} position={menuPosition} contextMenuItems={contextMenuItems} hideContextMenu={hideContextMenu} />
        </>
    )
}

export default StartMenuTile;