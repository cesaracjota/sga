import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import tipoActivoService from "../services/tipo_activo.service";

const initialState = {
    tipo_activos: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const createTipoActivo = createAsyncThunk(
    "tipo_activos/create",
    async ( data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await tipoActivoService.createTipoActivo(data, token);
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

export const getTipoActivos = createAsyncThunk(
    "tipo_activos/get",
    async (_, thunkAPI) => {
        try {
            return await tipoActivoService.getAllTiposActivo();
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

export const getTipoActivo = createAsyncThunk(
    "tipo_activos/get",
    async (id, thunkAPI) => {
        try {
            return await tipoActivoService.getTipoActivo(id);
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

export const updateTipoActivo = createAsyncThunk(
    "tipo_activos/update",
    async (data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await tipoActivoService.updateTipoActivo(data, token);
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

export const deleteTipoActivo = createAsyncThunk(
    "tipo_activos/delete",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await tipoActivoService.deleteTipoActivo(id, token);
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

export const tipoActivoSlice = createSlice({
    name: "tipo_activos",
    initialState,
    reducers: {
        reset : () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTipoActivos.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTipoActivos.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tipo_activos = action.payload;
            })
            .addCase(getTipoActivos.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createTipoActivo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createTipoActivo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tipo_activos.push(action.payload);
            })
            .addCase(createTipoActivo.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteTipoActivo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteTipoActivo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tipo_activos = state.tipo_activos.filter((tipo_activo) => 
                    tipo_activo._id !== action.payload._id);
            })
            .addCase(deleteTipoActivo.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateTipoActivo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateTipoActivo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tipo_activos = state.tipo_activos.map((tipo_activo) => 
                    tipo_activo._id === action.payload._id ? action.payload : tipo_activo);
            })
            .addCase(updateTipoActivo.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const { reset } = tipoActivoSlice.actions;
export default tipoActivoSlice.reducer;