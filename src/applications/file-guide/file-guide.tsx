import React, { FC } from 'react';
import css from './file-guide.module.css';
import { useDroppable } from '@dnd-kit/core';

// export const appIcon = '/apps-icons/file-guide.svg';

export const appProps = {
    canExpand: true,
    canCollapse: true,
    canResize: true
}

export const appSizes = {
    width: 300,
    height: 200
}

export const App:FC = ({id}:any) => {
    const { isOver, setNodeRef } = useDroppable({
        id: "fileGuide",
        data: {
            accepts: ['fileGuideIcon'],
        },
    });
      
    //   console.log(isOver);
    return(
        <>
            <div ref={setNodeRef} className={css.fileGuideCont}>{isOver?'true':'false'}</div>
        </>
    )
}