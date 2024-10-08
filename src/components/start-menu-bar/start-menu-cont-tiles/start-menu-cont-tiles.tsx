import React, { useState } from 'react';
import css from './start-menu-cont-tiles.module.css';
import StartMenuTile from '../../start-menu-tile/start-menu-tile';
import { useSelector } from '../../../services/types/hooks';
import { SortableContext } from '@dnd-kit/sortable';
import { DragOverlay } from '@dnd-kit/core';
import { snapCenterToCursor } from '@dnd-kit/modifiers';

const StartMenuContTiles = ({view, activeTile}:any) => {
    const tilesApps = useSelector((store) => store.startMenu.tiles);
    const tilesAppsList = tilesApps.map((item:any) => item.id);

    return(
        <SortableContext items={tilesAppsList}>
        <div className={css.startMenuTilesCont}>
            {tilesAppsList.map((id:string, index:number) => 
            <StartMenuTile id={id} />
            )}
        </div>
        </SortableContext>
    );
}

export default StartMenuContTiles;