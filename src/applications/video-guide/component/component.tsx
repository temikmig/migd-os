import { FC, MouseEvent, useContext, useRef, useState } from 'react';
import css from './component.module.css';
import { useSelector } from '../../../services/types/hooks';
import { findNode, findNodeType, findUp } from '../../../utils/config';
import ControlBar from './control-bar/control-bar';
import {useVideo} from 'react-use';
import { videoGuideContext } from '../video-guide';
import SliderComponent from '../../../ui/slider-component/slider-component';
import { ui_to_time } from '../../../ui/ui';
import VolumeHandler from './volume-handler/volume-handler';

type T = {
    id: string,
    structureId: string
}

export const Component:FC<T> = ({id, structureId}) => {
    const fileStructure = useSelector((store) => store.fileStructure.data);
    const { title, content } = findNode(structureId, fileStructure);
    const videoSrc = '/video/'+content;

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

    const { strId, setStrId } = useContext(videoGuideContext);

    const parentNodeId = findUp(strId, fileStructure)[1];

    const parentNode = findNode(parentNodeId, fileStructure);

    const filesList = findNodeType('video', parentNode);

    const currIndex = filesList.indexOf(strId);

    const handlePrev = (e:MouseEvent<HTMLDivElement>) => {
        const prevIndex = currIndex-1;

        const stucturePrevId = filesList[prevIndex];

        if(currIndex>0) setStrId(stucturePrevId);
    }

    const handleNext = (e:MouseEvent<HTMLDivElement>) => {
        const nextIndex = currIndex+1;

        const stuctureNextId = filesList[nextIndex];

        if(nextIndex<filesList.length) setStrId(stuctureNextId);
    }

    const [video, state, controls ] = useVideo(
        <video src={videoSrc} id={`video-${id}`} autoPlay />
    );

    const handleWatch = (e:MouseEvent<HTMLInputElement>) => {
        const inputTarget = e.target as HTMLInputElement;
        const value = Number(inputTarget.value);

        if(state.duration>0) controls.seek(value/100*state.duration);
    }

    const handlePlay = (e:MouseEvent<HTMLInputElement>) => {
        document.querySelectorAll('audio, video').forEach((element:any) => { 
            if(element.id!='video-'+id) element.pause();
        }); 

        controls.play();
    }

    return(
        <div className={css.videoComponent} onMouseLeave={handleMouseMove}>
            {showControl&&<div className={css.videoHeader}>{title}</div>}
            <div className={css.videoCont} onMouseMove={handleMouseMove}>
            {video}
            </div>
            {showControl&&
            <ControlBar handleMouseMove={handleMouseMove} handleMouseEnter={handleMouseEnter}>
                <>
                <div className={css.controlWatch}>
                    <div className={css.controlWatchTime}>{ui_to_time(Math.floor(state.time))}</div>
                    <SliderComponent color="#ffffff" handleChange={handleWatch} handleInput={handleWatch} value={(state.time/state.duration)*100} />
                    <div className={css.controlWatchTime}>-{ui_to_time(Math.floor(state.duration-state.time))}</div>
                </div>
                <div className={css.controlCont}>
                    <div className={css.controlContBlock}>
                        <VolumeHandler volume={state.volume} controls={controls} />
                    </div>
                    <div className={css.controlContBlock}>
                        <div className={`${css.controlPrev} ${currIndex==0&&css.controlDisactive}`} onClick={handlePrev}></div>
                        {state.paused?
                        <div className={css.controlPlay} onClick={handlePlay}></div>
                        :<div className={css.controlPause} onClick={controls.pause}></div>
                        }
                        <div className={`${css.controlNext} ${currIndex==filesList.length-1&&css.controlDisactive}`} onClick={handleNext}></div>
                    </div>
                    <div className={css.controlContBlock}></div>
                </div>
                </>
            </ControlBar>
            }
        </div>
    );
}

export default Component;