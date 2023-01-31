import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import activoService from "../services/activo.service";

const initialState = {
    activos: [],
    activo: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const createActivo = createAsyncThunk(
    "activo/create",
    async ( data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await activoService.createActivo(data, token);
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

export const getActivos = createAsyncThunk(
    "activos/get",
    async (_, thunkAPI) => {
        try {
            return await activoService.getAllActivos();
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

export const getActivo = createAsyncThunk(
    "activo/get",
    async (id, thunkAPI) => {
        try {
            return await activoService.getActivo(id);
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

export const updateActivo = createAsyncThunk(
    "activo/update",
    async (data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await activoService.updateActivo(data, token);
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

export const deleteActivo = createAsyncThunk(
    "activo/delete",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await activoService.deleteActivo(id, token);
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

export const activoSlice = createSlice({
    name: "activos",
    initialState,
    reducers: {
        reset : () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getActivos.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getActivos.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.activos = action.payload;
            })
            .addCase(getActivos.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getActivo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getActivo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.activo = action.payload;
            })
            .addCase(getActivo.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createActivo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createActivo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.activos.push(action.payload);
            })
            .addCase(createActivo.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteActivo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteActivo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.activos = state.activos.filter((activo) => 
                    activo._id !== action.payload._id);
            })
            .addCase(deleteActivo.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateActivo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateActivo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.activos = state.activos.map((active) => active._id === action.payload._id ? action.payload : active);
            })
            .addCase(updateActivo.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const { reset } = activoSlice.actions;
export default activoSlice.reducer;