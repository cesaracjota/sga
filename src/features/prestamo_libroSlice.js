import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import prestamoLibroService from "../services/prestamo_libro.service";

const initialState = {
    prestamo_libros: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const createPrestamoLibro = createAsyncThunk(
    "prestamo_libros/create",
    async ( data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await prestamoLibroService.registrarPrestamoLibro(data, token);
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

export const getLibroByCodigo = createAsyncThunk(
    "libros_by_codigo/get",
    async ( codigo, thunkAPI ) => {
        try {
            return await prestamoLibroService.getLibroByCodigo(codigo);
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

export const getPrestamoLibros = createAsyncThunk(
    "prestamo_libros/get",
    async (_, thunkAPI) => {
        try {
            return await prestamoLibroService.getAllPrestamoLibros();
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

export const updatePrestamoLibro = createAsyncThunk(
    "prestamo_libros/update",
    async (data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await prestamoLibroService.updatePrestamoLibro(data, token);
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

export const deletePrestamoLibro = createAsyncThunk(
    "prestamo_libros/delete",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await prestamoLibroService.deletePrestamoLibro(id, token);
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

export const prestamoLibroSlice = createSlice({
    name: "prestamo_libros",
    initialState,
    reducers: {
        reset : () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPrestamoLibros.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPrestamoLibros.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.prestamo_libros = action.payload;
            })
            .addCase(getPrestamoLibros.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createPrestamoLibro.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createPrestamoLibro.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.prestamo_libros.push(action.payload);
            })
            .addCase(createPrestamoLibro.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deletePrestamoLibro.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deletePrestamoLibro.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.prestamo_libros = state.prestamo_libros.filter((prestamo_libro) => 
                    prestamo_libro._id !== action.payload._id);
            })
            .addCase(deletePrestamoLibro.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updatePrestamoLibro.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updatePrestamoLibro.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.prestamo_libros = state.prestamo_libros.map((prestamo_libro) => 
                    prestamo_libro._id === action.payload._id ? action.payload : prestamo_libro);
            })
            .addCase(updatePrestamoLibro.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const { reset } = prestamoLibroSlice.actions;
export default prestamoLibroSlice.reducer;