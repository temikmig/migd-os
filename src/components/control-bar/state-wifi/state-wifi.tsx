import React, { FC, useState, MouseEvent, useContext } from 'react';
import css from './state-wifi.module.css';
import cssCont from './../control-bar.module.css';
import ControlWifi from '../control-wifi/control-wifi';
import { useOutsideAlerter, useSelector } from '../../../services/types/hooks';
import ContextMenuBottom from '../../../utils/context-menu-bottom/context-menu-bottom';
import { IEnabledControl } from '../../../services/reducers/system';
import { contextMenuContext } from '../../app/app';

type T = {
    wifi: IEnabledControl
}

const StateWifi:FC<T> = ({wifi}) => {
    const { openedControl, setOpenedControl } = useContext(contextMenuContext);

    const handleClick = (e:MouseEvent<HTMLDivElement>) => {
        setOpenedControl(openedControl=='control-wifi'?'':'control-wifi');
    }

    const outsideAlerterRef = useOutsideAlerter(() => {
        if(openedControlView) setOpenedControl('');
    });

    const openedControlView = openedControl=='control-wifi';

    return(
        <div className={cssCont.controlBarIconContainer} ref={outsideAlerterRef}>
            <div className={`${cssCont.controlBarIconCont} ${openedControlView&&cssCont.controlBarIconContActive}`} onClick={handleClick}>
            {
            wifi.enabled?<svg width="18px" height="18px" viewBox="0,0,256,256"><g fill="#000"><g transform="scale(5.12,5.12)"><path d="M25,7c-9.05859,0 -17.66016,3.47266 -24.21875,9.77344l-0.71875,0.69141l5.53125,5.76563l0.72656,-0.69141c5.05859,-4.85937 11.69531,-7.53906 18.67969,-7.53906c6.98438,0 13.62109,2.67969 18.68359,7.53906l0.72266,0.69141l5.53516,-5.76562l-0.72266,-0.69531c-6.55859,-6.30078 -15.16016,-9.76953 -24.21875,-9.76953zM25,19c-5.95312,0 -11.60547,2.28125 -15.91406,6.42188l-0.72266,0.69141l5.55859,5.79297l0.72266,-0.69531c2.82031,-2.71484 6.5,-4.21094 10.35547,-4.21094c3.85547,0 7.53516,1.49609 10.35547,4.21094l0.72266,0.69531l5.55859,-5.79297l-0.71875,-0.69141c-4.3125,-4.14062 -9.96484,-6.42187 -15.91797,-6.42187zM25,31c-2.84375,0 -5.54687,1.08984 -7.60937,3.07422l-0.71875,0.69141l8.32813,8.67578l8.32813,-8.67578l-0.71875,-0.69141c-2.0625,-1.98437 -4.76562,-3.07422 -7.60937,-3.07422z"></path></g></g></svg>
            :<svg width="18px" height="18px" viewBox="0,0,256,256"><g fill="#00000050"><g transform="scale(5.12,5.12)"><path d="M4.99219,3.99219c-0.41016,0 -0.77344,0.24609 -0.92969,0.62109c-0.15234,0.37891 -0.0625,0.80859 0.23047,1.09375l5.01953,5.01953l6.05859,6.05469l3.14453,3.15234l7.09766,7.09766l18.67969,18.67578c0.25,0.26172 0.625,0.36719 0.97266,0.27344c0.35156,-0.08984 0.625,-0.36328 0.71484,-0.71484c0.09375,-0.34766 -0.01172,-0.72266 -0.27344,-0.97266l-16.71484,-16.71484c2.35547,0.65625 4.54297,1.87891 6.36719,3.63281l0.71875,0.69531l5.5625,-5.79297l-0.72266,-0.69141c-4.3125,-4.14062 -9.96484,-6.42187 -15.91797,-6.42187c-1.41797,0 -2.81641,0.14453 -4.1875,0.39844l-3.32422,-3.32422c2.41406,-0.70312 4.9375,-1.07422 7.51172,-1.07422c6.98438,0 13.62109,2.67969 18.68359,7.53906l0.72266,0.69141l5.53516,-5.76562l-0.72266,-0.69531c-6.55859,-6.30078 -15.16016,-9.76953 -24.21875,-9.76953c-4.79297,0 -9.45312,0.98047 -13.75391,2.82813l-5.53906,-5.53516c-0.1875,-0.19531 -0.44531,-0.30078 -0.71484,-0.30078zM7.47656,11.71875c-2.39844,1.39453 -4.64844,3.08594 -6.69531,5.05469l-0.71875,0.69141l5.53516,5.76953l0.72266,-0.69531c2.10938,-2.02734 4.5,-3.67187 7.07422,-4.90234zM16.42188,20.66016c-2.69531,1.08984 -5.18359,2.69141 -7.33594,4.76172l-0.72266,0.69141l5.55859,5.79297l0.72266,-0.69531c2.30859,-2.22266 5.19531,-3.60937 8.27734,-4.04687zM25,31c-2.84375,0 -5.54687,1.08984 -7.60937,3.07422l-0.71875,0.69141l8.32813,8.67578l6.95313,-7.24219l-5.01562,-5.02344c-0.63672,-0.11328 -1.28125,-0.17578 -1.9375,-0.17578z"></path></g></g></svg>
            }
            </div>
            <ContextMenuBottom view={openedControlView}><ControlWifi /></ContextMenuBottom>
        </div>
    );
}

export default StateWifi;