import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    isGlobalLoading: false,
    height: window.screen.height,
    width: window.screen.width,
    mobileCalendarSettingsSideBarOpen: false,
};

const UserInterfaceSlice = createSlice({
    name: "UserInterface",
    initialState,
    reducers: {
        setGlobalLoading(state, action) {
            state.isGlobalLoading = action.payload;
        },
        setScreenHeight(state, action) {
            state.height = action.payload
        },
        setScreenWidth(state, action) {
            state.width = action.payload
        },
        setIsMobileCalendarSettingsSideBarOpen(state, action) {
            state.mobileCalendarSettingsSideBarOpen = action.payload
        }


    },

});

export const {
    setIsMobileCalendarSettingsSideBarOpen,
    setGlobalLoading, setScreenHeight, setScreenWidth
} = UserInterfaceSlice.actions;

export default UserInterfaceSlice.reducer;
