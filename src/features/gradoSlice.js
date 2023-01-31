import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import gradoService from "../services/grado.service";

const initialState = {
    grados: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const createGrado = createAsyncThunk(
    "grado/create",
    async ( data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await gradoService.createGrado(data, token);
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
)

export const getGrados = createAsyncThunk(
    "grados/getGrados",
    async (_, thunkAPI) => {
        try {
            return await gradoService.getAllGrados();
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
)

export const updateGrado = createAsyncThunk(
    "grado/update",
    async (data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await gradoService.updateGrado(data, token);
        } catch (error) {
            const message = (error.response && 
                error.response.data && 
                error.response.data.msg) || 
                error.message || 
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const deleteGrado = createAsyncThunk(
    "grados/delete",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await gradoService.deleteGrado(id, token);
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
)

export const gradoSlice = createSlice({
    name: "grados",
    initialState,
    reducers: {
        reset : () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getGrados.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getGrados.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.grados = action.payload;
            })
            .addCase(getGrados.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createGrado.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createGrado.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.grados.push(action.payload);
            })
            .addCase(createGrado.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteGrado.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteGrado.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.grados = state.grados.filter((grado) => 
                    grado._id !== action.payload._id);
            })
            .addCase(deleteGrado.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateGrado.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateGrado.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.grados = state.grados.map((grado) => 
                    grado._id === action.payload._id ? action.payload : grado);
            })
            .addCase(updateGrado.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const { reset } = gradoSlice.actions;
export default gradoSlice.reducer;