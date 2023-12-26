import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    isGlobalLoading: false,
    height: window.screen.height,
    width: window.screen.width,
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
        }


    },

});

export const {
    setGlobalLoading, setScreenHeight, setScreenWidth
} = UserInterfaceSlice.actions;

export default UserInterfaceSlice.reducer;
