import { FC, MouseEvent, useContext } from 'react';
import css from './buttons.module.css';
import { calcActions, calcContext } from '../component';

type T = {
    action: 1 | 2 | 3 | 4
}

export const ActionButton:FC<T> = ({action}) => {
    const { display, setCalcMemory, setDisplayMemory, setAction, setActionFlag, setResultFlag, setDotFlag } = useContext(calcContext);

    const handleAction = (e:MouseEvent<HTMLDivElement>) => {
        const toDisplay = Number(display);

        setCalcMemory(toDisplay);
        setDisplayMemory(toDisplay);
        setAction(action);
        setActionFlag(true);
        setResultFlag(false);
        setDotFlag(false);
    }

    return(
        <div className={`${css.calcButton} ${css.calcButtonAction}`} onClick={handleAction}>{calcActions[action]}</div>
    )
}