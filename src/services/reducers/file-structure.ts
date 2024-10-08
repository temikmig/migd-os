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
                    {
                        id: '5a01d6cc-4b2c-4529-8701-90fb89300763',
                        name: 'Папка',
                        title: 'Папка',
                        type: 'folder',
                        location: ':root/:desktop',
                        application: 'FileGuide',
                    }/*, 
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