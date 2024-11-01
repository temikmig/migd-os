import { FC, useEffect, useState } from 'react';
import css from './component.module.css'; 
import SliderComponent from '../../../ui/slider-component/slider-component';
import Gradient from "javascript-color-gradient";
import { ui_addNull, ui_monthName } from '../../../ui/ui';
import { Moon } from './moon/moon';
import { Sun } from './sun/sun';
import { Cloud } from './cloud/cloud';

export const Component:FC = () => {
    const gradientA = new Gradient().setColorGradient("#cd9fea", "#fe7d00", "#b4e2e5", "#bbcdee", "#cd9fea").setMidpoint(1444).getColors();
    const gradientB = new Gradient().setColorGradient("#5e4fe9", "#ee8138", "#049fe6", "#ec99b2", "#5e4fe9").setMidpoint(1444).getColors();
    const gradientC = new Gradient().setColorGradient("#0d2151", "#84dded", "#cbd0ef", "#bb8ef3", "#0d2151").setMidpoint(1444).getColors();

    const date = new Date();

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const [ color, setColor ] = useState(hours*60+minutes);

    const [clockHours, setClockHours] = useState(ui_addNull(hours));
    const [clockMinutes, setClockMinuter] = useState(ui_addNull(minutes));
    const [clockSeconds, setClockSeconds] = useState(ui_addNull(seconds));
    const [currDate, setCurrDate] = useState(day+' '+ui_monthName[month]+' '+year+' г.');

    useEffect(() => {
        const interval = setInterval(() => {
            const date = new Date();

            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDate();

            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();

            setClockHours(ui_addNull(hours));
            setClockMinuter(ui_addNull(minutes));
            setClockSeconds(ui_addNull(seconds));

            setColor(hours*60+minutes);

            setCurrDate(day+' '+ui_monthName[month]+' '+year+' г.');
        }, 1000);
        
        return () => clearInterval(interval);
    }, []);

    const style = {
        background: 'linear-gradient(0deg, '+gradientA[color]+' 0%, '+gradientB[color]+' 50%, '+gradientC[color]+' 100%)',
    }

    const sunMoonStyle = {
        transform: 'rotateZ('+(color/4+90)+'deg)'
    }

    const moonStyle = {
        transform: 'rotateZ('+(-color/4-90)+'deg)'
    }

    return(
        <div className={css.background} style={style}>
            <div className={css.component}>
                <div className={css.clockCont}>
                    <div className={css.clockNum}>{clockHours}</div>
                    <div className={css.clockSeparator}>:</div>
                    <div className={css.clockNum}>{clockMinutes}</div>
                    <div className={css.clockSeparator}>:</div>
                    <div className={css.clockNum}>{clockSeconds}</div>
                </div>
                <div className={css.dateCont}>Сегодня {currDate}</div>
                <div className={css.sunMoonCont} style={sunMoonStyle}><Moon style={moonStyle} /><Sun /></div>
                <div className={css.cloudContLeft} style={{animationDuration: '30s', top: 30}}><Cloud /></div>
                <div className={css.cloudContRight} style={{animationDuration: '45s', top: 50}}><Cloud /></div>
                <div className={css.cloudContLeft} style={{animationDuration: '55s', top: 70}}><Cloud /></div>
                <div className={css.cloudContRight} style={{animationDuration: '60s', top: 80}}><Cloud /></div>
                <div className={css.cloudContRight} style={{animationDuration: '20s', top: 90}}><Cloud /></div>
                <div className={css.cloudContLeft} style={{animationDuration: '35s', top: 110}}><Cloud /></div>
                <div className={css.cloudContLeft} style={{animationDuration: '55s', top: 110}}><Cloud /></div>
                <div className={css.cloudContRight} style={{animationDuration: '80s', top: 150}}><Cloud /></div>
            </div>
            
        </div>
    )
}