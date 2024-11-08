import { FC } from 'react';
import css from './../date-center-calendar-day/date-center-calendar-day.module.css';

type T = {
    wday: string
}

const DateCenterCalendarWDay:FC<T> = ({wday}) => {
    return(
        <div className={css.dateCenterCalendarWDay}>{wday}</div>
    );
}
export default DateCenterCalendarWDay;