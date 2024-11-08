import { FC } from 'react';
import css from './settings-pages.module.css';
import { useDispatch, useSelector } from '../../../../services/types/hooks';
import { changeHotspot } from '../../../../services/actions/system';
import Switch from "react-switch";

type T = {

}

export const SettingsPageHotspot:FC<T> = () => {
    const { enabled } = useSelector((store) => store.system.hotspot);
    
    const dispatch = useDispatch();

    const handleChangeEnabled = (e:any) => {
        dispatch(changeHotspot(!enabled));
    }

    return(
        <>
            <h1 className={css.settingsHeader}>Настройки точки доступа</h1>
            <div className={css.settingsCont}>
                <div className={css.settingsSwitcherInfoCont}>
                    <div className={css.settingsSwitcherInfoContHead}>Режим точки доступа {enabled?'включен':'выключен'}</div>
                    <div className={css.settingsSwitcherInfoContDesc}>Режим точки доступа позволяет организовать беспроводной доступ к существующей сети</div>
                </div>
                <Switch onChange={handleChangeEnabled} checked={enabled} offColor="#afb9c4" onColor="#328ddf" activeBoxShadow="" checkedIcon={false} uncheckedIcon={false} />
            </div>
        </>
    );
}