import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import dayjs from 'dayjs';


const initialState = {
    selectedDate: dayjs(Date.now()),
    selectedDateDayName: dayjs(Date.now()).format('ddd'),
    selectedDateDayAsNumber: dayjs(Date.now()).format('DD'),
    selectedDateMonthName: dayjs(Date.now()).format('MMMM'),
    selectedDateMonthNumber: dayjs(Date.now()).format('MM'),
    year: dayjs(Date.now()).format('YYYY'),
    selectedDateInGreekFormat: "",
    appointments: []
};

const calendarSlice = createSlice({
    name: "Calendar",
    initialState,
    reducers: {
        setSelectedDate(state, action) {
            let fullDate = dayjs(action.payload.$d
            )
            let fullDateInGreekFormat = dayjs(action.payload.$d
            ).format('DD-MM-YYYY')
            let dayName = dayjs(action.payload.$d
            ).format("dddd")
            let dayNumber = dayjs(action.payload.$d
            ).format("DD")
            let monthName = dayjs(action.payload.$d
            ).format("MMMM")
            let monthNumber = dayjs(action.payload.$d
            ).format("MM")
            let year = dayjs(action.payload.$d
            ).format("YYYY")
            state.selectedDate = fullDate;
            state.selectedDateInGreekFormat = fullDateInGreekFormat;
            state.selectedDateDayName = dayName;
            state.selectedDateDayAsNumber = dayNumber;
            state.selectedDateMonthName = monthName;
            state.selectedDateMonthNumber = monthNumber;
            state.year = year;
        },

        setAppointments(state, action) {
            state.appointments = action.payload

        },
    },
});

export const {
    setSelectedDate,
    setAppointments
} = calendarSlice.actions;

export default calendarSlice.reducer;
