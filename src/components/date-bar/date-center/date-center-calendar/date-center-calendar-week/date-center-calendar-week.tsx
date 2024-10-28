import React, { FC, useState } from 'react';
import css from './date-center-calendar-week.module.css';
import DateCenterCalendarDay from '../date-center-calendar-day/date-center-calendar-day';

const DateCenterCalendarWeek:any = ({days}:any) => {
    return(
        <div className={css.dateCenterCalendarWeek}>
            {days.map((day:any, index:number) => <DateCenterCalendarDay key={index} day={day} />)}
        </div>
    );
}
export default DateCenterCalendarWeek;