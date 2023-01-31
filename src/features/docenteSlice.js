import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import docenteService from "../services/docente.service";

const initialState = {
    docentes: [],
    docente: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const createDocente = createAsyncThunk(
    "docente/create",
    async ( data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await docenteService.createDocente(data, token);
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

export const getDocentes = createAsyncThunk(
    "docentes/getAll",
    async (_, thunkAPI) => {
        try {
            return await docenteService.getAllDocentes();
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

export const getDocente = createAsyncThunk(
    "docentes/get",
    async (id, thunkAPI) => {
        try {
            return await docenteService.getDocente(id);
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

export const getDocenteByDni = createAsyncThunk(
    "docentes/dni/get",
    async (dni, thunkAPI) => {
        try {
            return await docenteService.getDocenteByDni(dni);
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

export const updateDocente = createAsyncThunk(
    "docente/update",
    async (data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await docenteService.updateDocente(data, token);
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

export const deleteDocente = createAsyncThunk(
    "docente/delete",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await docenteService.deleteDocente(id, token);
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

export const docenteSlice = createSlice({
    name: "docentes",
    initialState,
    reducers: {
        reset : () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDocentes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDocentes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.docentes = action.payload;
            })
            .addCase(getDocentes.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getDocente.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDocente.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.docente = action.payload;
            })
            .addCase(getDocente.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createDocente.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createDocente.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.docentes.push(action.payload);
            })
            .addCase(createDocente.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteDocente.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteDocente.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.docentes = state.docentes.filter((docente) => 
                    docente._id !== action.payload._id);
            })
            .addCase(deleteDocente.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateDocente.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateDocente.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.docentes = state.docentes.map((docente) => 
                    docente._id === action.payload._id ? action.payload : docente);
            })
            .addCase(updateDocente.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const { reset } = docenteSlice.actions;
export default docenteSlice.reducer;