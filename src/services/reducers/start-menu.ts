import { 
    CHECK_START_MENU, 
    REPOSITION_PINED_START_MENU
} from '../constants/start-menu';

const initialState:any = {
    opened: false,
    pined: ['00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000003', 'de8f2862-268c-4735-80dd-35ac71b6da4c', '2a3bffe7-c758-4c96-935a-fe7939b95a65', '50810507-7236-4d69-80d1-748211bb2905'],
    tiles: [
        {
            id: '54166b1e-4c18-4546-a3b0-7dc5683a3bb4', 
            size: 1
        },
        {
            id: 'b344c8b5-0d99-4d58-a562-bc195b8ba455', 
            size: 1
        },
        {
            id: '372b16fa-ac69-4679-9f38-37c9baf9a202', 
            size: 2
        }
    ]

};

export const startMenuReducer = (state = initialState, action:any) => { 
    switch (action.type) {
        case CHECK_START_MENU: return { 
            ...state, 
            opened: action.startMenuState
        }

        case REPOSITION_PINED_START_MENU: return { 
            ...state, 
            pined: action.startMenuApps
        }

        default: return state
    }
}