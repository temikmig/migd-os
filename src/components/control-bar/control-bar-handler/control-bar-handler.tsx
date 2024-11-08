import React, { MouseEvent, useContext, useState } from 'react';
import css from './control-bar-handler.module.css';
import ControlWifi from '../control-wifi/control-wifi';
import ContextMenuBottom from '../../../utils/context-menu-bottom/context-menu-bottom';
import { useOutsideAlerter } from '../../../services/types/hooks';
import ControlCenter from '../control-center/control-center';
import { contextMenuContext } from '../../app/app';

const ControlBarHandler = () => {
    // const [ openedControlCenter, setOpenedControlCenter ] = useState(false);
    const { openedControl, setOpenedControl } = useContext(contextMenuContext);

    const handleClick = (e:MouseEvent<HTMLDivElement>) => {
        setOpenedControl(openedControl=='control-center'?'':'control-center');
    }

    const outsideAlerterRef = useOutsideAlerter(() => {
        if(openedControlView) setOpenedControl('');
    });

    const openedControlView = openedControl=='control-center';

    return(
        <div ref={outsideAlerterRef}>
        <div className={`${css.controlBarHandlerCont} ${openedControlView&&css.controlBarHandlerContActive}`} onClick={handleClick}>
            <svg width="20px" height="20px" viewBox="0,0,256,256">
                <g fill="#000">
                    <g transform="scale(10.66667,10.66667)">
                        <path d="M12,9.929l3.821,3.821c0.414,0.414 1.086,0.414 1.5,0v0c0.414,-0.414 0.414,-1.086 0,-1.5l-4.614,-4.614c-0.391,-0.391 -1.024,-0.391 -1.414,0l-4.614,4.614c-0.414,0.414 -0.414,1.086 0,1.5v0c0.414,0.414 1.086,0.414 1.5,0z"></path>
                    </g>
                </g>
            </svg>
        </div>
        <ContextMenuBottom view={openedControlView}><ControlCenter /></ContextMenuBottom>
        </div>
    )
}

export default ControlBarHandler;