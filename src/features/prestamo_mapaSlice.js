import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import prestamoMapaService from "../services/prestamo_mapa.service";

const initialState = {
    prestamo_mapas: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const createPrestamoMapa = createAsyncThunk(
    "prestamo_mapas/create",
    async ( data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await prestamoMapaService.REGISTER(data, token);
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

export const getMapaByCodigo = createAsyncThunk(
    "mapas_by_libro/get",
    async ( codigo, thunkAPI ) => {
        try {
            return await prestamoMapaService.GETBYCODIGO(codigo);
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

export const getPrestamoMapas = createAsyncThunk(
    "prestamo_mapas/get",
    async (_, thunkAPI) => {
        try {
            return await prestamoMapaService.GETALL();
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

export const updatePrestamoMapa = createAsyncThunk(
    "prestamo_mapas/update",
    async (data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await prestamoMapaService.UPDATE(data, token);
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

export const deletePrestamoMapa = createAsyncThunk(
    "prestamo_mapas/delete",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await prestamoMapaService.DELETE(id, token);
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

export const prestamoMapaSlice = createSlice({
    name: "prestamo_mapas",
    initialState,
    reducers: {
        reset : () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPrestamoMapas.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPrestamoMapas.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.prestamo_mapas = action.payload;
            })
            .addCase(getPrestamoMapas.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createPrestamoMapa.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createPrestamoMapa.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.prestamo_mapas.push(action.payload);
            })
            .addCase(createPrestamoMapa.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deletePrestamoMapa.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deletePrestamoMapa.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.prestamo_mapas = state.prestamo_mapas.filter((prestamo_mapa) => 
                    prestamo_mapa._id !== action.payload._id);
            })
            .addCase(deletePrestamoMapa.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updatePrestamoMapa.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updatePrestamoMapa.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.prestamo_mapas = state.prestamo_mapas.map((prestamo_mapa) => 
                    prestamo_mapa._id === action.payload._id ? action.payload : prestamo_mapa);
            })
            .addCase(updatePrestamoMapa.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const { reset } = prestamoMapaSlice.actions;
export default prestamoMapaSlice.reducer;