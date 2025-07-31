import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {
    transform(value: string | Date): string {
        if (!value) {
            return '';
        }

        const now = new Date(); //current date, all data
        const date = new Date(value); //date from post, when it was created
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000); //seconds between now and when post was created

        if (seconds < 60) {
            return 'Just now';
        }

        const intervals = { // all in seconds
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60
        }

        let counter: number;

        for(const [unit, secondsInput] of Object.entries(intervals)) {
            counter = Math.floor(seconds / secondsInput);

            if(counter > 0) {
                return `${counter} ${unit}${counter === 1 ? '' : 's'} ago`;
            }
        }

        return 'Just now';
    }
}