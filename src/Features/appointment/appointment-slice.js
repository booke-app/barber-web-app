import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState = {
    isAppointmentSlideOverOpen: false,
    selectedAppointment: null,
    selectedTime: null,
    selectedService: null,
    isAddEventManuallyPressed: null,
    indexOfDayThatWasPressed: null
};

const appointmentSlice = createSlice({
    name: "Appointment",
    initialState,
    reducers: {
        setSelectedTime(state, action) {
            state.selectedTime = action.payload

        }, setSelectedService(state, action) {
            state.selectedService = action.payload

        },
        setIsAppointmentSlideOverOpen(state, action) {
            state.isAppointmentSlideOverOpen = action.payload

        },
        setIsAddEventManuallyPressed(state, action) {
            state.isAddEventManuallyPressed = action.payload

        },
        setIndexOfDayThatWasPressed(state, action) {
            state.indexOfDayThatWasPressed = action.payload
        }
    },
});

export const {
    setIsAppointmentSlideOverOpen,
    setSelectedService,
    setSelectedTime, setIsAddEventManuallyPressed,
    setIndexOfDayThatWasPressed
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
