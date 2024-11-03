import { useContext, MouseEvent, FC } from 'react';
import css from './buttons.module.css';
import { evaluate } from 'mathjs'
import { calcContext } from '../component';
import Decimal from 'decimal.js';

const actionTo = (numA:number, numB:number, action:number) => {
    let result;

    switch(action) {
        case 1:
        case 2: result = new Decimal(evaluate(numA+'+'+numB)).toFixed(7); break;
        case 3: 
        case 4: result = new Decimal(evaluate(numA+'*'+numB)).toFixed(7); break;
    }

    return result;
}

const validTo = (num:number, action:number) => {
    let result;

    switch(action) {
        case 1: result = num; break;
        case 2: result = -1*num; break;
        case 3: result = num; break;
        case 4: result = 1/num; break;
        case 0: result = num; break;
    }

    return result;
}

export const ResultButton:FC = () => {
    const { display, action, actionFlag, resultFlag, calcMemory, displayMemory, setDisplay, setDotFlag, setCalcMemory, setDisplayMemory, setAction, setActionFlag, setResultFlag} = useContext(calcContext);

    const handleResult = (e:MouseEvent<HTMLDivElement>) => {
        const nDisplay = Number(display);
        const validDisplay = Number(validTo(nDisplay, action));
        
        let resDisplay = validDisplay;

        if(!actionFlag&&!resultFlag) {
            setCalcMemory(validDisplay);
        } else resDisplay = nDisplay;

        const memory = (actionFlag||resultFlag?calcMemory:displayMemory);

        const toDisplay = Number(actionTo(memory, resDisplay, action));

        if(String(toDisplay)==='Infinity') setDisplay('Не определено');
        else setDisplay(String(toDisplay));

        setDisplayMemory(toDisplay);
        setActionFlag(true);
        setResultFlag(true);
        setDotFlag(false)
    }

    return(
        <div className={`${css.calcButton} ${css.calcButtonAction}`} onClick={handleResult}>=</div>
    )
}