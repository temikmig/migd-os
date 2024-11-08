import { FC } from 'react';
import css from './../calendar-day/calendar-day.module.css';

type T = {
    wday: string
}

const CalendarWDay:FC<T> = ({wday}) => {
    return(
        <div className={css.calendarWDay}>
            <div className={css.calendarDayNum}>
                {wday}
            </div>
        </div>
    );
}
export default CalendarWDay;