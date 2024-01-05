import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState = {
    isAppointmentSlideOverOpen: false,
    isEditAppointmentSlideOverOpen: false,
    selectedAppointment: null,
    selectedTime: null,
    selectedService: null,
    isAddEventManuallyPressed: null,
    indexOfDayThatWasPressed: null,
    selectedClient: null,
    selectedWorker: null,
    appointmentToEdit: null,
    objectThatContainsTheIdOfTheAppointmentThatWillBeEditedTheDayThatWasDroppedAtAndTheNewTopPosition: null,
    dayThatTheAppointmentWasDroppedAt: null,
    newTopPositionForAppointmentAfterDragAndDroppedOnAnotherDay: null,
    idOfAppointmentThatWillBeEdited: null

};

const appointmentSlice = createSlice({
    name: "Appointment",
    initialState,
    reducers: {
        setSelectedTime(state, action) {
            state.selectedTime = action.payload

        },
        setSelectedService(state, action) {
            state.selectedService = action.payload

        },
        setSelectedClient(state, action) {
            state.selectedClient = action.payload

        },
        setIsAppointmentSlideOverOpen(state, action) {
            state.isAppointmentSlideOverOpen = action.payload

        },
        setIsAddEventManuallyPressed(state, action) {
            state.isAddEventManuallyPressed = action.payload

        },
        setIndexOfDayThatWasPressed(state, action) {
            state.indexOfDayThatWasPressed = action.payload
        },
        setSelectedWorker(state, action) {
            state.selectedWorker = action.payload
        },
        setAppointmentToEdit(state, action) {
            state.appointmentToEdit = action.payload
            if (action.payload && !state.isAppointmentSlideOverOpen) {
                state.isEditAppointmentSlideOverOpen = true
            }
        },
        setIsEditAppointmentSlideOverOpen(state, action) {
            state.isEditAppointmentSlideOverOpen = action.payload

        },
        setDayThatTheAppointmentWasDroppedAt(state, action) {
            state.dayThatTheAppointmentWasDroppedAt = action.payload

        },
        setNewTopForAppointmentAfterDraggedAndDroppedOnAnotherDay(state, action) {
            state.newTopPositionForAppointmentAfterDragAndDroppedOnAnotherDay = action.payload
        },
        setIdOfAppointmentThatWillBeEdited(state, action) {
            state.idOfAppointmentThatWillBeEdited = action.payload
        },
        setObjectThatContainsTheIdOfTheAppointmentThatWillBeEditedTheDayThatWasDroppedAtAndTheNewTopPosition(state, action) {
            state.objectThatContainsTheIdOfTheAppointmentThatWillBeEditedTheDayThatWasDroppedAtAndTheNewTopPosition = action.payload
        }

    },
});

export const {
    setObjectThatContainsTheIdOfTheAppointmentThatWillBeEditedTheDayThatWasDroppedAtAndTheNewTopPosition,
    setIsEditAppointmentSlideOverOpen,
    setAppointmentToEdit,
    setSelectedWorker,
    setIsAppointmentSlideOverOpen,
    setSelectedClient,
    setSelectedService,
    setSelectedTime,
    setIsAddEventManuallyPressed,
    setIndexOfDayThatWasPressed,
    setDayThatTheAppointmentWasDroppedAt,
    setNewTopForAppointmentAfterDraggedAndDroppedOnAnotherDay,
    setIdOfAppointmentThatWillBeEdited
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
