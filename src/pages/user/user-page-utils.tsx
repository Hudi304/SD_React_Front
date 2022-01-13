


export const weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";


export const colors = new Array(7);
colors[0] = "#4287f5"
colors[1] = "#f731e0"
colors[2] = "#f50707"
colors[3] = "#f59607"
colors[4] = "#35ff08"
colors[5] = "#2b7a00"
colors[6] = "#4804c7"


export function splitByDays(logArray: any[], days) {
    const now = new Date()
    const res = Array.from(Array(days), () => new Array(0));
    let i = 0

    let firstLogDate = new Date(logArray[0]?.date)
    firstLogDate.setMinutes(firstLogDate.getMinutes() + now.getTimezoneOffset())

    let prevDate = firstLogDate.getDate()
    let currentDate = firstLogDate.getDate()

    logArray.forEach((log) => {
        const logDate = new Date(log.date)
        logDate.setMinutes(logDate.getMinutes() + now.getTimezoneOffset())
        res[i].push(log)

        currentDate = logDate.getDate()
        if (prevDate != currentDate) {
            prevDate = currentDate
            i++
        }
    })

    return res
}


export function splitByHours(logArray: any[]) {
    const now = new Date()
    const res = Array.from(Array(24), () => new Array(0));
    let firstLogDate = new Date(logArray[0]?.date)
    firstLogDate.setMinutes(firstLogDate.getMinutes() + now.getTimezoneOffset())

    logArray.forEach((log) => {
        const logDate = new Date(log.date)
        logDate.setMinutes(logDate.getMinutes() + now.getTimezoneOffset())
        const hour = logDate.getHours()
        res[hour].push(log)
    })
    return res
}

export function getWeeklyAvarageDataset(weekSplitByHours: any) {
    console.log("weekSplitByHours : ", weekSplitByHours)
    const res: any[] = []
    weekSplitByHours.forEach(logsByHour => {
        let hourSum = 0
        logsByHour.forEach(log => {
            hourSum += log.value
        });
        res.push(hourSum / logsByHour.length)
    });

    // console.log("AVARAGE : ", res)
    return res;

}

export function getLastN_Days(logArray: any[], days: any) {
    const now = new Date()
    const lastNDaysLogs = logArray.filter((log) => {
        const logDate = new Date(log.date)
        logDate.setMinutes(logDate.getMinutes() + now.getTimezoneOffset())
        if (logDate.getDate() > now.getDate() - days) {
            return true
        }
        else {
            return false
        }
    })
    // console.log("lastNDaysLogs : ", lastNDaysLogs)
    return lastNDaysLogs
}

export function normaliseHours(hoursArray: any[], type: number) {
    const now = new Date()
    const res = new Array(24).fill(0)

    hoursArray.forEach(log => {
        const logDate = new Date(log.date)
        logDate.setMinutes(logDate.getMinutes() + now.getTimezoneOffset())
        if (type == 1) {
            //sum
            res[logDate.getHours()] += log.value
        }
    });
    return res
}


export function computeDatasets(split_by_days: any[], type: number) {
    const res: any[] = []
    split_by_days.forEach(dayArray => {
        const label = weekday[new Date(dayArray[0]?.date).getDay()] + ""
        let color = colors[new Date(dayArray[0]?.date).getDay()]
        const dataset = {
            label: label,
            data: normaliseHours(dayArray, type),
            borderColor: color,
            backgroundColor: color,
            tension: 0.5
        }
        res.push(dataset)
    });
    return res
}



export const userColumns = [

    {
        title: 'Device',
        field: 'deviceDescription'
    },
    {
        title: 'Date',
        field: 'date'
    },

    {
        title: 'Hour',
        field: 'hour'
    },
    {
        title: 'Val',
        field: 'value'
    }
]

export const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];



export const lineChartData = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: [32, 12, 13, 16, 71, 54],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: [12, 13, 16, 71, 54, 32],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};


export const options = {
    responsive: true
}



export function getHoursLabesArray() {
    const res: any[] = []
    for (let i = 0; i < 24; i++) {
        res.push(`${i}:00`)
    }

    return res
}
