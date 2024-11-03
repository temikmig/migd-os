import { FC, MouseEvent, useContext } from "react";
import css from './control-bar.module.css';
import { useSelector } from "../../../../services/types/hooks";
import { findNode, findNodeType, findUp } from "../../../../utils/config";
import { imageGuideContext } from "../../image-guide";

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