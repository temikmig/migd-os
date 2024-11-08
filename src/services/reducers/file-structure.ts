import { findNode } from '../../utils/config';
import { 
    COPY_STRUCTURE,
    CUT_STRUCTURE,
    RENAME_STRUCTURE,
    DELETE_STRUCTURE
} from '../constants/file-structure';

const initialState:any = {
    clipboard: [],
    cutboard: [],
    data: {
        id: 'id-root',
        name: ':root',
        title: 'Корень',
        type: 'folder',
        location: '',
        application: 'FileGuide',
        children: [
            {
                id: 'id-desktop',
                name: ':desktop',
                title: 'Рабочий стол',
                type: 'folder',
                location: ':root',
                application: 'FileGuide',
                children: [
                    {
                        id: '5a01d6cc-4b2c-4529-8701-90fb89300763',
                        name: 'Новая папка',
                        title: 'Новая папка',
                        type: 'folder',
                        location: ':root/:desktop',
                        application: 'FileGuide',
                        children: []
                    },
                    {
                        id: 'e86ac874-6604-4c3e-87d6-a76a783a000c',
                        title: 'Картинка красивая',
                        type: 'image',
                        location: ':root/:desktop',
                        content: 'image1.jpg',
                        application: 'ImageGuide',
                    },
                    {
                        id: 'c019d7b9-d277-47ea-865e-9ff8432f9a82',
                        title: 'Картинка красивая 2',
                        type: 'image',
                        location: ':root/:desktop',
                        content: 'image2.jpg',
                        application: 'ImageGuide',
                    },
                    {
                        id: 'b707b8f2-50a1-4952-bfc6-b56ba7b7abc0',
                        title: 'Eminem - Lose Yourself',
                        type: 'audio',
                        location: ':root/:desktop',
                        content: 'Eminem_Lose_Yourself.mp3',
                        application: 'AudioGuide',
                    },
                    {
                        id: 'b2fe8f38-f202-4930-b7bb-4c75e6c4103c',
                        title: 'Dr. Dre ft. Snoop Dogg – Still DRE',
                        type: 'audio',
                        location: ':root/:desktop',
                        content: 'Dr._Dre _ft._Snoop_Dogg_Still_DRE.mp3',
                        application: 'AudioGuide',
                    },
                    {
                        id: '6e866711-24b8-4f31-b482-ce0f37c48ced',
                        title: 'The Weeknd - Dancing In The Flames',
                        type: 'video',
                        location: ':root/:desktop',
                        content: 'The_Weeknd_Dancing_In_The_Flames.mp4',
                        application: 'VideoGuide',
                    }
                ]
            }, 
            {
                id: 'id-images',
                name: ':images',
                title: 'Изображения',
                type: 'folder',
                location: ':root',
                application: 'FileGuide',
                children: [
                    {
                        id: 'afa15092-6ed4-4cbd-b30c-040964731f67',
                        title: 'Фон 1',
                        type: 'image',
                        location: ':root/:desktop',
                        content: 'image3.jpg',
                        application: 'ImageGuide',
                    },
                    {
                        id: 'c465fcd8-9cea-4961-b1c0-a1b6c52a5a28',
                        title: 'Фон 2',
                        type: 'image',
                        location: ':root/:desktop',
                        content: 'image5.jpg',
                        application: 'ImageGuide',
                    },
                    {
                        id: '18daa609-779c-49ea-bf7b-593fd058e3d5',
                        title: 'Фон 3',
                        type: 'image',
                        location: ':root/:desktop',
                        content: 'image6.jpg',
                        application: 'ImageGuide',
                    }
                ]
            }, 
            {
                id: 'id-recyclebin',
                name: ':recycle-bin',
                title: 'Корзина',
                type: 'folder',
                location: ':root',
                application: 'FileGuide',
                children: []
            }
        ]
    }
};

export const fileStructureReducer = (state = initialState, action:any) => { 
    switch (action.type) {
        // case RENAME_STRUCTURE: { 
        //     const structure = [...state.data];

        //     function text(s) {
        //         return s;
        //     }

        //     return text(structure);
            
        // }

        default: return state
    }
}