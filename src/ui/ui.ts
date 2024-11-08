import uuid from "react-uuid";
import { openWindow } from "../services/actions/open-windows";
import { useDispatch } from "../services/types/hooks";
import { DOCUMENT_HEIGHT, DOCUMENT_WIDTH, CALENDAR_BEG, CALENDAR_END, FILEGUIDE_APP, DELETE_BIN_APP } from "../utils/config";

export const ui_monthName = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
export const ui_monthNameI = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

export const ui_addNull = (number:number) => {
    if(number<10) return '0'+number;
    return number;
}

export const ui_startOfWeek = (dt:Date):any => {
    const weekDay = ((dt.getDay()==0)?7:dt.getDay());

    const day = new Date(dt.getTime() - Math.abs(0 - weekDay) * (24 * 60 * 60 * 1000));

    return day;
}

export const ui_to_time = (time:number):string => {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;

    const hours = Math.floor(time / 3600);

    return ui_addNull(hours)+':'+ui_addNull(minutes)+':'+ui_addNull(seconds);
}

export const ui_heightCalendar = (end:any, heightItem:number) => {
    

    const dateBeg = new Date(CALENDAR_BEG.year, CALENDAR_BEG.month, 1);
    const dateEnd = new Date(end.year, end.month, end.day);

    return Math.ceil((ui_startOfWeek(dateEnd) - ui_startOfWeek(dateBeg)) / (7 * 24 * 60 * 60 * 1000)) * heightItem;
}

export const ui_dateAdd = (date:any, days:any) => {
    let newDate = new Date(date);
    const curDateNum = date.getDate();
    newDate.setDate(curDateNum + Number(days));
    return newDate;
}

export const ui_daysofmonth = (month:number) => {

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
            isExpand: false,
            isCollapse: false,
            isDragging: true
        },
        application: name,
        applicationId: id,
        structureId: id==FILEGUIDE_APP?'id-root':(id==DELETE_BIN_APP?'id-recyclebin':undefined)
    });
}

export const checkResponse = (res:Response) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export async function fetchRequest(url:string, options?:any) {
    const res = await fetch(url, options);
    return checkResponse(res);
  }