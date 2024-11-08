import { useSortable } from '@dnd-kit/sortable';
import { FC } from 'react';
import { CSS as dndKitCSS } from '@dnd-kit/utilities';
import { useDraggable } from '@dnd-kit/core';
import { useSelector } from '../../services/types/hooks';
import { IDesktopIconItem } from '../../services/reducers/desktop-icons';

type TDraggable = {
    children: string | JSX.Element,
    uid: string,
    type: string,
    id: string,
    top?: number,
    left?: number
};

const Draggable:FC<TDraggable> = (props) => {
    const {
        isDragging,
        attributes,
        listeners,
        setNodeRef,
    } = useDraggable({ 
        id: props.uid, 
        data: {
            type: props.type,
            title: props.id
        }
    });

    // const desktopIconsPosition = useSelector((store) => store.desktopIconPosition.data);

    // const iconPosition = desktopIconsPosition.find((icon:IDesktopIconItem) => icon.id==props.id);

    const style = {
        left: undefined,
        top: undefined,
        // transform: transform?dndKitCSS.Transform.toString(transform):undefined,
        // transition: 'transform 400ms ease',
        opacity: isDragging?'0.2':'1',
        gridRowStart: props.top?props.top:undefined,
        gridColumnStart: props. left?props.left:undefined
    };

    return(
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>{props.children}</div>
    )
}

export default Draggable;