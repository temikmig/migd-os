import React, { FC, useState } from 'react';
import css from './control-center-handler.module.css';

const ControlCenterHandler:any = (props:any) => {
    return(
        <div className={`${css.controlCenterHandler} ${props.active&&css.controlCenterHandlerActive}`} onClick={props.handleClick}>
            <div className={css.controlCenterHandlerIcon}>{props.children}</div>
            <div className={css.controlCenterHandlerTitle}>{props.title}</div>
        </div>
    );
}

export default ControlCenterHandler;