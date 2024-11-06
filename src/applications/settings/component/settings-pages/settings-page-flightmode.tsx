import { FC } from 'react';
import css from './settings-pages.module.css';
import { useDispatch, useSelector } from '../../../../services/types/hooks';
import { changeFlightmode } from '../../../../services/actions/system';
import Switch from "react-switch";

type T = {

}

export const SettingsPageFlightmode:FC<T> = () => {
    const { enabled } = useSelector((store) => store.system.flightmode);
    
    const dispatch = useDispatch();

    const handleChangeEnabled = (e:any) => {
        dispatch(changeFlightmode(!enabled));
    }

    return(
        <>
            <h1 className={css.settingsHeader}>Режим полета</h1>
            <div className={css.settingsCont}>
                <div className={css.settingsSwitcherInfoCont}>
                    <div className={css.settingsSwitcherInfoContHead}>Режим полета {enabled?'включен':'выключен'}</div>
                    <div className={css.settingsSwitcherInfoContDesc}>Режим полета автоматически выключает Wi-Fi и Bluetooth</div>
                </div>
                <Switch onChange={handleChangeEnabled} checked={enabled} offColor="#afb9c4" onColor="#328ddf" activeBoxShadow="" checkedIcon={false} uncheckedIcon={false} />
            </div>
        </>
    );
}