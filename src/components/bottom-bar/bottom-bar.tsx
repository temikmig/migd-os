import React from 'react';
import css from './bottom-bar.module.css';
import NavBar from '../nav-bar/nav-bar';
import ControlBar from '../control-bar/control-bar';
import DateBar from '../date-bar/date-bar';

const BottomBar = () => {
    return(
        <div className={css.bottomBar}>
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