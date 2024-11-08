import { FC, MouseEvent } from 'react';
import css from './bottom-bar.module.css';
import NavBar from '../nav-bar/nav-bar';
import ControlBar from '../control-bar/control-bar';
import DateBar from '../date-bar/date-bar';
import { useDispatch, useSelector } from '../../services/types/hooks';

const BottomBar:FC = () => {
    const dispatch = useDispatch();

    const isStartMenu = useSelector((store) => store.startMenu.opened);

    const handleOutside = (e:MouseEvent<HTMLDivElement>) => {
        // if(isStartMenu) dispatch(checkStartMenu(false));
    };
    
    return(
        <div className={css.bottomBar} onMouseDown={handleOutside}>
            <div className={css.bottomLeftBar}></div>
            <NavBar />
            <div className={css.bottomRightBar}>
                <ControlBar />
                <DateBar />
            </div>
        </div>
    )
}

export default BottomBar;