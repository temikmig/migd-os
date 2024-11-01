import React, { useMemo, useState } from 'react';
import css from './start-menu-cont-tiles.module.css';
import StartMenuTile from '../../start-menu-tile/start-menu-tile';
import { useSelector } from '../../../services/types/hooks';
import { SortableContext } from '@dnd-kit/sortable';
import { DragOverlay, useDroppable } from '@dnd-kit/core';
import { snapCenterToCursor } from '@dnd-kit/modifiers';
import Sortable from '../../../utils/sortable/sortable';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import cssTile from '../../start-menu-tile/start-menu-tile.module.css';
import { IStartMenuItem } from '../../../services/reducers/start-menu';

const StartMenuContTiles = () => {
    const items = useSelector((store) => store.startMenu.tiles);

    const sortableItems = useMemo(() => items.map((item:IStartMenuItem) => item.uid), [items]);

    const { isOver, setNodeRef } = useDroppable({
        id: "startMenuTilesCont",
        data: {
            accepts: ['startMenuIcons'],
        },
    });

    return(
        <SortableContext items={sortableItems}>
        <div className={css.startMenuTilesCont} ref={setNodeRef}>
            {items.map((item:IStartMenuItem) => {
            return (
            <Sortable type="startMenuTile" id={item.id} uid={item.uid} key={item.uid}>
                <StartMenuTile id={item.id} />
            </Sortable>
            )
            })}
        </div>
        </SortableContext>
    );
}

export default StartMenuContTiles;