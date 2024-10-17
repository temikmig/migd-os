import { useSortable } from '@dnd-kit/sortable';
import React, { useState, MouseEvent, useEffect } from 'react';
import { CSS as dndKitCSS } from '@dnd-kit/utilities';

const Sortable = (props:any) => {
    const {
        isDragging,
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition, 
        node
    } = useSortable({ 
        id: props.uid, 
        data: {
            type: props.type,
            title: props.id
        },
        transition: {
            duration: 500,
            easing: "cubic-bezier(0.25, 1, 0.5, 1)",
        },
        animateLayoutChanges: () => false 
        
    });

    // console.log(transition);

    const style = {
        left: undefined,
        top: undefined,
        transform: transform?dndKitCSS.Transform.toString(transform):'',
        // transition: 'transform 400ms ease',
        transition: transition,
        opacity: isDragging?'0.2':'1',
        // width: isDragging&&props.type=='startMenuTile'?0:undefined
    };

    return(
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>{props.children}</div>
    )
}

export default Sortable;