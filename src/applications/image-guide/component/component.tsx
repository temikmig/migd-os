import { createContext, FC, MouseEvent, useContext, useEffect, useRef, useState } from 'react';
import css from './component.module.css';
import { useSelector } from '../../../services/types/hooks';
import { findNode, findNodeType, findUp } from '../../../utils/config';
import { IOpenWindowItem } from '../../../services/reducers/open-windows';
import ControlBar from './control-bar/control-bar';
import ContextMenuBottom from '../../../utils/context-menu-bottom/context-menu-bottom';
import { imageGuideContext } from '../image-guide';

type T = {
    id: string,
    structureId: string
}

export const Component:FC<T> = ({id, structureId}) => {
    const fileStructure = useSelector((store) => store.fileStructure.data);
    const { title, content } = findNode(structureId, fileStructure);
    const imageSrc = 'images/'+content;

    const [ showControl, setShowControl ] = useState(true);

    const timeout = useRef<number | null>(null);

    const handleMouseMove = (e:MouseEvent<HTMLDivElement>) => {
        if(!showControl) setShowControl(true);

        if(timeout.current !== null) window.clearTimeout(timeout.current);

        timeout.current = window.setTimeout(() => {
            setShowControl(false);
        }, 3000)
    }

    const handleMouseEnter = (e:MouseEvent<HTMLDivElement>) => {
        setShowControl(true);

        if(timeout.current !== null) window.clearTimeout(timeout.current);
    }

    const { strId, setStrId } = useContext(imageGuideContext);

    const parentNodeId = findUp(strId, fileStructure)[1];

    const parentNode = findNode(parentNodeId, fileStructure);

    const imagesList = findNodeType('image', parentNode);

    const currIndex = imagesList.indexOf(strId);

    const handlePrev = (e:MouseEvent<HTMLDivElement>) => {
        const prevIndex = currIndex-1;

        const stucturePrevId = imagesList[prevIndex];

        if(currIndex>0) setStrId(stucturePrevId);
    }

    const handleNext = (e:MouseEvent<HTMLDivElement>) => {
        const nextIndex = currIndex+1;

        const stuctureNextId = imagesList[nextIndex];

        if(nextIndex<imagesList.length) setStrId(stuctureNextId);
    }

    useEffect(() => {
        timeout.current = window.setTimeout(() => {
            setShowControl(false);
        }, 3000)
    }, [])

    return(
        <div className={css.imageComponent} onMouseLeave={handleMouseMove}>
            <div className={css.imageHeader}>{title}</div>
            <div className={css.imageCont} style={{backgroundImage: 'url('+imageSrc+')'}}  onMouseMove={handleMouseMove}>
            </div>
            {showControl&&
            <ControlBar handleMouseMove={handleMouseMove} handleMouseEnter={handleMouseEnter}>
                <>
                <div className={`${css.controlLeft} ${currIndex==0&&css.controlDisactive}`} onClick={handlePrev}></div>
                <div className={`${css.controlRight} ${currIndex==imagesList.length-1&&css.controlDisactive}`} onClick={handleNext}></div>
                </>
            </ControlBar>
            }
        </div>
    );
}

export default Component;