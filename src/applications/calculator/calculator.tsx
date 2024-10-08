import React, { FC, useState } from 'react';
import css from './calculator.module.css';

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
    const [display, setDisplay] = useState('0');

    const [memory, setMemory] = useState('');

    const [action, setAction] = useState('');

    const checkDisplay = (num:any) => {
        setDisplay(display!='0'&&action==''?display+''+num:(display=='0'&&num=='.')?display+''+num:num);
    }

    const checkAction = (action:any) => {
        setMemory(display);
        setAction(action);
    }

    const checkResult = () => {
        const result = eval(memory+''+action+''+display);
        setDisplay(result);
    }

    const checkClear = () => {
        setDisplay('0');
        setAction('');
    }

    return(
        <div className={css.calcContainer}>
            <div className={css.calcDisplay}>{display}</div>
            <div className={css.calcButtons}>
                <div onClick={checkClear} className={`${css.calcButton} ${css.calcButton1} ${css.calcButtonTopOptions}`}>AC</div>
                <div className={`${css.calcButton} ${css.calcButton2} ${css.calcButtonTopOptions}`}>&#177;</div>
                <div className={`${css.calcButton} ${css.calcButton3} ${css.calcButtonTopOptions}`}>%</div>
                <div onClick={e => checkAction('/')} className={`${css.calcButton} ${css.calcButton4} ${css.calcButtonOptions}`}>&#247;</div>
                <div onClick={e => checkDisplay(7)} className={`${css.calcButton} ${css.calcButton5}`}>7</div>
                <div onClick={e => checkDisplay(8)} className={`${css.calcButton} ${css.calcButton6}`}>8</div>
                <div onClick={e => checkDisplay(9)} className={`${css.calcButton} ${css.calcButton7}`}>9</div>
                <div onClick={e => checkAction('*')} className={`${css.calcButton} ${css.calcButton8} ${css.calcButtonOptions}`}>&#215;</div>
                <div onClick={e => checkDisplay(4)} className={`${css.calcButton} ${css.calcButton9}`}>4</div>
                <div onClick={e => checkDisplay(5)} className={`${css.calcButton} ${css.calcButton10}`}>5</div>
                <div onClick={e => checkDisplay(6)} className={`${css.calcButton} ${css.calcButton11}`}>6</div>
                <div onClick={e => checkAction('-')} className={`${css.calcButton} ${css.calcButton12} ${css.calcButtonOptions}`}>&#8722;</div>
                <div onClick={e => checkDisplay(1)} className={`${css.calcButton} ${css.calcButton13}`}>1</div>
                <div onClick={e => checkDisplay(2)} className={`${css.calcButton} ${css.calcButton14}`}>2</div>
                <div onClick={e => checkDisplay(3)} className={`${css.calcButton} ${css.calcButton15}`}>3</div>
                <div onClick={e => checkAction('+')} className={`${css.calcButton} ${css.calcButton16} ${css.calcButtonOptions}`}>&#43;</div>
                <div onClick={e => checkDisplay(0)} className={`${css.calcButton} ${css.calcButton17}`}>0</div>
                <div onClick={e => checkDisplay('.')} className={`${css.calcButton} ${css.calcButton18}`}>&#44;</div>
                <div onClick={checkResult} className={`${css.calcButton} ${css.calcButton19} ${css.calcButtonOptions}`}>&#61;</div>
                
            </div>
        </div>
    )
}