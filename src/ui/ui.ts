import uuid from "react-uuid";
import { openWindow } from "../services/actions/open-windows";
import { useDispatch } from "../services/types/hooks";
import { DOCUMENT_HEIGHT, DOCUMENT_WIDTH } from "../utils/config";

export const ui_monthName = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

export const ui_addNull = (number:number) => {
    if(number<10) return '0'+number;
    return number;
}


export function actionOpenApp(id: string, name: string, currentSizes: { height: number; width: number; }, currentProps: any) {
    return openWindow({
        id: uuid(),
            
        properties: {
            top: (DOCUMENT_HEIGHT / 2) - (currentSizes.height / 2),
            left: (DOCUMENT_WIDTH / 2) - (currentSizes.width / 2),
            width: currentSizes.width,
            height: currentSizes.height
        },
        winProps: currentProps,
        winStates: {
            isActive: true,
            isExpand: false,
            isCollapse: false,
            isDragging: true
        },
        application: name,
        applicationId: id
    });
}