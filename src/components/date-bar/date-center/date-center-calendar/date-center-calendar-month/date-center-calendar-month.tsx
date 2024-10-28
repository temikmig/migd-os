import React, { FC, useState } from 'react';
import css from './date-center-calendar-month.module.css';
import { ui_heightCalendar } from '../../../../../ui/ui';
import DateCenterCalendarWeek from '../date-center-calendar-week/date-center-calendar-week';

const DateCenterCalendarMonth:any = ({month, year, active}:any) => {
    const init = new Date(year, month+1, 0);
    const daysCount = init.getDate();
    const firstWeekDay = new Date(year, month, 1).getDay();
    const addedWeekDays = 7 - ((firstWeekDay>0)?firstWeekDay:7) + 1;
    const weeksCount = Math.ceil((daysCount - (init.getDay()?init.getDay():7))/7) + 1;
    const weeksArr = [];

    let day = 1;

    for(let i = 1; i <= weeksCount; i++) {
        let daysArr = [];
        let daysWeekCount = ((i==1)?addedWeekDays:7);

        for(let j = 1; j <= daysWeekCount; j++) {
            if(day <= daysCount) {
                daysArr.push({day: day, month: month, year: year});
                day++;
            }
        }

        weeksArr.push(daysArr);
    }

    const monthPosition = ui_heightCalendar({year: year, month: month, day: 1});

    const style = {
        top: monthPosition
    }

    return(
        <div className={`${css.dateCenterCalendarMonth} ${active&&css.dateCenterCalendarMonthActive}`} style={style}>
            {weeksArr.map((week:any, index:number) => <DateCenterCalendarWeek key={index} days={week} active={active} />)}
        </div>
    );
}
export default DateCenterCalendarMonth;