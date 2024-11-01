import { FC, useMemo } from 'react';
import css from './start-menu-cont-apps-list-pined.module.css';
import StartMenuIcon from '../../../start-menu-icon/start-menu-icon';
import { useSelector } from '../../../../services/types/hooks';

import {
    useDroppable,
} from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import Sortable from '../../../../utils/sortable/sortable';
import { IStartMenuItem } from '../../../../services/reducers/start-menu';

type T = {
    view?: boolean,
    setShowPined: (showPined:boolean) => void
}

const StartMenuContAppsListPined:FC<T> = ({view, setShowPined}) => {
    const items = useSelector((store) => store.startMenu.pined);

    const sortableItems = useMemo(() => items.map((item:IStartMenuItem) => item.uid), [items]);

    const { isOver, setNodeRef } = useDroppable({
        id: "startMenuIconsCont",
        data: {
            accepts: ['startMenuIcons'],
        },
    });

    return(
        <SortableContext items={sortableItems}>
            <div className={css.startMenuAppsContList} ref={setNodeRef}>
                {items.map((item:IStartMenuItem) => 
                <Sortable type="startMenuIcon" id={item.id} uid={item.uid} key={item.uid} >
                    <StartMenuIcon setShowPined={setShowPined} id={item.id} key={item.uid}/>  
                </Sortable> 
                )} 
            </div>
        </SortableContext>
    );
}

export default StartMenuContAppsListPined;