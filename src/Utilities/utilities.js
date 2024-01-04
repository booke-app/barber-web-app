import dayjs from "dayjs";
import {request} from "./Request";

export const printHourDiv = () => {
    let hoursOfDay = 24
    let hourDivs = []
    let spaces = 60 / 15 //spaces in an hour ( 4 15minute slots)
    for (let i = 0; i < hoursOfDay; i++) {
        let fiveMinutesInAnHour = []
        for (let x = 0; x < spaces; x++) {
            fiveMinutesInAnHour.push(x)
        }
        hourDivs.push({
            time: dayjs().hour(i),
            slots: fiveMinutesInAnHour
        })
    }
    return hourDivs
}

export const clientId = '430690229215-4v527q5hk52q3fnh2qe3tcqfib1vkkoo.apps.googleusercontent.com'

export const weekCreator = [{
    type: 'add',
    number: 0
}, {type: 'add', number: 1}, {
    type: 'add',
    number: 2
}, {type: 'add', number: 3},
    {type: 'add', number: 4},
    {type: 'add', number: 5},
    {type: 'add', number: 6}]
export const twoDayCreator = [
    {type: 'add', number: 0},
    {type: 'add', number: 1},
]
export const threeDayCreator = [{type: 'add', number: 0},
    {type: 'add', number: 1},
    {type: 'add', number: 2},
]
export const oneDayCreator = [{type: 'add', number: 0}
]

export const indexOfDays = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,

}
const uploadSingleImage = async (base64, place) => {

    try {
        const res = await request('/upload-image', {
            image: base64,
            place
        }, null, 'POST')
    } catch (e) {
        throw new Error(e)
    }


}

export const doTwoArraysContainTheSameValues = (array1, array2) => {
    let areTheArraysTheSame = true
    if (array1.length !== array2.length) {
        areTheArraysTheSame = false
        return areTheArraysTheSame
    }

    array1.map(arrItem => {
        if (array2.filter(arr2Item => arr2Item === arrItem).length === 0) {
            areTheArraysTheSame = false
            return areTheArraysTheSame
        }

    })
    return areTheArraysTheSame

}


export const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};


export const uploadImage = async (event, place) => {
    const files = event.target.files;
    console.log(files.length);

    if (files.length === 1) {
        const base64 = await convertBase64(files[0]);
        return await uploadSingleImage(base64, place);

    }
};


export const hoursInDayArrayConstructor = () => {
    let hours = 24
    let arr = []
    for (let i = 0; i < hours; i++) {
        arr.push(i < 10 ? "0" + i : i)
    }


    return arr

}
export const minutesInHourArrayConstructor = () => {
    let hours = 60
    let arr = []
    for (let i = 0; i !== hours; i++) {
        arr.push(i < 10 ? "0" + i : i)
    }


    return arr

}


export const isDateGivenTheSameOrBetweenTwoDateObjects = (dateWeWantToCompare, firstDateObject, secondDateObject) => {
    if ((dayjs(firstDateObject).isSame(dayjs(dateWeWantToCompare), 'minutes') || dayjs(secondDateObject).isSame(dayjs(dateWeWantToCompare), 'minutes') ||
        dayjs(dateWeWantToCompare).isBetween(dayjs(firstDateObject), dayjs(secondDateObject), 'minutes'))) {
        return true
    }

}

export const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
}


export const turnPixelsIntoHoursAndMinutes = (pixels) => {
    // Calculate hours
    let hours = Math.floor(pixels / 120);

    // Calculate remaining pixels for minutes
    const remainingPixels = pixels % 120;

    // Calculate minutes
    let minutes = Math.floor(remainingPixels / 2);

    if (minutes < 10) {
        minutes = '0' + minutes
    }
    if (hours < 10) {
        hours = '0' + hours
    }
    return {hours, minutes};

}

export const handleDragOver = (e) => {
    e.preventDefault()
}


export const returnADateObjectInWhichTheYearMonthAndDayRemainTheSameButOnlyTheHoursAndMinutesChange = (dateObjectFromWhichWeWillHoldYearMonthAndDate, pixelsToCalculateHoursAndMinutes, indexOfDay) => {
    return dayjs(new Date(
        parseInt(dayjs(dateObjectFromWhichWeWillHoldYearMonthAndDate).format('YYYY')),
        parseInt(dayjs(dateObjectFromWhichWeWillHoldYearMonthAndDate).format('MM')) - 1,
        parseInt(dayjs(dateObjectFromWhichWeWillHoldYearMonthAndDate).format('DD')),
        turnPixelsIntoHoursAndMinutes(pixelsToCalculateHoursAndMinutes).hours,
        turnPixelsIntoHoursAndMinutes(pixelsToCalculateHoursAndMinutes).minutes
    )).$d

}


export const roundPixelsToTheNearestPixelWhichWillProduceAFiveMinute = (y) => {
    let pixels

    for (let i = 0; i < 13; i++) {
        if (y < 10) {
            pixels = 0

        }
        if ((y > (i * 10)) && (y < ((i + 1) * 10))) {
            pixels = i * 10
        }
        if ((y === (i * 10))) {
            pixels = i * 10
        }
    }


    return pixels
}












