import { useContext, MouseEvent, FC } from 'react';
import css from './buttons.module.css';
import { calcContext } from '../component';

export const NegativeButton:FC = () => {
    const { display, setDisplay } = useContext(calcContext);

    const handleNegative = (e:MouseEvent<HTMLDivElement>) => {
        const nDisplay = Number(display);

        setDisplay(''+nDisplay*-1);
    }
    
    return(
        <div className={`${css.calcButton} ${css.calcButtonTopAction}`} onClick={handleNegative}>+/-</div>
    )
}