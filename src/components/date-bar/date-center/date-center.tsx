import React, { FC, useRef, useState } from 'react';
import css from './date-center.module.css';
import DateCenterClock from './date-center-clock/date-center-clock';
import DateCenterCalendar from './date-center-calendar/date-center-calendar';

const DateCenter:any = () => {
    const calendarRef:any = useRef();

    return(
        <div className={css.dateCenterCont}>
            <DateCenterClock calendarRef={calendarRef} />
            <DateCenterCalendar calendarRef={calendarRef} />
        </div>
    );
}
export default DateCenter;