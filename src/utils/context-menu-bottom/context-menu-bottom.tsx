import React, { FC, useState } from 'react';
import css from './context-menu-bottom.module.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

type TContextMenuBottom = {
    children: string | JSX.Element,
    view: boolean;
};

const ContextMenuBottom:FC<TContextMenuBottom> = (props) => {
    const transitions = {
        enter: css.contextMenuBottomEnter,
        enterActive: css.contextMenuBottomEnterActive,
        exit: css.contextMenuBottomExit,
        exitActive: css.contextMenuBottomExitActive
    }

    return(
        <TransitionGroup component={null}>
            {props.view&&<CSSTransition classNames={transitions} timeout={200}>{props.children}</CSSTransition>}
        </TransitionGroup>
    );
}

export default ContextMenuBottom;