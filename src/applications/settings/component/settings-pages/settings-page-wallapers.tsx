import { FC } from 'react';
import css from './settings-pages.module.css';
import { useSelector } from '../../../../services/types/hooks';
import { SettingsWallaperItem } from '../settings-wallaper-item/settings-wallaper-item';

type T = {

}

export const SettingsPageWallapers:FC<T> = () => {
    const fileStructure = useSelector((store) => store.fileStructure.data);

    const desktopData = fileStructure.children.find((item:any) => item.id=='id-images').children;

    return(
        <>
            <h1 className={css.settingsHeader}>Обои на рабочий стол</h1>
            <div className={css.settingsContWallapers}>
                {desktopData.map((item:any) => <SettingsWallaperItem key={item.id} content={item.content} />)}
            </div>
        </>
    );
}