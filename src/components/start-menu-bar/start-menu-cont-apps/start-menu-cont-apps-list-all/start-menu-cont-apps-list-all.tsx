import React, { FC, useCallback, useEffect, useState } from 'react';
import css from './start-menu-cont-apps-list-all.module.css';
import StartMenuIcon from '../../../start-menu-icon/start-menu-icon';
import { useSelector } from '../../../../services/types/hooks';

import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { snapCenterToCursor } from '@dnd-kit/modifiers';
import Sortable from '../../../../utils/sortable/sortable';
import { IApplicationItem } from '../../../../services/reducers/applications';

type T = {
    view?: boolean,
    setShowPined: (showPined:boolean) => void
}

const StartMenuContAppsListAll:FC<T> = ({view, setShowPined}:any) => {
    const allApplications = useSelector((store) => store.applications.data).filter((app:IApplicationItem) => app.list==true);

    const items = allApplications.sort((a:IApplicationItem, b:IApplicationItem) => {
        if (a.title > b.title) return 1;
        if (a.title < b.title) return -1;
        return 0;
    });
    
    return(      
        <SortableContext items={items.map((item:IApplicationItem) => item.id)}>
            <div className={css.startMenuAppsContList}>
                {items.map((item:IApplicationItem) => 
                <Sortable type="startMenuIcon" id={item.id} uid={item.id} key={item.id} >
                    <StartMenuIcon setShowPined={setShowPined} id={item.id} />  
                </Sortable>
                )} 
            </div>
        </SortableContext>
    );
}

export default StartMenuContAppsListAll;