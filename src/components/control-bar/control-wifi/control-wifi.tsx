import React, { FC, SyntheticEvent, useState } from 'react';
import css from './control-wifi.module.css';
import cssCont from './../control-bar.module.css';
import Switch from "react-switch";
import { useDispatch, useSelector } from '../../../services/types/hooks';
import { changeWifi } from '../../../services/actions/system';

const ControlWifi:FC = () => {
    const { wifi } = useSelector((store) => store.system);

    const dispatch = useDispatch();

    const handleChange = (e:any) => {
        dispatch(changeWifi(!wifi.enabled));
    }

    return(
        <div className={cssCont.controlContainer}>
            <div className={cssCont.controlContainerCont}>
                <div className={css.controlWifiCont}>
                    <h1 className={css.header}>Wi-Fi</h1>
                    <Switch onChange={handleChange} checked={wifi.enabled} offColor="#afb9c4" onColor="#328ddf" activeBoxShadow="" checkedIcon={false} uncheckedIcon={false} />
                </div>
            </div>
        </div>
    );
}

export default ControlWifi;