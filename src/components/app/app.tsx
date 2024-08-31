import React from 'react';
import css from './app.module.css';
import ContentBar from '../content-bar/content-bar';
import BottomBar from '../bottom-bar/bottom-bar';

const App = () => {
    return(
        <main className={css.bg}>
            <ContentBar />
            <BottomBar />
        </main>
    )
}

export default App;