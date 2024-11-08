import React, { createContext, FC, useMemo, useState } from 'react';
import css from './file-guide.module.css';
import Component from './component/component';

export const appIcon = '/apps-icons/folder.svg';

export const appProps = {
    canExpand: true,
    canCollapse: true,
    canResize: true,
    minWidth: 600,
    minHeight: 300,
}

export const appSizes = {
    width: 700,
    height: 350
}

type T = {
    id: string,
    structureId: string
}

export const fileGuideContext = createContext({
    winId: '',
    strId: '',
    setStrId: (display:string) => {},
    backList: [],
    setBackList: (backList:any) => {},
    forwardList: [],
    setForwardList: (forwardList:any) => {},
    activeIcon: '',
    setActiveIcon: (activeIcon:string) => {}
});

export const App:FC<T> = ({id, structureId}) => {
    const winId = id;
    const [ strId, setStrId ] = useState(structureId);
    const [ backList, setBackList ] = useState([]);
    const [ forwardList, setForwardList ] = useState([]);
    const [ activeIcon, setActiveIcon ] = useState('');

    const value = useMemo(() => ({
        winId,
        strId, setStrId,
        backList, setBackList,
        forwardList, setForwardList,
        activeIcon, setActiveIcon
    }), [strId, backList, forwardList, activeIcon, winId]);

    return(
        <fileGuideContext.Provider value={value}>
            <Component id={id} structureId={strId} />
        </fileGuideContext.Provider>
    )
}