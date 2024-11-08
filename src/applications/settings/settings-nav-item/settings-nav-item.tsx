import { FC, MouseEvent, useContext, useState } from "react";
import css from './settings-nav-item.module.css';
import { settingsContext } from "../settings";

type T = {
    id: number,
    title: string,
    icon?: string | JSX.Element,
    color?: string
}

export const SettingsNavItem:FC<T> = ({id, title, icon, color}) => {
    const { activeItem, setActiveItem } = useContext(settingsContext);

    const handleChangeItem = (e:MouseEvent<HTMLDivElement>) => {
        setActiveItem(id);
    }

    return(
        <div className={`${css.settingsNavItem} ${activeItem==id&&css.settingsNavItemActive}`} onClick={handleChangeItem}>
            <div className={css.settingsNavItemIcon} style={{backgroundColor: color}}>
                {icon}
            </div>
            <div className={css.settingsNavItemTitle}>{title}</div>
        </div>
    );
}

export default SettingsNavItem;