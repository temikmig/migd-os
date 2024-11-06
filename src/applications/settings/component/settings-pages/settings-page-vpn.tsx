import { FC } from 'react';
import css from './settings-pages.module.css';
import { useDispatch, useSelector } from '../../../../services/types/hooks';
import { changeVpn } from '../../../../services/actions/system';
import Switch from "react-switch";

type T = {

}

export const SettingsPageVPN:FC<T> = () => {
    const { enabled } = useSelector((store) => store.system.vpn);
    
    const dispatch = useDispatch();

    const handleChangeEnabled = (e:any) => {
        dispatch(changeVpn(!enabled));
    }

    return(
        <>
            <h1 className={css.settingsHeader}>Настройки VPN</h1>
            <div className={css.settingsCont}>
                <div className={css.settingsSwitcherInfoCont}>
                    <div className={css.settingsSwitcherInfoContHead}>VPN {enabled?'включен':'выключен'}</div>
                    <div className={css.settingsSwitcherInfoContDesc}>VPN позволяет установить безопасное подключение к сети</div>
                </div>
                <Switch onChange={handleChangeEnabled} checked={enabled} offColor="#afb9c4" onColor="#328ddf" activeBoxShadow="" checkedIcon={false} uncheckedIcon={false} />
            </div>
        </>
    );
}