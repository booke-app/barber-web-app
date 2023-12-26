import {configureStore} from "@reduxjs/toolkit";
import authorizeUser from "../Features/authorizeUser/authorizeUser-slice";
import modal from "../Features/modal/modal-slice";
import calendar from "../Features/calendar/calendar-slice";
import appointment from "../Features/appointment/appointment-slice";
import typeOfView from "../Features/typeOfView/typeOfView-slice";
import userInterface from "../Features/ui/ui-slice";

export const store = configureStore({
    reducer: {
        authorizeUser: authorizeUser,
        modal: modal,
        calendar: calendar,
        appointment: appointment,
        typeOfView: typeOfView,
        userInterface: userInterface,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),

});
