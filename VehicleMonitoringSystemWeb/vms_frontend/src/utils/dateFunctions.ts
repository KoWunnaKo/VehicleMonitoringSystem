import {padStart} from "./stringFunctions";
import moment, {unitOfTime} from "moment";

export function dateTimeToString(datetime: Date) {
    return moment(datetime).format('DD.MM.YY HH:mm')
}

export function diffFromNowIsLessOrEqual(datetime: Date, diffUnitOfTime: unitOfTime.Diff, diffValue: number) {
    return moment().diff(datetime, diffUnitOfTime) <= diffValue;
}

export function formatDateTime(year: string, month: string, day: string, hour: string, minute: string): string {
    return `${year}-${month}-${day} ${hour}:${minute}`;
}

export function getDefaultStartDateTime(): string {
    const year: string = padStart(String(moment().toDate().getFullYear()), 2, '0');
    const month: string = padStart(String(moment().toDate().getMonth() - 3), 2, '0');
    const day: string = padStart(String(moment().toDate().getDate()), 2, '0');
    const hour: string = '09';
    const minute: string = '00';

    return formatDateTime(year, month, day, hour, minute);
}

export function getDefaultEndDateTime(): string {
    const year: string = padStart(String(moment().toDate().getFullYear()), 2, '0');
    const month: string = padStart(String(moment().toDate().getMonth() + 1), 2, '0');
    const day: string = padStart(String(moment().toDate().getDate()), 2, '0');
    const hour: string = '09';
    const minute: string = '00';

    return formatDateTime(year, month, day, hour, minute);
}

export function getDate(dateTime: string): string {
    return dateTime.split(' ')[0];
}

export function getTime(dateTime: string): string {
    return dateTime.split(' ')[1];
}
