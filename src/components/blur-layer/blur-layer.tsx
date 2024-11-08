import { FC, MouseEvent, useRef } from 'react';
import css from './blur-layer.module.css';
import { useDispatch } from '../../services/types/hooks';
import { checkStartMenu } from '../../services/actions/start-menu';
import { CSSTransition } from 'react-transition-group';

type T = {
    view: boolean
}

const BlurLayer:FC<T> = ({view}) => {
    const dispatch = useDispatch();
    const contTransition = {
        enter: css.contEnter,
        enterActive: css.contEnterActive,
        exit: css.contExit,
        exitActive: css.contExitActive
    }
    
    const handleMouseDown = (e:MouseEvent<HTMLDivElement>) => {
        dispatch(checkStartMenu(false));
    }

    const blurLayerRef = useRef(null)

    return(
        <CSSTransition nodeRef={blurLayerRef} in={view} timeout={400} classNames={contTransition} unmountOnExit>
        <div ref={blurLayerRef} className={css.blurLayer} onClick={handleMouseDown}></div>
        </CSSTransition>
    )
}

export default BlurLayer;