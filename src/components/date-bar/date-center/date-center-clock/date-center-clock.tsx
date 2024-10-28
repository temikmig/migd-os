import React, { FC, useEffect, useState } from 'react';
import css from './date-center-clock.module.css';
import { ui_addNull, ui_heightCalendar, ui_monthName } from '../../../../ui/ui';

const DateCenterClock:any = ({calendarRef}:any) => {
    const date = new Date();

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const [clock, setClock] = useState(ui_addNull(hours)+':'+ui_addNull(minutes)+':'+ui_addNull(seconds));
    const [currDate, setCurrDate] = useState(day+' '+ui_monthName[month]+' '+year+' г.');

    useEffect(() => {
        const interval = setInterval(() => {
            const date = new Date();

            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDate();

            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();

            setClock(ui_addNull(hours)+':'+ui_addNull(minutes)+':'+ui_addNull(seconds));
            setCurrDate(day+' '+ui_monthName[month]+' '+year+' г.');
        }, 1000);
        
        return () => clearInterval(interval);
    }, []);

    const handleToday = (e:any) => {
        calendarRef.current.scrollTop = ui_heightCalendar({year: year, month: month, day: 1});
    }

    return(
        <div className={css.dateCenterClockCont}>
            <div className={css.dateCenterClockContTime}>{clock}</div>
            <div className={css.dateCenterClockContDate} onClick={handleToday}>{currDate}</div>
        </div>
    );
}
export default DateCenterClock;