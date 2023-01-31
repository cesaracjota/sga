import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import modalidadService from "../services/modalidad.service";

const initialState = {
    modalidades: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const getModalidades = createAsyncThunk(
    "modalidades/get",
    async (_, thunkAPI) => {
        try {
            return await modalidadService.getAllModalidades();
        } catch (error) {
            const message = 
            (error.response && 
                error.response.data && 
                error.response.data.msg) || 
                error.message || 
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const modalidadSlice = createSlice({
    name: "modadalidades",
    initialState,
    reducers: {
        reset : () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getModalidades.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getModalidades.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.modalidades = action.payload;
            })
            .addCase(getModalidades.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    }
})

export const { reset } = modalidadSlice.actions;
export default modalidadSlice.reducer;