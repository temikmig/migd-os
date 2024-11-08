import { FC, useContext } from 'react';
import css from './buttons.module.css';
import { calcContext } from '../component';

export const ClearButton:FC = () => {
    const { setDisplay, setDotFlag, setCalcMemory, setDisplayMemory, setAction, setActionFlag, setResultFlag} = useContext(calcContext);

    const handleClear = (e:any) => {
        setDisplay('0');
        setDotFlag(false);
        setCalcMemory(0);
        setDisplayMemory(0);
        setAction(0);
        setActionFlag(false);
        setResultFlag(false);
    }

    return(
        <div className={`${css.calcButton} ${css.calcButtonTopAction}`} onClick={handleClear}>C</div>
    )
}