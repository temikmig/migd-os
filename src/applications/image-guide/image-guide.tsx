import React, { createContext, FC, useEffect, useMemo, useState } from 'react';
import css from './image-guide.module.css';
import Component from './component/component';
import { useSelector } from '../../services/types/hooks';
import { findNodeType } from '../../utils/config';

export const appIcon = 'apps-icons/image-guide.svg';

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

    const fileStructure = useSelector((store) => store.fileStructure.data);

    const allImages = findNodeType('image', fileStructure);

    useEffect(() => {
        if(strId==undefined) {
            setStrId(allImages[0]);
        }
    }, [])

    return(
        <imageGuideContext.Provider value={value}>
            <Component id={id} structureId={strId} />
        </imageGuideContext.Provider>
    )
}