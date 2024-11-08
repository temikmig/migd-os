import React, { createContext, FC, useMemo, useState } from 'react';
import css from './file-guide.module.css';
import { useDroppable } from '@dnd-kit/core';
import Component from './component/component';

export const appIcon = 'apps-icons/settings.svg';

export const appProps = {
    canExpand: true,
    canCollapse: true,
    canResize: true,
    minWidth: 500,
    minHeight: 200,
}

export const appSizes = {
    width: 900,
    height: 400
}

export const settingsContext = createContext({
    activeItem: 1,
    setActiveItem: (activeItem:number) => {}
});

export const App:FC = ({id}:any) => {
    const [ activeItem, setActiveItem ] = useState(1);

    const value = useMemo(() => ({
        activeItem, setActiveItem
    }), [activeItem]);
    
    return(
        <settingsContext.Provider value={value}>
            <Component />
        </settingsContext.Provider>
    )
}