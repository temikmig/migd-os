import React, { createContext, FC, useEffect, useMemo, useState } from 'react';
import css from './audio-guide.module.css';
import Component from './component/component'

export const appIcon = '/apps-icons/audio-guide.svg';

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

export const audioGuideContext = createContext({
    strId: '',
    setStrId: (display:string) => {},
    background: '',
    setBackground: (display:string) => {}
});

export const App:FC<T> = ({id, structureId}) => {
    const [ strId, setStrId ] = useState(structureId);
    const [ background, setBackground ] = useState('2');

    useEffect(() => {
        setBackground(`#${Math.floor(Math.random() * 16777215).toString(16)}`);

        document.querySelectorAll('audio, video').forEach((element:any) => { 
            if(element.id!='audio-'+id) element.pause();
        }); 
    }, [strId]);

    const value = useMemo(() => ({
        strId, setStrId,
        background, setBackground
    }), [strId, background]);

    return(
        <audioGuideContext.Provider value={value}>
            <Component id={id} structureId={strId} />
        </audioGuideContext.Provider>
    )
}