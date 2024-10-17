import React, { FC, useEffect, useState } from 'react';
import css from './clock.module.css';
import { ui_addNull, ui_monthName } from '../../ui/ui';

// export const appIcon = '/apps-icons/calculator.svg';

export const appProps = {
    canExpand: false,
    canCollapse: true,
    canResize: false
}

export const appSizes = {
    width: 250,
    height: 350
}

export const App:FC = () => {
    return(<>1</>)
}

export const AppTile:FC = () => {
    const date = new Date();

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds() + 1;

    const [hoursDeg, setHoursDeg] = useState(hours*30+minutes/2);
    const [minutesDeg, setMinutesDeg] = useState(minutes*6+seconds/10);
    const [secondsDeg, setSecondsDeg] = useState(seconds*6);

    useEffect(() => {
        const interval = setInterval(() => {
            setSecondsDeg(secondsDeg+6);
            setMinutesDeg(minutesDeg+(6/60));
            setHoursDeg(hoursDeg+(6/60/24));
        }, 1000);
        
        return () => clearInterval(interval);
    }, [hoursDeg, minutesDeg, secondsDeg]);

    const styleHours = {
        transform: 'rotateZ('+hoursDeg+'deg)'
    }

    const styleMinutes = {
        transform: 'rotateZ('+minutesDeg+'deg)'
    }

    const styleSeconds = {
        transform: 'rotateZ('+secondsDeg+'deg)'
    }

    return(
        <article className={css.clock}>
            <div className={css.clockFace}>
                <div className={css.hours} style={styleHours}></div>
                <div className={css.minutes} style={styleMinutes}></div>
                <div className={css.seconds} style={styleSeconds}></div>
            </div>
        </article>
    )
}