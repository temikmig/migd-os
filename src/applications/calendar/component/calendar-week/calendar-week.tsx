import { FC } from 'react';
import css from './calendar-week.module.css';
import CalendarDay from '../calendar-day/calendar-day';
import { ICalendarDayItem } from '../component';

type T = {
    days: Array<ICalendarDayItem>
}

const CalendarWeek:FC<T> = ({days}) => {
    return(
        <div className={css.calendarWeek}>
            {days.map((day, index) => <CalendarDay key={index} day={day} />)}
        </div>
    );
}
export default CalendarWeek;