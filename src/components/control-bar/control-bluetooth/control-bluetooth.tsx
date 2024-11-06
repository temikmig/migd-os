import React, { FC, SyntheticEvent, useState } from 'react';
import css from './control-bluetooth.module.css';
import cssCont from './../control-bar.module.css';
import Switch from "react-switch";
import { useDispatch, useSelector } from '../../../services/types/hooks';
import { changeBluetooth } from '../../../services/actions/system';

const ControlBluetooth:FC = () => {
    const { bluetooth } = useSelector((store) => store.system);

    const dispatch = useDispatch();

    const handleChange = (e:any) => {
        dispatch(changeBluetooth(!bluetooth.enabled));
    }

    return(
        <div className={cssCont.controlContainer}>
            <div className={cssCont.controlContainerCont}>
                <div className={css.controlWifiCont}>
                    <h1 className={css.header}>Bluetooth</h1>
                    <Switch onChange={handleChange} checked={bluetooth.enabled} offColor="#afb9c4" onColor="#328ddf" activeBoxShadow="" checkedIcon={false} uncheckedIcon={false} />
                </div>
            </div>
        </div>
    );
}

export default ControlBluetooth;