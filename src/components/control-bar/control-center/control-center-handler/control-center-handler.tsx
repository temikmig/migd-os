import React, { FC, MouseEvent, ReactElement } from 'react';
import css from './control-center-handler.module.css';

type T = {
    active: boolean, 
    handleClick: (e:MouseEvent<HTMLDivElement>) => void,
    children: ReactElement,
    title: string
}

const ControlCenterHandler:FC<T> = (props) => {
    return(
        <div className={`${css.controlCenterHandler} ${props.active&&css.controlCenterHandlerActive}`} onClick={props.handleClick}>
            <div className={css.controlCenterHandlerIcon}>{props.children}</div>
            <div className={css.controlCenterHandlerTitle}>{props.title}</div>
        </div>
    );
}

export default ControlCenterHandler;