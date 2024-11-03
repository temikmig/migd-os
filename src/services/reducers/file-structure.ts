import { 
    COPY_FILE
} from '../constants/file-structure';

const initialState:any = {
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
                    // {
                    //     id: '5a01d6cc-4b2c-4529-8701-90fb89300763',
                    //     name: 'Папка',
                    //     title: 'Папка',
                    //     type: 'folder',
                    //     location: ':root/:desktop',
                    //     application: 'FileGuide',
                    // },
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
                    
                    /*, 
                    {
                        id: '91522911-c24c-4550-a2d9-75a4d794ba0d',
                        name: 'Вторая папка',
                        title: 'Приложения',
                        type: 'folder',
                        location: ':root/:desktop',
                        application: 'FileGuide'
                    }, 
                    {
                        id: 'a1012d85-f577-4560-8cef-23e8b331ee81',
                        name: 'Текстовый файл',
                        title: 'Текстовый файл',
                        type: 'file',
                        location: ':root/:desktop',
                        application: 'TextEditor'
                    }, 
                    {
                        id: 'cd24949d-fbdc-4539-a7bb-f51d6a3d0916',
                        name: 'calc',
                        title: 'Калькулятор',
                        type: 'file',
                        location: ':root/:desktop',
                        application: 'Calculator'
                    }*/
                ]
            }, 
            {
                id: 'id-applications',
                name: ':applications',
                title: 'Приложения',
                type: 'folder',
                location: ':root',
                application: 'FileGuide',
                
            }, 
            {
                id: 'id-recyclebin',
                name: ':recycle-bin',
                title: 'Корзина',
                type: 'folder',
                location: ':root',
                application: 'FileGuide'
            }
        ]
    }
};

export const fileStructureReducer = (state = initialState, action:any) => { 
    switch (action.type) {
        case COPY_FILE: return { 
            ...state, 
        }

        default: return state
    }
}