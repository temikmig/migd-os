import { FC } from 'react';
import css from './settings-pages.module.css';
import { useDispatch, useSelector } from '../../../../services/types/hooks';
import { changeBluetooth, changeBluetoothControlBar } from '../../../../services/actions/system';
import Switch from "react-switch";

type T = {

}

export const SettingsPageBluetooth:FC<T> = () => {
    const { enabled, controlBar } = useSelector((store) => store.system.bluetooth);
    
    const dispatch = useDispatch();

    const handleChangeEnabled = (e:any) => {
        dispatch(changeBluetooth(!enabled));
    }

    const handleChangeControlBar = (e:any) => {
        dispatch(changeBluetoothControlBar(!controlBar));
    }

    return(
        <>
            <h1 className={css.settingsHeader}>Настройки Bluetooth</h1>
            <div className={css.settingsCont}>
                <div className={css.settingsSwitcherInfoCont}>
                    <div className={css.settingsSwitcherInfoContHead}>Bluetooth {enabled?'включен':'выключен'}</div>
                </div>
                <Switch onChange={handleChangeEnabled} checked={enabled} offColor="#afb9c4" onColor="#328ddf" activeBoxShadow="" checkedIcon={false} uncheckedIcon={false} />
            </div>
            <div className={css.settingsCont}>
                <div className={css.settingsSwitcherInfoCont}>
                    <div className={css.settingsSwitcherInfoContHead}>Отобразить в ControlBar</div>
                    <div className={css.settingsSwitcherInfoContDesc}>Иконка Bluetooth {controlBar?'':'не'} отображается в ControlBar</div>
                </div>
                <Switch onChange={handleChangeControlBar} checked={controlBar} offColor="#afb9c4" onColor="#328ddf" activeBoxShadow="" checkedIcon={false} uncheckedIcon={false} />
            </div>
        </>
    );
}