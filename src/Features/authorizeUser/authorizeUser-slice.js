import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";
import {request} from "../../Utilities/Request";

const initialState = {
    isLoggedIn: false,
    status: null,
    isLoading: false,
    userData: {},
    isUserLoggedInUsingOAuth2: false,
    shop: {
        settings: {
            shifts: {
                'Monday': {
                    shifts: []
                }, 'Tuesday': {
                    shifts: []
                }, 'Wednesday': {
                    shifts: []
                }, 'Thursday': {
                    shifts: []
                }, 'Friday': {
                    shifts: []
                }, 'Saturday': {
                    shifts: []
                }, 'Sunday': {
                    shifts: []
                }
            }
        }
    },

};

export const login = createAsyncThunk('authorizeUser/login', async (payload) => {

    return await request(`/login`, {
        email: payload.email,
        password: payload.password,
        isFromOAuth2: payload.isFromOAuth2,
        tokenId: payload.tokenId
    }, null, 'POST')
})
export const getShop = createAsyncThunk('authorizeUser/getShop', async (payload) => {
    return await request(`/shop`, null, null, null)
})
export const getPersonalData = createAsyncThunk('authorizeUser/getPersonalData', async (payload) => {
    return await request(`/personal-data`, null, null, null)
})


const authorisedSlice = createSlice({
    name: "Authorised",
    initialState,
    reducers: {
        manualLogin(state, action) {
            state.isLoggedIn = action.payload;
        },
        logout(state, action) {
            state.isLoggedIn = false;
            state.isUserLoggedInUsingOAuth2 = false
            localStorage.removeItem('accessToken')
        },
        setUpdatedAppointments(state, action) {
            console.log(action.payload)
            state.shop.appointments = [...action.payload]
        },
        setUpdatedWorkers(state, action) {
            state.shop.workers = [...action.payload]
        },
        setUpdateCategoriesWithItsServices(state, action) {
            state.shop.categoriesWithItsServices = [...action.payload]
        },
        setUpdatedShifts(state, action) {
            state.shop.settings.shifts = action.payload
        },
        setUpdatedVacations(state, action) {
            state.shop.settings.vacations = action.payload
        },
        setVacationModeInRedux(state, action) {
            state.shop.settings.isOnVacation = action.payload
        },
    },
    extraReducers: builder => {
        builder.addCase(login.pending, (state, action) => {
            state.isLoading = true
        }).addCase(login.fulfilled, (state, action) => {
            if (action.payload.accessToken) {
                localStorage.setItem('accessToken', JSON.stringify(action.payload.accessToken))
                state.isLoggedIn = true
                state.status = 'success'
                state.isLoading = false
                if (action.payload.isFromOAuth2) {
                    state.isUserLoggedInUsingOAuth2 = true
                }
                state.userData = action?.payload?.userData
                if (action.payload?.shop) {
                    state.shop = action.payload?.shop
                }

            }


        }).addCase(getShop.pending, (state, action) => {
            state.isLoading = true

        }).addCase(getShop.fulfilled, (state, action) => {
            state.isLoading = false
            if (action.payload.data) {
                state.shop = {...action.payload.data}
            }

        }).addCase(getPersonalData.pending, (state, action) => {
            state.isLoading = true

        }).addCase(getPersonalData.fulfilled, (state, action) => {
            state.isLoading = false
            if (action.payload.user) {
                state.userData = action.payload.user
            }

        })
    }
});


export const {
    setUpdateCategoriesWithItsServices,
    setUpdatedWorkers,
    setUpdatedAppointments,
    manualLogin, logout,
    setUpdatedShifts, setVacationModeInRedux,
    setUpdatedVacations
} = authorisedSlice.actions;

export default authorisedSlice.reducer;
