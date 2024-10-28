import React, { FC, useEffect, useRef, useState } from 'react';
import css from './context-menu.module.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useOutsideAlerter } from '../../services/types/hooks';
import { mergeRefs } from 'react-merge-refs';
import uuid from 'react-uuid';
import { createPortal } from 'react-dom';

export const ContextMenuCont:any = ({position, contextMenuItems, hideContextMenu}:any) => {
    const outsideAlerterRef = useOutsideAlerter(() => {
        hideContextMenu();
    });

    const contextMenuRef:any = useRef(null);

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
        <div ref={mergeRefs([contextMenuRef, outsideAlerterRef])} style={style} className={css.contextMenu}>
            {contextMenuItems.map((group:any) => 
                <div className={css.contextMenuGroup}>
                    {group.map((item:any) => <div className={css.contextMenuItem} onMouseUp={hideContextMenu} onClick={item.action}>{item.title}</div>)}
                </div>
            )}
        </div>
    )
}

export const ContextMenu:any = ({visible, position, contextMenuItems, hideContextMenu}:any) => {
    const transitions = {
        enter: css.contextMenuEnter,
        enterActive: css.contextMenuEnterActive,
        exit: css.contextMenuExit,
        exitActive: css.contextMenuExitActive
    }

    const uid = uuid();

    const mainContainer:any = document.querySelector('#main');
    
    return(
        <>
        {mainContainer&&createPortal(
        <TransitionGroup component={null}>
            {visible&&
            <CSSTransition key={uid} classNames={transitions} timeout={200}>
                <ContextMenuCont position={position} contextMenuItems={contextMenuItems} hideContextMenu={hideContextMenu} />
            </CSSTransition>}
        </TransitionGroup>,
        mainContainer )}
        </>
    );
}