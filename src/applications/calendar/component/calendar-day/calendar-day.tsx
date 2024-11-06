import { FC } from 'react';
import css from './calendar-day.module.css';
import { ICalendarDayItem } from '../component';

type T = {
    day: ICalendarDayItem
}

const CalendarDay:FC<T> = ({day}) => {
    const currDate = new Date();
    const currYear = currDate.getFullYear();
    const currMonth = currDate.getMonth();
    const currDay = currDate.getDate();

    const date = new Date(day.year, day.month, day.day);
    const weekDay = date.getDay();
    const weekend = ((weekDay==6||weekDay==0)?true:false);
    const currentDay = ((currYear==day.year&&currMonth==day.month&&currDay==day.day)?true:false);

    const style = {
        gridColumnStart: weekDay==0?7:weekDay
    }

    return(
        <div className={`${css.calendarDay} ${weekend&&css.calendarWeekendDay} ${currentDay&&css.calendarCurrentDay}`} style={style}>
            <div className={css.calendarDayNum}>{day.day}</div>
        </div>
    );
}
export default CalendarDay;