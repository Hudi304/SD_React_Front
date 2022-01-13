import moment from 'moment';
import * as momentTz from 'moment-timezone';

class DateUtilsClass {
    private timeZone: string;
    constructor() {
        this.timeZone = 'Europe/Bucharest';
    }
    setTimeZone(timeZone) {
        this.timeZone = timeZone;
    }
    convertDateToUTCString(date) {
        const dateString = moment(date).format('YYYY-MM-DDTHH:mm:ss');
        return momentTz.tz(dateString, this.timeZone).utc().format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';
    }
    convertUTCStringToDate(utcString) {
        return this.absoluteStringToDate(momentTz.utc(utcString).tz(this.timeZone).format('YYYY-MM-DDTHH:mm:ss.SSS'));
    }
    absoluteStringToDate(dateString) {
        const date = new Date(moment(dateString ? dateString.split('Z')[0] : undefined).format());
        date.setMilliseconds(moment(dateString).milliseconds());
        return date;
    }
}

export const DateUtils = new DateUtilsClass();
