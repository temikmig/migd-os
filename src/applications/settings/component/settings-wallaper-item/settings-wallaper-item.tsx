import { FC, MouseEvent } from 'react';
import css from './settings-wallaper-item.module.css';
import { useDispatch } from '../../../../services/types/hooks';
import { changeWallaper } from '../../../../services/actions/system';

type T = {
    content: string
}

export const SettingsWallaperItem:FC<T> = ({content}) => {
    const dispatch = useDispatch();
    
    const handleClick = (e:MouseEvent<HTMLDivElement>) => {
        dispatch(changeWallaper(content));
    }

    return(
        <div onClick={handleClick} className={css.settingsWallaperCont} style={{backgroundImage: 'url(images/'+content+')'}}></div>
    );
}