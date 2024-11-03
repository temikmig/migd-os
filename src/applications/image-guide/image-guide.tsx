import React, { createContext, FC, useMemo, useState } from 'react';
import css from './image-guide.module.css';
import Component from './component/component';

export const appIcon = '/apps-icons/image-guide.svg';

export const appProps = {
    canExpand: true,
    canCollapse: true,
    canResize: true,
    minWidth: 300,
    minHeight: 200,
}

export const appSizes = {
    width: 700,
    height: 350
}

type T = {
    id: string,
    structureId: string
}

export const imageGuideContext = createContext({
    strId: '',
    setStrId: (display:string) => {}
});

export const App:FC<T> = ({id, structureId}) => {
    const [ strId, setStrId ] = useState(structureId);

    const value = useMemo(() => ({
        strId, setStrId
    }), [strId]);

    return(
        <imageGuideContext.Provider value={value}>
            <Component id={id} structureId={strId} />
        </imageGuideContext.Provider>
    )
}