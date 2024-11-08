import { useSortable } from '@dnd-kit/sortable';
import { FC } from 'react';
import { CSS as dndKitCSS } from '@dnd-kit/utilities';

type TSortable = {
    children: string | JSX.Element,
    uid: string,
    type: string,
    id: string
};

const Sortable:FC<TSortable> = (props) => {
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

    const style = {
        left: undefined,
        top: undefined,
        transform: transform?dndKitCSS.Transform.toString(transform):undefined,
        // transition: 'transform 400ms ease',
        transition: transition,
        opacity: isDragging?'0.2':'1',
    };

    return(
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>{props.children}</div>
    )
}

export default Sortable;