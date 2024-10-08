import { combineReducers } from 'redux';

import { openedWindowsReducer } from './open-windows';
import { fileStructureReducer } from './file-structure';
import { startMenuReducer } from './start-menu';
import { desktopIconsPositionReducer } from './desktop-icons';
import { applicationsReducer } from './applications';

export const rootReducer = combineReducers({
    openedWindows: openedWindowsReducer,
    fileStructure: fileStructureReducer,
    startMenu: startMenuReducer,
    desktopIconsPosition: desktopIconsPositionReducer,
    applications: applicationsReducer
});