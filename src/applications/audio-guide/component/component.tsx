import { FC, MouseEvent, useContext, useRef, useState } from 'react';
import css from './component.module.css';
import { useSelector } from '../../../services/types/hooks';
import { findNode, findNodeType, findUp } from '../../../utils/config';
import ControlBar from './control-bar/control-bar';
import {useAudio} from 'react-use';
import { audioGuideContext } from '../audio-guide';
import SliderComponent from '../../../ui/slider-component/slider-component';
import { ui_to_time } from '../../../ui/ui';
import Wave from 'react-wavify'
import VolumeHandler from './volume-handler/volume-handler';

type T = {
    id: string,
    structureId: string
}

export const Component:FC<T> = ({id, structureId}) => {
    const fileStructure = useSelector((store) => store.fileStructure.data);
    const { title, content } = findNode(structureId, fileStructure);
    const audioSrc = 'audio/'+content;

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

    const { strId, setStrId, background } = useContext(audioGuideContext);

    const parentNodeId = findUp(strId, fileStructure)[1];

    const parentNode = findNode(parentNodeId, fileStructure);

    const filesList = findNodeType('audio', parentNode);

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

    const [audio, state, controls ] = useAudio(
        <audio src={audioSrc} id={`audio-${id}`} autoPlay />
    );

    const handlePlay = (e:MouseEvent<HTMLInputElement>) => {
        document.querySelectorAll('audio, video').forEach((element:any) => { 
            if(element.id!='audio-'+id) element.pause();
        }); 

        controls.play();
    }

    const handleWatch = (e:MouseEvent<HTMLInputElement>) => {
        const inputTarget = e.target as HTMLInputElement;
        const value = Number(inputTarget.value);

        if(state.duration) controls.seek(value/100*state.duration);
    }

    const style = {
        backgroundColor: background
    }

    return(
        <div className={css.audioComponent} style={style} onMouseLeave={handleMouseMove}>
            {showControl&&<div className={css.audioHeader}>{title}</div>}
            <div className={css.audioCont} onMouseMove={handleMouseMove}>
                <Wave fill='url(#gradient)'
                    paused={state.paused}
                    style={{ display: 'flex', height: '100%', position: 'absolute', bottom: 0 }}
                    options={{
                    height: 150,
                    amplitude: 40,
                    speed: 0.3,
                    points: 10
                    }}
                >
                    <defs>
                        <linearGradient id="gradient" gradientTransform="rotate(90)">
                        <stop offset="0%"  stopColor="transparent" />
                        <stop offset="100%" stopColor="#3e49d7" />
                        </linearGradient>
                    </defs>
                </Wave>
                {audio}
            </div>
            <div style={{display: 'none'}}><VolumeHandler volume={state.volume} controls={controls} /></div>
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