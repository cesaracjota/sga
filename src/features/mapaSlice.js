import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import mapaService from "../services/mapa.service";

const initialState = {
    mapas: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const createMapa = createAsyncThunk(
    "mapas/create",
    async ( data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await mapaService.createMapa(data, token);
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

export const getMapas = createAsyncThunk(
    "mapas/get",
    async (_, thunkAPI) => {
        try {
            return await mapaService.getAllMapas();
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

export const updateMapa = createAsyncThunk(
    "mapas/update",
    async (data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await mapaService.updateMapa(data, token);
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

export const deleteMapa= createAsyncThunk(
    "mapas/delete",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await mapaService.deleteMapa(id, token);
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

export const mapaSlice = createSlice({
    name: "mapas",
    initialState,
    reducers: {
        reset : () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMapas.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMapas.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.mapas = action.payload;
            })
            .addCase(getMapas.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createMapa.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createMapa.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.mapas.push(action.payload);
            })
            .addCase(createMapa.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteMapa.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteMapa.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.mapas = state.mapas.filter((mapa) => 
                    mapa._id !== action.payload._id);
            })
            .addCase(deleteMapa.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateMapa.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateMapa.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.mapas = state.mapas.map((mapa) => 
                    mapa._id === action.payload._id ? action.payload : mapa);
            })
            .addCase(updateMapa.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const { reset } = mapaSlice.actions;
export default mapaSlice.reducer;