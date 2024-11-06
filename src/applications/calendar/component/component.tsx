import { FC, MouseEvent, useEffect, useRef, useState } from "react";
import css from './component.module.css';
import { ui_heightCalendar, ui_monthNameI } from "../../../ui/ui";
import CalendarWDay from "./calendar-wday/calendar-wday";
import { CALENDAR_BEG, CALENDAR_END } from "../../../utils/config";
import CalendarMonth from "./calendar-month/calendar-month";
import { SVGIconLeft, SVGIconRight } from "../../../ui/svg-icons";

type T = {
    id: string
}

export interface ICalendarDayItem {
    day: number, 
    month: number,
    year: number
}

export const Component:FC<T> = ({id}) => {
    const currDate = new Date();
    const currYear = currDate.getFullYear();
    const currMonth = currDate.getMonth();

    const [ monthList, setMonthList ] = useState([{year: currYear, month: currMonth}]);
    const [ scroll, setScroll ] = useState(ui_heightCalendar({year: currYear, month: currMonth, day: 1}, 75));

    const calendarHeight = ui_heightCalendar({year: CALENDAR_END.year, month: CALENDAR_END.month, day: 31}, 75);

    useEffect(() => {
        calendarRef.current.scrollTop = ui_heightCalendar({year: currYear, month: currMonth, day: 1}, 75);
    }, []);

    const handleScroll = (e:MouseEvent<HTMLDivElement>) => {
        const pos = Math.ceil(e.currentTarget.scrollTop);
        const sDate = new Date(currYear, currMonth, 1 + (pos - scroll) / 75 * 7 + 21);

        const sMonth = sDate.getMonth();
        const sYear = sDate.getFullYear();

        if(pos >= 0&&pos<calendarHeight-120) setMonthList([{year: sYear, month: sMonth}]);
    }

    const handlePrev = (e:MouseEvent<HTMLDivElement>) => {
        const pMonth = monthList[0].month-1;

        const pYear = pMonth==11?monthList[0].year-1:monthList[0].year;

        calendarRef.current.scrollTop = ui_heightCalendar({year: pYear, month: pMonth, day: 1}, 75);
    }

    const handleNext = (e:MouseEvent<HTMLDivElement>) => {
        const nMonth = monthList[0].month+1;
        const nYear = nMonth==0?monthList[0].year+1:monthList[0].year;

        calendarRef.current.scrollTop = ui_heightCalendar({year: nYear, month: nMonth, day: 1}, 75);
    }

    const handleToday = (e:MouseEvent<HTMLDivElement>) => {
        calendarRef.current.scrollTop = ui_heightCalendar({year: currYear, month: currMonth, day: 1}, 75);
    }

    const wdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

    const calendarRef:any = useRef();

    return(
        <div className={css.calendarContainer}>
            <div className={css.calendarHeader}>
                <div className={css.calendarHeaderMonth}>
                    {ui_monthNameI[monthList[0].month]} {monthList[0].year}
                </div>
                <div className={css.calendarHeaderHandlerCont}>
                    <div onClick={handlePrev}><SVGIconLeft /></div>
                    <div onClick={handleToday}>Сегодня</div>
                    <div onClick={handleNext}><SVGIconRight /></div>
                </div>
                <div className={css.calendarHeaderWeekdays}>
                    {wdays.map((weekDay, index) => <CalendarWDay key={index} wday={weekDay} />)}
                </div>
            </div>
            <div className={css.calendarCont} onScroll={handleScroll} ref={calendarRef}>
                <div className={css.calendarBody} style={{height: calendarHeight}}>
                    {monthList.map((monthItem:any, index:number) => 
                        <>
                            {!(monthItem.year==CALENDAR_BEG.year&&monthItem.month==CALENDAR_BEG.month)&&
                            <>
                                <CalendarMonth key={`prebeg-`+index} year={monthItem.year} month={monthItem.month-2} />
                                <CalendarMonth key={`beg-`+index} year={monthItem.year} month={monthItem.month-1} />
                            </>
                            }
                            <CalendarMonth key={index} year={monthItem.year} month={monthItem.month} active />
                            {!(monthItem.year==CALENDAR_END.year&&monthItem.month==CALENDAR_END.month)&&
                            <>
                                <CalendarMonth key={`end-`+index} year={monthItem.year} month={monthItem.month+1} />
                                <CalendarMonth key={`postend-`+index} year={monthItem.year} month={monthItem.month+2} />
                            </>
                            }
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Component;