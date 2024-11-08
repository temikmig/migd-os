import React, { FC } from 'react';
import css from './application.module.css';
import { useSelector } from '../../services/types/hooks';
import { IApplicationItem } from '../../services/reducers/applications';

type T = {
    appId: string
}

export const Application:FC<T> = ({appId}) => {

    const applications = useSelector((store) => store.applications.data);

    const { title, icon } = applications.find((app:IApplicationItem) => app.id==appId);
    
    return(
        <div className={css.appInfo}>
            <img src={icon} />
            <h1>{title}</h1>
        </div>
    )
}

export default Application;