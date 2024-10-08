import React, { FC } from 'react';
import css from './text-editor.module.css';

// export const appIcon = '/apps-icons/file.svg';

export const appProps = {
    canExpand: true,
    canCollapse: true,
    canResize: true,
}

export const appSizes = {
    width: 400,
    height: 300
}

export const App:FC = () => {
    return(
        <textarea className={css.textEditorForm}></textarea>
    )
}

export default App;