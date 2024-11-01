import { TStartMenuActions } from '../actions/start-menu';
import { 
    CHECK_START_MENU, 

    REPOSITION_START_MENU_PINED,
    ADD_START_MENU_PINED,
    ADD_START_MENU_PINED_UID,
    REMOVE_START_MENU_PINED,
    REMOVE_START_MENU_PINED_UID,
    
    REPOSITION_START_MENU_TILES,
    ADD_START_MENU_TILES,
    ADD_START_MENU_TILES_UID,
    REMOVE_START_MENU_TILES,
    REMOVE_START_MENU_TILES_UID
} from '../constants/start-menu';

interface IStartMenu {
    opened: boolean,
    pined: Array<IStartMenuItem>,
    tiles: Array<IStartMenuItem>
}

export interface IStartMenuItem {
    id: string,
    uid: string
}

const initialState:IStartMenu = {
    opened: false,
    pined: [
        {
            id: '00000000-0000-0000-0000-000000000002', 
            uid: 'febeeec6-a967-4487-b2fe-82752e5c7492'
        },
        {
            id: '00000000-0000-0000-0000-000000000003',
            uid: 'd9c56c50-b68b-4360-b700-3221c7dd36b6'
        },
        {
            id: '00000000-0000-0000-0000-000000000004',
            uid: 'fb008373-e661-4200-a513-d15dfc820615'
        },
        {
            id: '2a3bffe7-c758-4c96-935a-fe7939b95a65',
            uid: 'c92fb534-a6d1-4f8e-8e2c-ae39ec8b3ec8'
        },
        {
            id: '50810507-7236-4d69-80d1-748211bb2905',
            uid: '1bb031f4-6cf7-4573-ba12-9913bf1dd0ed'
        }
    ],
    tiles: [
        {
            id: '00000000-0000-0000-0000-000000000003',
            uid: '688f11f5-784b-484d-9ee3-ea82a1ee9a5d'
        },
        {
            id: '00000000-0000-0000-0000-000000000004',
            uid: '86186d4c-2e12-433a-9e87-88f10d77d038'
        }
    ]
};

export const startMenuReducer = (state = initialState, action:TStartMenuActions) => { 
    switch (action.type) {
        case CHECK_START_MENU: return { 
            ...state, 
            opened: action.startMenuState
        }

        case REPOSITION_START_MENU_PINED: return { 
            ...state, 
            pined: action.startMenuApps
        }

        case ADD_START_MENU_PINED: return { 
            ...state, 
            pined: [{id: action.id, uid: action.uid}, ...state.pined]
        }

        case ADD_START_MENU_PINED_UID: return { 
            ...state, 
            pined: [{id: action.id, uid: action.uid}, ...state.pined]
        }

        case REMOVE_START_MENU_PINED: return { 
            ...state, 
            pined: state.pined.filter((item) => action.id!==item.id)
        }

        case REMOVE_START_MENU_PINED_UID: return { 
            ...state, 
            pined: state.pined.filter((item) => action.uid!==item.uid)
        }

        case REPOSITION_START_MENU_TILES: return { 
            ...state, 
            tiles: action.startMenuApps
        }

        case ADD_START_MENU_TILES: return { 
            ...state, 
            tiles: [{id: action.id, uid: action.uid}, ...state.tiles]
        }

        case ADD_START_MENU_TILES_UID: return { 
            ...state, 
            tiles: [{id: action.id, uid: action.uid}, ...state.tiles]
        }

        case REMOVE_START_MENU_TILES: return { 
            ...state, 
            tiles: state.tiles.filter((item) => action.id!==item.id)
        }

        case REMOVE_START_MENU_TILES_UID: return { 
            ...state, 
            tiles: state.tiles.filter((item) => action.uid!==item.uid)
        }

        default: return state
    }
}