import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState = {
    typeOfView: 'weeklyView',//weeklyView, dayView, threeDayView,twoDayView
    numberOfMultipleWorkersShown: null,
    firstViewWorker: null,
    secondViewWorker: null,
    thirdViewWorker: null,
    selectedWorkerForWeekView: null,//{}
    shouldViewUpdate: `${0}`
};

const typeOfViewSlice = createSlice({
    name: "typeOfView",
    initialState,
    reducers: {
        setTypeOfView(state, action) {

            if (action.payload === 'weeklyView' || action.payload === 'threeDayView') {
                state.numberOfMultipleWorkersShown = null
            }

            if (action.payload === 'dayView' && state.numberOfMultipleWorkersShown) {
                state.numberOfMultipleWorkersShown = 3

            }

            if (action.payload === 'twoDayView') {

                if (state.numberOfMultipleWorkersShown) {
                    state.numberOfMultipleWorkersShown = 2
                }

            }


            state.typeOfView = action.payload;
        },
        setFirstViewWorker(state, action) {
            state.firstViewWorker = action.payload;

        },
        setSecondViewWorker(state, action) {
            state.secondViewWorker = action.payload;

        },
        setThirdViewWorker(state, action) {
            state.thirdViewWorker = action.payload;

        },
        setSelectedWorkerForWeekView(state, action) {
            state.selectedWorkerForWeekView = action.payload;

        },
        setShouldViewUpdate(state, action) {
            state.shouldViewUpdate = `${Math.random()}`
        },
        setNumberOfMultipleWorkersShown(state, action) {
            if (action.payload === 2) {
                if (state.typeOfView === 'weeklyView' || state.typeOfView === 'threeDayView') {
                    state.typeOfView = 'twoDayView'
                }


            }
            if (action.payload === 3) {
                if (state.typeOfView === 'weeklyView' || state.typeOfView === 'twoDayView' || state.typeOfView === 'threeDayView') {
                    state.typeOfView = 'dayView'
                }
            }
            state.numberOfMultipleWorkersShown = action.payload

        }


    },

});

export const {
    setSelectedWorkerForWeekView,
    setShouldViewUpdate,
    setThirdViewWorker,
    setFirstViewWorker,
    setSecondViewWorker,
    setTypeOfView,
    setNumberOfMultipleWorkersShown
} = typeOfViewSlice.actions;

export default typeOfViewSlice.reducer;
