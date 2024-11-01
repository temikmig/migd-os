import { FC, useState, useMemo, createContext } from 'react';
import css from './component.module.css';
import { NumButton } from './buttons/num-button';
import { ActionButton } from './buttons/action-button';
import { ClearButton } from './buttons/clear-button';
import { NegativeButton } from './buttons/negative-button';
import { PersentButton } from './buttons/persent-button';
import { ResultButton } from './buttons/result-button';
import { DotButton } from './buttons/dot-button';

export const calcActions = [0, '+', '-', '*' , '/']

export const calcContext = createContext({
    display: '',
    setDisplay: (display:string) => {},
    displayMemory: 0,
    setDisplayMemory: (displayMemory:number) => {},
    calcMemory: 0,
    setCalcMemory: (calcMemory:number) => {},
    action: 0,
    setAction: (action:0|1|2|3|4) => {},
    actionFlag: false,
    setActionFlag: (actionFlag:boolean) => {},
    dotFlag: false,
    setDotFlag: (dotFlag:boolean) => {},
    resultFlag: false,
    setResultFlag: (resultFlag:boolean) => {}
});

export const Component:FC = () => {
    const [ display, setDisplay ] = useState('0');
    const [ displayMemory, setDisplayMemory ] = useState(0);
    const [ calcMemory, setCalcMemory ] = useState(0);
    const [ action, setAction ] = useState(0);
    const [ actionFlag, setActionFlag ] = useState(false);
    const [ dotFlag, setDotFlag ] = useState(false);
    const [ resultFlag, setResultFlag ] = useState(false);

    const value = useMemo(() => ({
        display, setDisplay, 
        displayMemory, setDisplayMemory, 
        calcMemory, setCalcMemory,
        action, setAction,
        actionFlag, setActionFlag, 
        dotFlag, setDotFlag,
        resultFlag, setResultFlag
    }), [display, displayMemory, calcMemory, action, actionFlag, dotFlag, resultFlag]);

    return(
        <calcContext.Provider value={value}>
            <div className={css.calcContainer}>
                <div className={css.calcDisplay}>{display}</div>
                <div className={css.calcButtons}>
                    <ClearButton />
                    <NegativeButton />
                    <PersentButton />
                    <ActionButton action={4}/>
                    <NumButton num={7}/>
                    <NumButton num={8}/>
                    <NumButton num={9}/>
                    <ActionButton action={3}/>
                    <NumButton num={4}/>
                    <NumButton num={5}/>
                    <NumButton num={6}/>
                    <ActionButton action={2}/>
                    <NumButton num={1}/>
                    <NumButton num={2}/>
                    <NumButton num={3}/>
                    <ActionButton action={1}/>
                    <NumButton num={0}/>
                    <DotButton />
                    <ResultButton />
                </div>
            </div>
        </calcContext.Provider>
    )
}