import React, { useState } from 'react';
import css from './start-menu-cont-tiles.module.css';
import StartMenuTile from '../../start-menu-tile/start-menu-tile';
import { useSelector } from '../../../services/types/hooks';
import { SortableContext } from '@dnd-kit/sortable';
import { DragOverlay, useDroppable } from '@dnd-kit/core';
import { snapCenterToCursor } from '@dnd-kit/modifiers';
import Sortable from '../../../utils/sortable/sortable';

const StartMenuContTiles = () => {
    const items = useSelector((store) => store.startMenu.tiles);

    const { isOver, setNodeRef } = useDroppable({
        id: "startMenuTilesCont",
        data: {
            accepts: ['startMenuIcons'],
        },
    });

    return(
        <SortableContext items={items.map((item:any) => item.uid)}>
        <div className={css.startMenuTilesCont} ref={setNodeRef}>
            {items.map((item:any, index:number) => 
            <Sortable type="startMenuTile" id={item.id} uid={item.uid} key={item.uid} >
                <StartMenuTile id={item.id} size={1} />
            </Sortable>
            )}
        </div>
        </SortableContext>
    );
}

export default StartMenuContTiles;