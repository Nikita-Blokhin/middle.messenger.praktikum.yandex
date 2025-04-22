import isEqual from './IsEqual';

export default function formatTime (dateString: string, only_time: boolean = false): string {
    const date = new Date(dateString);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    const mounth = date.getUTCMonth().toString().padStart(2, '0');
    const year = date.getUTCFullYear().toString();
    const full_date = [day, mounth, year].join('.');

    const today = new Date();
    const today_day = today.getUTCDate().toString().padStart(2, '0');
    const today_mounth = today.getUTCMonth().toString().padStart(2, '0');
    const today_year = today.getUTCFullYear().toString();
    const today_full_date = [today_day, today_mounth, today_year].join('.');;

    if (isEqual(full_date,today_full_date) || only_time) return `${hours}:${minutes}`;
    return full_date;
};
