import { TNavBarActions } from '../actions/nav-bar';
import { 
    REPOSITION_NAV_BAR,
    ADD_NAV_BAR,
    REMOVE_NAV_BAR
} from '../constants/nav-bar';

export interface INavBar {
    apps: Array<INavBarItem>
}

export interface INavBarItem {
    id: string,
    uid: string
}

const initialState:INavBar = {
    apps: [
        {
            id: '00000000-0000-0000-0000-000000000002', 
            uid: 'a785fea7-e56d-4bbf-ba18-8741b46c9574'
        },
        {
            id: '00000000-0000-0000-0000-000000000003',
            uid: 'a8259404-509f-4068-a357-63295c729395'
        },
        {
            id: '00000000-0000-0000-0000-000000000004',
            uid: 'cc37c384-eeeb-4015-880a-19e2b5074d76'
        }
    ]
};

export const navBarReducer = (state = initialState, action:TNavBarActions) => { 
    switch (action.type) {
        case REPOSITION_NAV_BAR: return { 
            ...state, 
            apps: action.navBarApps
        }

        case ADD_NAV_BAR: return { 
            ...state, 
            apps: [{id: action.id, uid: action.uid}, ...state.apps]
        }

        case REMOVE_NAV_BAR: return { 
            ...state, 
            apps: state.apps.filter((item) => action.id!==item.id)
        }

        default: return state
    }
}