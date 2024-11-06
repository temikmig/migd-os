import { FC, MouseEvent, useContext, useState } from "react";
import css from './component.module.css';
import SettingsNavItem from "../settings-nav-item/settings-nav-item";
import { settingsContext } from "../settings";
import { SVGIconBluetooth, SVGIconBrightness, SVGIconFlightmode, SVGIconFocusmode, SVGIconHotspot, SVGIconSupport, SVGIconVolume, SVGIconVPN, SVGIconWallapers, SVGIconWifi } from "../../../ui/svg-icons";
import { SettingsPageBluetooth, SettingsPageBrightness, SettingsPageFlightmode, SettingsPageFocusmode, SettingsPageHotspot, SettingsPageSupport, SettingsPageVolume, SettingsPageVPN, SettingsPageWallapers, SettingsPageWifi } from "./settings-pages";

type T = {

}

export const navItems = [
    {id: 1, title: 'О проекте', icon: <SVGIconSupport />},
    {id: 2, title: 'Режим полета', icon: <SVGIconFlightmode />, color: '#e36b39'},
    {id: 3, title: 'Wi-Fi', icon: <SVGIconWifi />},
    {id: 4, title: 'Bluetooth', icon: <SVGIconBluetooth />},
    {id: 5, title: 'Не беспокоить', icon: <SVGIconFocusmode />, color: '#862f6f'},
    {id: 6, title: 'Точка доступа', icon: <SVGIconHotspot />, color: '#379568'},
    {id: 7, title: 'VPN', icon: <SVGIconVPN />, color: '#379568'},
    {id: 8, title: 'Звук', icon: <SVGIconVolume/>},
    {id: 9, title: 'Яркость', icon: <SVGIconBrightness />},
    {id: 10, title: 'Обои', icon: <SVGIconWallapers />, color: '#28a4c3'}
];

export const Component:FC<T> = () => {
    const { activeItem } = useContext(settingsContext);

    return(
        <div className={css.settingsComponent}>
            <div className={css.settingsHeader}>Настройки</div>
            <div className={css.settingsContainer}>
                <div className={css.settingsNav}>
                    {navItems.map(item => <SettingsNavItem id={item.id} key={item.id} title={item.title} icon={item.icon} color={item.color} />)}
                </div>
                <div className={`${css.settingsContent} ${activeItem==1&&css.settingsContentAng}`}>
                    {activeItem==1&&<SettingsPageSupport />}
                    {activeItem==2&&<SettingsPageFlightmode />}
                    {activeItem==3&&<SettingsPageWifi />}
                    {activeItem==4&&<SettingsPageBluetooth />}
                    {activeItem==5&&<SettingsPageFocusmode />}
                    {activeItem==6&&<SettingsPageHotspot />}
                    {activeItem==7&&<SettingsPageVPN />}
                    {activeItem==8&&<SettingsPageVolume />}
                    {activeItem==9&&<SettingsPageBrightness />}
                    {activeItem==10&&<SettingsPageWallapers />}
                </div>
            </div>
        </div>
    );
}

export default Component;