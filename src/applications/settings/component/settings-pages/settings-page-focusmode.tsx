import { FC } from 'react';
import css from './settings-pages.module.css';
import { useDispatch, useSelector } from '../../../../services/types/hooks';
import { changeFocusmode } from '../../../../services/actions/system';
import Switch from "react-switch";

type T = {

}

export const SettingsPageFocusmode:FC<T> = () => {
    const { enabled } = useSelector((store) => store.system.focusmode);
    
    const dispatch = useDispatch();

    const handleChangeEnabled = (e:any) => {
        dispatch(changeFocusmode(!enabled));
    }

    return(
        <>
            <h1 className={css.settingsHeader}>Режим &laquo;Не беспокоить&raquo;</h1>
            <div className={css.settingsCont}>
                <div className={css.settingsSwitcherInfoCont}>
                    <div className={css.settingsSwitcherInfoContHead}>Режим &laquo;Не беспокоить&raquo; {enabled?'включен':'выключен'}</div>
                    <div className={css.settingsSwitcherInfoContDesc}>Режим &laquo;Не беспокоить&raquo; позволяет выключить все уведомления</div>
                </div>
                <Switch onChange={handleChangeEnabled} checked={enabled} offColor="#afb9c4" onColor="#328ddf" activeBoxShadow="" checkedIcon={false} uncheckedIcon={false} />
            </div>
        </>
    );
}