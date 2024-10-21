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

const StartMenuContTiles = () => {
    const items = useSelector((store) => store.startMenu.tiles);

    const sortableItems = useMemo(() => items.map((item:any) => item.uid), [items]);

    const { isOver, setNodeRef } = useDroppable({
        id: "startMenuTilesCont",
        data: {
            accepts: ['startMenuIcons'],
        },
    });

    const winTransition = {
        enter: cssTile.startMenuItemTileEnter,
        enterActive: cssTile.startMenuItemTileEnterActive,
        exit: cssTile.startMenuItemTileExit,
        exitActive: cssTile.startMenuItemTileExitActive
      }

    return(
        <SortableContext items={sortableItems}>
        <div className={css.startMenuTilesCont} ref={setNodeRef}>
            {/* <TransitionGroup component={null}> */}
            {items.map((item:any, index:number) => {
                // const itemRef:any = React.createRef();
            return (
            <Sortable type="startMenuTile" id={item.id} uid={item.uid} key={item.uid}>
                {/* <CSSTransition nodeRef={itemRef} classNames={winTransition} timeout={300}> */}
                <StartMenuTile id={item.id} size={1} />
                {/* </CSSTransition> */}
            </Sortable>
            )
            })}
            {/* </TransitionGroup> */}
        </div>
        </SortableContext>
    );
}

export default StartMenuContTiles;