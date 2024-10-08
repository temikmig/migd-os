import React, { FC } from 'react';
import css from './application.module.css';
import { useSelector } from '../../services/types/hooks';

export const Application:FC = ({appId}:any) => {

    const applications = useSelector((store) => store.applications.data);

    const { title, icon } = applications.find((app:any) => app.id==appId);
    
    return(
        <div className={css.appInfo}>
            <img src={icon} />
            <h1>{title}</h1>
        </div>
    )
}

export default Application;