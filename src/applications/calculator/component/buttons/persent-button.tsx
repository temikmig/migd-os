import { FC, MouseEvent, useContext } from 'react';
import css from './buttons.module.css';
import { calcContext } from '../component';

export const PersentButton:FC = () => {
    const { display, setDisplay, displayMemory, calcMemory } = useContext(calcContext);

    const handlePersent = (e:MouseEvent<HTMLDivElement>) => {
        const nDisplay = Number(display);

        
        setDisplay(''+(displayMemory==0?1:displayMemory)*nDisplay/100);
    }

    return(
        <div className={`${css.calcButton} ${css.calcButtonTopAction}`} onClick={handlePersent}>%</div>
    )
}