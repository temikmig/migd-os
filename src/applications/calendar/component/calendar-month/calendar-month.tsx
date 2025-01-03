import React, { FC, useState } from 'react';
import css from './calendar-month.module.css';
import CalendarWeek from '../calendar-week/calendar-week';

import { ui_heightCalendar } from '../../../../ui/ui';
import { ICalendarDayItem } from '../component';

type T = {
    month: number,
    year: number,
    active?: boolean
}

const CalendarMonth:FC<T> = ({month, year, active}) => {
    const init = new Date(year, month+1, 0);
    const daysCount = init.getDate();
    const firstWeekDay = new Date(year, month, 1).getDay();
    const addedWeekDays = 7 - ((firstWeekDay>0)?firstWeekDay:7) + 1;
    const weeksCount = Math.ceil((daysCount - (init.getDay()?init.getDay():7))/7) + 1;
    const weeksArr:Array<Array<ICalendarDayItem>> = [];

    let day = 1;

    for(let i = 1; i <= weeksCount; i++) {
        let daysArr:Array<ICalendarDayItem> = [];
        let daysWeekCount = ((i==1)?addedWeekDays:7);

        for(let j = 1; j <= daysWeekCount; j++) {
            if(day <= daysCount) {
                daysArr.push({day: day, month: month, year: year});
                day++;
            }
        }

        weeksArr.push(daysArr);
    }

    const monthPosition = ui_heightCalendar({year: year, month: month, day: 1}, 75);

    const style = {
        top: monthPosition
    }

    return(
        <div className={`${css.calendarMonth} ${active&&css.calendarMonthActive}`} style={style}>
            {weeksArr.map((week, index) => <CalendarWeek key={index} days={week} />)}
        </div>
    );
}
export default CalendarMonth;