export const ui_monthName = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

export const ui_addNull = (number:number) => {
    if(number<10) return '0'+number;
    return number;
}