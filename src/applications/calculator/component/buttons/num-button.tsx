import { FC, useContext, MouseEvent } from 'react';
import css from './buttons.module.css';
import { calcContext } from '../component';

type T = {
    num: number
}

export const NumButton:FC<T> = ({num}) => {
    const { display, setDisplay, actionFlag, setActionFlag } = useContext(calcContext);

    const handleNum = (e:MouseEvent<HTMLDivElement>) => {
        if(actionFlag) {
            setDisplay(''+num);
            setActionFlag(false);
        } else setDisplay((display!='0')?display+''+num:''+num);
    }

    return(
        <div className={`${css.calcButton} ${num==0&&css.calcButtonZero}`} onClick={handleNum}>{num}</div>
    )
}