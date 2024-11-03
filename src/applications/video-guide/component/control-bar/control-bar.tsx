import { FC, MouseEvent } from "react";
import css from './control-bar.module.css';

type T = {
    handleMouseEnter?: (e:MouseEvent<HTMLDivElement>) => void,
    handleMouseMove?: (e:MouseEvent<HTMLDivElement>) => void,
    children?: string | JSX.Element
}

export const ControlBar:FC<T> = (props) => {
    return(
        <div className={css.controlBarCont} onMouseEnter={props.handleMouseEnter}>
            {props.children}
        </div>
    );
}

export default ControlBar;