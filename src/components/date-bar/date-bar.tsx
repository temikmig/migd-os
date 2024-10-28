import React, { useEffect, useState } from 'react';
import css from './date-bar.module.css';
import { ui_addNull, ui_monthName } from '../../ui/ui';
import { useOutsideAlerter } from '../../services/types/hooks';
import ContextMenuBottom from '../../utils/context-menu-bottom/context-menu-bottom';
import DateCenter from './date-center/date-center';
import DateBarClock from './date-bar-clock/date-bar-clock';

const DateBar = () => {
    const date = new Date();

    const timestamp = Math.floor(date.getTime()/1000);

    const month = date.getMonth();
    const day = date.getDate();

    const hours = date.getHours();
    const minutes = date.getMinutes();

    const [clock, setClock] = useState(ui_addNull(hours)+(timestamp%2===0?':':' ')+ui_addNull(minutes));
    const [currDate, setCurrDate] = useState(day+' '+ui_monthName[month]);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         const date = new Date();

    //         const timestamp = Math.floor(date.getTime()/1000);

    //         const month = date.getMonth();
    //         const day = date.getDate();

    //         const hours = date.getHours();
    //         const minutes = date.getMinutes();

    //         setClock(ui_addNull(hours)+(timestamp%2===0?':':' ')+ui_addNull(minutes));
    //         setCurrDate(day+' '+ui_monthName[month]);
    //     }, 1000);
        
    //     return () => clearInterval(interval);
    // }, []);

    const [ openedDateCenter, setOpenedDateCenter ] = useState(false);

    const handleClick = (e:any) => {
        setOpenedDateCenter(!openedDateCenter);
    }

    const outsideAlerterRef = useOutsideAlerter(() => {
        setOpenedDateCenter(false);
    });

    return(
        <div ref={outsideAlerterRef} className={css.dateBarCont}>
        <div className={`${css.dateBar} ${openedDateCenter&&css.dateBarActive}`} onClick={handleClick}>
            <DateBarClock />
        </div>
        <ContextMenuBottom view={openedDateCenter}><DateCenter /></ContextMenuBottom>
        </div>
    )
}

export default DateBar;