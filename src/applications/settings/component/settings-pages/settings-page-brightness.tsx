import { FC } from 'react';
import css from './settings-pages.module.css';
import { useDispatch, useSelector } from '../../../../services/types/hooks';
import { changeBrightnessControlBar } from '../../../../services/actions/system';
import Switch from "react-switch";
import VolumeHandler from '../../../../ui/volume-handler/volume-handler';
import BrightnessHandler from '../../../../ui/brightness-handler/brightness-handler';

type T = {

}

export const SettingsPageBrightness:FC<T> = () => {
    const { value, controlBar } = useSelector((store) => store.system.brightness);
    
    const dispatch = useDispatch();

    const handleChangeControlBar = (e:any) => {
        dispatch(changeBrightnessControlBar(!controlBar));
    }

    return(
        <>
            <h1 className={css.settingsHeader}>Настройки яркости экрана</h1>
            <div className={css.settingsContBorder}>
                <div className={css.settingsHandler}>
                    <BrightnessHandler />
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