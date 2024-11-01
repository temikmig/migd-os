import { FC } from 'react';
import css from './date-center-calendar-day.module.css';
import { ICalendarDayItem } from '../date-center-calendar';

type T = {
    day: ICalendarDayItem
}

const DateCenterCalendarDay:FC<T> = ({day}) => {
    const currDate = new Date();
    const currYear = new Date().getFullYear();
    const currMonth = new Date().getMonth();
    const currDay = new Date().getDate();


    const date = new Date(day.year, day.month, day.day);
    const weekDay = date.getDay();
    const weekend = ((weekDay==6||weekDay==0)?true:false);
    const currentDay = ((currYear==day.year&&currMonth==day.month&&currDay==day.day)?true:false);

    return(
        <div className={`${css.dateCenterCalendarDay} ${weekend&&css.dateCenterCalendarWeekendDay} ${currentDay&&css.dateCenterCalendarCurrentDay}`}>{day.day}</div>
    );
}
export default DateCenterCalendarDay;