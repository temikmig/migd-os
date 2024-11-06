import { createRef, FC, MouseEvent, useEffect, useRef, useState } from 'react';
import css from './context-menu.module.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useOutsideAlerter } from '../../services/types/hooks';
import { mergeRefs } from 'react-merge-refs';
import uuid from 'react-uuid';
import { createPortal } from 'react-dom';

type TContextMenu = {
    visible?: boolean;
    position: {
        x: number,
        y: number
    };
    contextMenuItems: IContextMenuItems[][];
    hideContextMenu: () => void,
    nodeRef?: any
}

interface IContextMenuItems {
    title: string, 
    action: (e:MouseEvent<HTMLDivElement>) => void
}

export const ContextMenuCont:FC<TContextMenu> = ({position, contextMenuItems, hideContextMenu, nodeRef}) => {
    const outsideAlerterRef = useOutsideAlerter(() => {
        hideContextMenu();
    });

    const contextMenuRef = useRef<any>(null);

    const [ positionLeft, setPositionLeft ] = useState(position.x); 
    const [ positionTop, setPositionTop ] = useState(position.y); 
    
    useEffect(() => {
        if(contextMenuRef.current) {
            const current = contextMenuRef.current.getBoundingClientRect();
            const parent = contextMenuRef.current.parentNode.getBoundingClientRect();

            if(current.bottom>parent.bottom-70) setPositionTop(current.top-current.bottom+parent.bottom-70);
            if(current.right>parent.right) setPositionLeft(current.left-current.width);
        }
    }, []);

    const style = {
        top: positionTop,
        left: positionLeft
    };

    return(
        <div ref={mergeRefs([contextMenuRef, outsideAlerterRef, nodeRef])} style={style} className={css.contextMenu}>
            {contextMenuItems.map((group, index) => 
                <div className={css.contextMenuGroup} key={index}>
                    {group.map((item, index) => <div key={index} className={css.contextMenuItem} onMouseDown={hideContextMenu} onClick={item.action}>{item.title}</div>)}
                </div>
            )}
        </div>
    )
}


export const ContextMenu:FC<TContextMenu> = ({visible, position, contextMenuItems, hideContextMenu}) => {
    const transitions = {
        enter: css.contextMenuEnter,
        enterActive: css.contextMenuEnterActive,
        exit: css.contextMenuExit,
        exitActive: css.contextMenuExitActive
    }

    const uid = uuid();

    const mainContainer:any = document.querySelector('#main');

    const itemRef:any = useRef(null);

    return(
        <>
        {mainContainer&&createPortal(
        <TransitionGroup component={null}>
            {visible&&
            <CSSTransition nodeRef={itemRef} key={uid} classNames={transitions} timeout={200}>
                <ContextMenuCont nodeRef={itemRef} position={position} contextMenuItems={contextMenuItems} hideContextMenu={hideContextMenu} />
            </CSSTransition>}
        </TransitionGroup>,
        mainContainer )}
        </>
    );
}