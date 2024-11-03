// import { 
//     COPY_FILE
// } from '../constants/file-structure';

import { DELETE_BIN_APP, FILEGUIDE_APP} from "../../utils/config";

export interface IApplications {
    data: Array<IApplicationItem>
}

export interface IApplicationItem {
    id: string,
    name: string,
    title: string,
    icon: string,
    list: boolean
}

const initialState:IApplications = {
    data: [
        {
            id: FILEGUIDE_APP,
            name: 'FileGuide',
            title: 'File Guide',
            icon: '/apps-icons/file-guide.svg',
            list: false
        },
        {
            id: DELETE_BIN_APP,
            name: 'RecycleBin',
            title: 'Корзина',
            icon: '/apps-icons/delete-bin.svg',
            list: false
        },
        {
            id: '00000000-0000-0000-0000-000000000002',
            name: 'Calculator',
            title: 'Калькулятор',
            icon: '/apps-icons/calculator.svg',
            list: true
        },
        {
            id: '00000000-0000-0000-0000-000000000003',
            name: 'Clock',
            title: 'Часы',
            icon: '/apps-icons/clock.svg',
            list: true
        },
        {
            id: '00000000-0000-0000-0000-000000000004',
            name: 'Calendar',
            title: 'Календарь',
            icon: '/apps-icons/calendar.svg',
            list: true
        },
        {
            id: '00000000-0000-0000-0000-000000000005',
            name: 'ImageGuide',
            title: 'Изображения',
            icon: '/apps-icons/image-guide.svg',
            list: true
        },
        {
            id: '00000000-0000-0000-0000-000000000006',
            name: 'AudioGuide',
            title: 'Аудиоплеер',
            icon: '/apps-icons/audio-guide.svg',
            list: true
        },
        {
            id: '00000000-0000-0000-0000-000000000007',
            name: 'VideoGuide',
            title: 'Видеоплеер',
            icon: '/apps-icons/video-guide.svg',
            list: true
        }, 
        {
            id: 'bc117402-e668-4c1f-ae59-c11d7ed7386b',
            name: 'adobeIllustrator',
            title: 'Adobe Illustrator',
            icon: '/apps-icons/adobe-illustrator.svg',
            list: true
        }, 
        {
            id: '96cae910-a9cc-489f-9126-d5d118d68dab',
            name: 'adobePhotoshop',
            title: 'Adobe Photoshop',
            icon: '/apps-icons/adobe-photoshop.svg',
            list: true
        }, 
        {
            id: 'de8f2862-268c-4735-80dd-35ac71b6da4c',
            name: 'adobeReader',
            title: 'Adobe Reader',
            icon: '/apps-icons/adobe-reader.svg',
            list: true
        }, 
        {
            id: '4bff7125-58fb-414e-bd76-55c2d7666041',
            name: 'msExcel',
            title: 'Microsoft Excel',
            icon: '/apps-icons/ms-excel.svg',
            list: true
        }, 
        {
            id: '9f308053-f40a-4f8d-b841-d780f050775a',
            name: 'msOneDrive',
            title: 'Microsoft OneDrive',
            icon: '/apps-icons/ms-onedrive.svg',
            list: true
        }, 
        {
            id: '2fff74e0-031f-4175-bd26-a5e5ce6ee47e',
            name: 'msOneNote',
            title: 'Microsoft OneNote',
            icon: '/apps-icons/ms-onenote.svg',
            list: true
        }, 
        {
            id: '2a3bffe7-c758-4c96-935a-fe7939b95a65',
            name: 'msPowerPoint',
            title: 'Microsoft PowerPoint',
            icon: '/apps-icons/ms-powerpoint.svg',
            list: true
        }, 
        {
            id: '1544d79b-d4b0-4703-ace4-735730478c33',
            name: 'msWord',
            title: 'Microsoft Word',
            icon: '/apps-icons/ms-word.svg',
            list: true
        }, 
        {
            id: '50810507-7236-4d69-80d1-748211bb2905',
            name: 'Pinterest',
            title: 'Pinterest',
            icon: '/apps-icons/pinterest.svg',
            list: true
        }, 
        {
            id: '372b16fa-ac69-4679-9f38-37c9baf9a202',
            name: 'Shazam',
            title: 'Shazam',
            icon: '/apps-icons/shazam.svg',
            list: true
        }, 
        {
            id: 'cc9c1b5c-6c25-49a2-a49d-b83455fd805a',
            name: 'uTorrent',
            title: 'μTorrent',
            icon: '/apps-icons/utorrent.svg',
            list: true
        }, 
        {
            id: '15bb0305-8415-4d86-8dab-c14a723b854c',
            name: 'Snapchat',
            title: 'Snapchat',
            icon: '/apps-icons/snapchat.svg',
            list: true
        }, 
        {
            id: 'b344c8b5-0d99-4d58-a562-bc195b8ba455',
            name: 'Steam',
            title: 'Steam',
            icon: '/apps-icons/steam.svg',
            list: true
        }, 
        {
            id: '79c0136b-d776-4003-af33-83b2a9aa48e8',
            name: 'TeamViewer',
            title: 'TeamViewer',
            icon: '/apps-icons/teamviewer.svg',
            list: true
        }, 
        {
            id: '54166b1e-4c18-4546-a3b0-7dc5683a3bb4',
            name: 'Telegram',
            title: 'Telegram',
            icon: '/apps-icons/telegram.svg',
            list: true
        }
    ]
};

export const applicationsReducer = (state = initialState, action:any) => { 
    switch (action.type) {
        default: return state
    }
}