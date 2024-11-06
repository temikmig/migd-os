import { FC } from 'react';
import css from './settings-pages.module.css';
import { useDispatch, useSelector } from '../../../../services/types/hooks';
import { changeVolumeControlBar } from '../../../../services/actions/system';
import Switch from "react-switch";
import VolumeHandler from '../../../../ui/volume-handler/volume-handler';

type T = {

}

export const SettingsPageVolume:FC<T> = () => {
    const { value, controlBar } = useSelector((store) => store.system.volume);
    
    const dispatch = useDispatch();

    const handleChangeControlBar = (e:any) => {
        dispatch(changeVolumeControlBar(!controlBar));
    }

    return(
        <>
            <h1 className={css.settingsHeader}>Настройки громкости звука</h1>
            <div className={css.settingsContBorder}>
                <div className={css.settingsHandler}>
                    <VolumeHandler />
                </div>
                <div className={css.settingsHandlerPersent}>{value}%</div>
            </div>
            <div className={css.settingsCont}>
                <div className={css.settingsSwitcherInfoCont}>
                    <div className={css.settingsSwitcherInfoContHead}>Отобразить в ControlBar</div>
                    <div className={css.settingsSwitcherInfoContDesc}>Иконка звука {controlBar?'':'не'} отображается в ControlBar</div>
                </div>
                <Switch onChange={handleChangeControlBar} checked={controlBar} offColor="#afb9c4" onColor="#328ddf" activeBoxShadow="" checkedIcon={false} uncheckedIcon={false} />
            </div>
        </>
    );
}