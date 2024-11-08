import { useEffect, useState, MouseEvent, FC } from 'react';
import css from './date-center-calendar.module.css';
import { ui_heightCalendar, ui_monthNameI } from '../../../../ui/ui';
import { CALENDAR_BEG, CALENDAR_END } from '../../../../utils/config';
import DateCenterCalendarMonth from './date-center-calendar-month/date-center-calendar-month';
import HandleUp from '../../../../ui/handle-up/handle-up';
import HandleDown from '../../../../ui/handle-down/handle-down';
import DateCenterCalendarWDay from './date-center-calendar-wday/date-center-calendar-wday';

type T = {
    calendarRef: any
}

export interface ICalendarDayItem {
    day: number, 
    month: number,
    year: number
}

const DateCenterCalendar:FC<T> = ({calendarRef}) => {
    const currDate = new Date();
    const currYear = currDate.getFullYear();
    const currMonth = currDate.getMonth();

    const [ monthList, setMonthList ] = useState([{year: currYear, month: currMonth}]);
    const [ scroll, setScroll ] = useState(ui_heightCalendar({year: currYear, month: currMonth, day: 1}, 30));

    const calendarHeight = ui_heightCalendar({year: CALENDAR_END.year, month: CALENDAR_END.month, day: 31}, 30);

    useEffect(() => {
        calendarRef.current.scrollTop = ui_heightCalendar({year: currYear, month: currMonth, day: 1}, 30);
    }, []);

    const handleScroll = (e:MouseEvent<HTMLDivElement>) => {
        const pos = Math.ceil(e.currentTarget.scrollTop);
        const sDate = new Date(currYear, currMonth, 1 + (pos - scroll) / 30 * 7 + 21);

        const sMonth = sDate.getMonth();
        const sYear = sDate.getFullYear();

        if(pos >= 0&&pos<calendarHeight-120) setMonthList([{year: sYear, month: sMonth}]);
    }

    const handlePrev = (e:MouseEvent<SVGElement>) => {
        const pMonth = monthList[0].month-1;

        const pYear = pMonth==11?monthList[0].year-1:monthList[0].year;

        calendarRef.current.scrollTop = ui_heightCalendar({year: pYear, month: pMonth, day: 1}, 30);
    }

    const handleNext = (e:MouseEvent<SVGElement>) => {
        const nMonth = monthList[0].month+1;
        const nYear = nMonth==0?monthList[0].year+1:monthList[0].year;

        calendarRef.current.scrollTop = ui_heightCalendar({year: nYear, month: nMonth, day: 1}, 30);
    }

    const wdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

    return(
        <>
            <div className={css.dateCenterCalendarHandlerCont}>
                <div className={css.dateCenterCalendarHandlerContHeader}>{ui_monthNameI[monthList[0].month]} {monthList[0].year}</div>
                <div className={css.dateCenterCalendarHandlerContBar}>
                    <HandleDown handleClick={handleNext} />
                    <HandleUp handleClick={handlePrev} />
                </div>
            </div>
            <div className={css.dateCenterCalendarWeekdaysCont}>
                {wdays.map((weekDay, index) => <DateCenterCalendarWDay key={index} wday={weekDay} />)}
            </div>
            <div className={css.dateCenterCalendarCont} onScroll={handleScroll} ref={calendarRef}>
                <div className={css.dateCenterCalendarBody} style={{height: calendarHeight}}>
                    {monthList.map((monthItem:any, index:number) => 
                        <>
                            {!(monthItem.year==CALENDAR_BEG.year&&monthItem.month==CALENDAR_BEG.month)&&
                            <DateCenterCalendarMonth key={`beg-`+index} year={monthItem.year} month={monthItem.month-1} />
                            }
                            <DateCenterCalendarMonth key={index} year={monthItem.year} month={monthItem.month} active />
                            {!(monthItem.year==CALENDAR_END.year&&monthItem.month==CALENDAR_END.month)&&
                            <DateCenterCalendarMonth key={`end-`+index} year={monthItem.year} month={monthItem.month+1} />
                            }
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
export default DateCenterCalendar;