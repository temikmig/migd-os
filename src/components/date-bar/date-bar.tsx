import React, { FC, useState, MouseEvent } from 'react';
import css from './date-bar.module.css';
import { useOutsideAlerter } from '../../services/types/hooks';
import ContextMenuBottom from '../../utils/context-menu-bottom/context-menu-bottom';
import DateCenter from './date-center/date-center';
import DateBarClock from './date-bar-clock/date-bar-clock';

const DateBar:FC = () => {
    const [ openedDateCenter, setOpenedDateCenter ] = useState(false);

    const handleClick = (e:MouseEvent<HTMLDivElement>) => {
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