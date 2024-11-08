import React, { createContext, FC, useEffect, useMemo, useState } from 'react';
import css from './video-guide.module.css';
import Component from './component/component'
import { useSelector } from '../../services/types/hooks';
import { findNodeType } from '../../utils/config';

export const appIcon = 'apps-icons/video-guide.svg';

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

export const videoGuideContext = createContext({
    strId: '',
    setStrId: (display:string) => {}
});

export const App:FC<T> = ({id, structureId}) => {
    const [ strId, setStrId ] = useState(structureId);

    useEffect(() => {
        document.querySelectorAll('audio, video').forEach((element:any) => { 
            if(element.id!='video-'+id) element.pause();
        }); 
    }, [strId]);

    const value = useMemo(() => ({
        strId, setStrId
    }), [strId]);

    const fileStructure = useSelector((store) => store.fileStructure.data);

    const allVideo = findNodeType('video', fileStructure);

    useEffect(() => {
        if(strId==undefined) {
            setStrId(allVideo[0]);
        }
    }, []);

    return(
        <videoGuideContext.Provider value={value}>
            <Component id={id} structureId={strId} />
        </videoGuideContext.Provider>
    )
}