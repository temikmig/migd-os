import React, { createContext, FC, useEffect, useMemo, useState } from 'react';
import css from './calendar.module.css';
import { useDroppable } from '@dnd-kit/core';
import Component from './component/component';
import { ui_monthName } from '../../ui/ui';

export const appIcon = '/apps-icons/calendar.svg';

export const appProps = {
    canExpand: true,
    canCollapse: true,
    canResize: true,
    minWidth: 500,
    minHeight: 200,
}

export const appSizes = {
    width: 900,
    height: 400
}

export const App:FC = ({id}:any) => {
    return(
        <Component id={id} />
    )
}

export const AppTile:FC = () => {
    const date = new Date();

    const [ calendarDate, setCalendarDate ] = useState(date);

    useEffect(() => {
        const date = new Date();

        const interval = setInterval(() => {
            setCalendarDate(date);
        }, 1000);
        
        return () => clearInterval(interval);
    }, [date]);

    const wdays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

    return(
        <article className={css.calendarTile}>
            <div className={css.calendarTileWeekDay}>{wdays[calendarDate.getDay()]}</div>
            <div className={css.calendarTileDay}>2{calendarDate.getDate()}</div>
            <div className={css.calendarTileMonth}>{ui_monthName[calendarDate.getMonth()]}</div>
        </article>
    )
}