import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState = {
    isVisible: false,
    modalContent: {message: '', status: 200,}//200 success , 500 error

};

const modalSlice = createSlice({
    name: "ModalWrapper",
    initialState,
    reducers: {
        toggleVisibilityOfModal(state, action) {
            state.isVisible = action.payload;
        },

        setModalContent(state, action) {
            console.log(action.payload)
            if (action.payload.status) {
                state.modalContent = {...action.payload}
                state.isVisible = true;
            }

        },
    },
});

export const {
    toggleVisibilityOfModal,
    setModalContent
} = modalSlice.actions;

export default modalSlice.reducer;
