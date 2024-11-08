import { FC, MouseEvent, ReactNode } from 'react';
import css from './file-guide-option-button.module.css';

type T = {
    children: ReactNode,
    handleClick: (e:MouseEvent<HTMLDivElement>) => void,
    active?: boolean
}

export const FileGuideOptionButton:FC<T> = (props) => {
    return(
        <div className={`${css.fileGuideOptionButton} ${props.active&&css.fileGuideOptionButtonActive}`} onClick={props.handleClick}>{props.children}</div>
    )
}

export default FileGuideOptionButton