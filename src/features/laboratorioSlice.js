import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import laboratorioService from "../services/laboratorio.service";

const initialState = {
    laboratorios: [],
    laboratorio: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Es muy importante ver que no se repitan los nobres de los asyncFunctions -> "laboratorio/create",

export const createLaboratorio = createAsyncThunk(
    "laboratorio/create",
    async ( data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await laboratorioService.CREATE(data, token);
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

export const getAllLaboratorios = createAsyncThunk(
    "laboratorios/get",
    async (_, thunkAPI) => {
        try {
            return await laboratorioService.GETALL();
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

export const getLaboratorio = createAsyncThunk(
    "laboratorio/get",
    async (id, thunkAPI) => {
        try {
            return await laboratorioService.GET(id);
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

export const updateLaboratorio = createAsyncThunk(
    "laboratorio/update",
    async (data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await laboratorioService.UPDATE(data, token);
        } catch (error) {
            const message = (error.response && 
                error.response.data && 
                error.response.data.msg) || 
                error.message || 
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deleteLaboratorio = createAsyncThunk(
    "laboratorio/delete",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await laboratorioService.DELETE(id, token);
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

export const laboratorioSlice = createSlice({
    name: "laboratorios",
    initialState,
    reducers: {
        reset : () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllLaboratorios.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllLaboratorios.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.laboratorios = action.payload;
            })
            .addCase(getAllLaboratorios.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getLaboratorio.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getLaboratorio.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.laboratorio = action.payload;
            })
            .addCase(getLaboratorio.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createLaboratorio.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createLaboratorio.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.laboratorios.push(action.payload);
            })
            .addCase(createLaboratorio.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteLaboratorio.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteLaboratorio.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.laboratorios = state.laboratorios.filter((laboratorio) => 
                    laboratorio._id !== action.payload._id);
            })
            .addCase(deleteLaboratorio.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateLaboratorio.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateLaboratorio.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.laboratorios = state.laboratorios.map((laboratorio) => 
                    laboratorio._id === action.payload._id ? action.payload : laboratorio);
            })
            .addCase(updateLaboratorio.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const { reset } = laboratorioSlice.actions;
export default laboratorioSlice.reducer;