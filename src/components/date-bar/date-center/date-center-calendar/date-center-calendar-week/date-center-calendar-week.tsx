import { FC } from 'react';
import css from './date-center-calendar-week.module.css';
import DateCenterCalendarDay from '../date-center-calendar-day/date-center-calendar-day';
import { ICalendarDayItem } from '../date-center-calendar';

type T = {
    days: Array<ICalendarDayItem>
}

const DateCenterCalendarWeek:FC<T> = ({days}) => {
    return(
        <div className={css.dateCenterCalendarWeek}>
            {days.map((day, index) => <DateCenterCalendarDay key={index} day={day} />)}
        </div>
    );
}
export default DateCenterCalendarWeek;