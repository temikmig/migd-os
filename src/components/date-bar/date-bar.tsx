import React, { useEffect, useState } from 'react';
import css from './date-bar.module.css';
import { ui_addNull, ui_monthName } from '../../ui/ui';

const DateBar = () => {
    const date = new Date();

    const timestamp = Math.floor(date.getTime()/1000);

    const month = date.getMonth();
    const day = date.getDate();

    const hours = date.getHours();
    const minutes = date.getMinutes();

    const [clock, setClock] = useState(ui_addNull(hours)+(timestamp%2===0?':':' ')+ui_addNull(minutes));
    const [currDate, setCurrDate] = useState(day+' '+ui_monthName[month]);

    useEffect(() => {
        

        const interval = setInterval(() => {
            const date = new Date();

            const timestamp = Math.floor(date.getTime()/1000);

            const month = date.getMonth();
            const day = date.getDate();

            const hours = date.getHours();
            const minutes = date.getMinutes();

            setClock(ui_addNull(hours)+(timestamp%2===0?':':' ')+ui_addNull(minutes));
            setCurrDate(day+' '+ui_monthName[month]);
        }, 1000);
        
        return () => clearInterval(interval);
    }, []);

    return(
        <div className={css.dateBar}>
            <div className={css.dateBarClock}>{clock}</div>
            <div className={css.dateBarCurrDate}>{currDate}</div>
        </div>
    )
}

export default DateBar;