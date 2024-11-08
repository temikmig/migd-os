import { FC } from 'react';
import css from './settings-pages.module.css';
import { useDispatch, useSelector } from '../../../../services/types/hooks';
import { changeWifi, changeWifiControlBar } from '../../../../services/actions/system';
import Switch from "react-switch";

type T = {

}

export const SettingsPageWifi:FC<T> = () => {
    const { enabled, controlBar } = useSelector((store) => store.system.wifi);
    
    const dispatch = useDispatch();

    const handleChangeEnabled = (e:any) => {
        dispatch(changeWifi(!enabled));
    }

    const handleChangeControlBar = (e:any) => {
        dispatch(changeWifiControlBar(!controlBar));
    }

    return(
        <>
            <h1 className={css.settingsHeader}>Настройки Wi-Fi</h1>
            <div className={css.settingsCont}>
                <div className={css.settingsSwitcherInfoCont}>
                    <div className={css.settingsSwitcherInfoContHead}>Wi-Fi {enabled?'включен':'выключен'}</div>
                    <div className={css.settingsSwitcherInfoContDesc}>Доступ к интернету</div>
                </div>
                <Switch onChange={handleChangeEnabled} checked={enabled} offColor="#afb9c4" onColor="#328ddf" activeBoxShadow="" checkedIcon={false} uncheckedIcon={false} />
            </div>
            <div className={css.settingsCont}>
                <div className={css.settingsSwitcherInfoCont}>
                    <div className={css.settingsSwitcherInfoContHead}>Отобразить в ControlBar</div>
                    <div className={css.settingsSwitcherInfoContDesc}>Иконка Wi-Fi {controlBar?'':'не'} отображается в ControlBar</div>
                </div>
                <Switch onChange={handleChangeControlBar} checked={controlBar} offColor="#afb9c4" onColor="#328ddf" activeBoxShadow="" checkedIcon={false} uncheckedIcon={false} />
            </div>
        </>
    );
}