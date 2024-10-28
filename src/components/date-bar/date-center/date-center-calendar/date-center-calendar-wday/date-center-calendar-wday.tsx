import React, { FC, useState } from 'react';
import css from './../date-center-calendar-day/date-center-calendar-day.module.css';

const DateCenterCalendarWDay:any = ({wday}:any) => {
    return(
        <div className={css.dateCenterCalendarWDay}>{wday}</div>
    );
}
export default DateCenterCalendarWDay;