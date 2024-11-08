import React, { FC, useState, MouseEvent, useContext } from 'react';
import css from './state-wifi.module.css';
import cssCont from './../control-bar.module.css';
import { useOutsideAlerter, useSelector } from '../../../services/types/hooks';
import ContextMenuBottom from '../../../utils/context-menu-bottom/context-menu-bottom';
import ControlBluetooth from '../control-bluetooth/control-bluetooth';
import { IEnabledControl } from '../../../services/reducers/system';
import { contextMenuContext } from '../../app/app';

type T = {
    bluetooth: IEnabledControl
}

const StateBluetooth:FC<T> = ({bluetooth}) => {
    const { openedControl, setOpenedControl } = useContext(contextMenuContext);

    const handleClick = (e:MouseEvent<HTMLDivElement>) => {
        setOpenedControl(openedControl=='control-bluetooth'?'':'control-bluetooth');
    }

    const outsideAlerterRef = useOutsideAlerter(() => {
        if(openedControlView) setOpenedControl('');
    });

    const openedControlView = openedControl=='control-bluetooth';

    return(
        <div className={cssCont.controlBarIconContainer} ref={outsideAlerterRef}>
            <div className={`${cssCont.controlBarIconCont} ${openedControlView&&cssCont.controlBarIconContActive}`} onClick={handleClick}>
            {
            bluetooth.enabled?<svg width="18px" height="18px" viewBox="0,0,256,256"><g fill="#000000"><g transform="scale(10.66667,10.66667)"><path d="M12.0332,2c-0.27091,-0.00897 -0.53387,0.09241 -0.72864,0.28092c-0.19477,0.18851 -0.30469,0.44802 -0.30456,0.71908v6.41992l-3.31055,-3.14453c-0.19357,-0.18954 -0.45575,-0.29243 -0.72656,-0.28516c-0.40679,0.01069 -0.76654,0.26679 -0.90979,0.64767c-0.14326,0.38088 -0.04146,0.81058 0.25745,1.0867l4.5,4.27539l-4.5,4.27539c-0.25898,0.24629 -0.36687,0.61206 -0.283,0.95948c0.08386,0.34742 0.34673,0.62369 0.68955,0.72471c0.34282,0.10102 0.7135,0.01145 0.97236,-0.23497l3.31055,-3.14453v6.41992c-0.00059,0.39541 0.23185,0.75405 0.59303,0.91499c0.36118,0.16095 0.78327,0.09398 1.07689,-0.17085l5,-4.5c0.20732,-0.18657 0.32731,-0.45123 0.33102,-0.7301c0.00371,-0.27888 -0.1092,-0.54663 -0.31149,-0.73865l-3.97461,-3.77539l3.97461,-3.77539c0.20228,-0.19201 0.31519,-0.45977 0.31149,-0.73865c-0.00371,-0.27888 -0.1237,-0.54354 -0.33102,-0.7301l-5,-4.5c-0.17542,-0.15771 -0.40095,-0.24833 -0.63672,-0.25586zM13,5.24609l2.52539,2.27539l-2.52539,2.39844zM13,14.08008l2.52539,2.39844l-2.52539,2.27539z"></path></g></g></svg>
            :<svg width="18px" height="18px" viewBox="0,0,256,256"><g fill="#00000050"><g transform="scale(10.66667,10.66667)"><path d="M11.87305,2.00781c-0.09483,0.01231 -0.18905,0.03983 -0.2793,0.08008c-0.361,0.16 -0.59375,0.51711 -0.59375,0.91211v3.75781l2,2v-3.51367l2.52734,2.27539l-1.93164,1.83398l1.41406,1.41406l2.67773,-2.54297c0.203,-0.191 0.3165,-0.45828 0.3125,-0.73828c-0.004,-0.278 -0.12308,-0.54252 -0.33008,-0.72852l-5,-4.5c-0.2205,-0.19875 -0.51239,-0.28694 -0.79687,-0.25zM3.70703,2.29297l-1.41406,1.41406l4.01758,4.01758l4.38477,4.38477l-4.38281,4.16602c-0.4,0.38 -0.41811,1.01211 -0.03711,1.41211c0.196,0.208 0.45961,0.3125 0.72461,0.3125c0.247,0 0.4945,-0.09139 0.6875,-0.27539l3.3125,-3.14648v6.42188c0,0.395 0.23275,0.75211 0.59375,0.91211c0.131,0.059 0.26825,0.08789 0.40625,0.08789c0.242,0 0.48192,-0.08881 0.66992,-0.25781l4.03125,-3.62695l3.5918,3.5918l1.41406,-1.41406zM13,14.41406l2.28516,2.28516l-2.28516,2.05664z"></path></g></g></svg>}
            </div>
            <ContextMenuBottom view={openedControlView}><ControlBluetooth /></ContextMenuBottom>
        </div>
    );
}

export default StateBluetooth;