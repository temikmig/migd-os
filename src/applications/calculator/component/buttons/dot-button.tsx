import { useContext, MouseEvent, FC } from 'react';
import css from './buttons.module.css';
import { calcContext } from '../component';

export const DotButton:FC = () => {
    const { display, setDisplay, dotFlag, setDotFlag } = useContext(calcContext);

    const handleDot = (e:MouseEvent<HTMLDivElement>) => {
        if(!dotFlag) {
            setDisplay(display+'.');
            setDotFlag(true);
        }
    }

    return(
        <div className={css.calcButton} onClick={handleDot}>.</div>
    )
}