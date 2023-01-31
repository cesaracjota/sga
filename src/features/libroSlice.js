import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import libroService from "../services/libro.service";

const initialState = {
    libros: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Create new libro

export const createLibro = createAsyncThunk(
    "libro/create",
    async ( libroData, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await libroService.createLibro(libroData, token);
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

// Get libros

export const getLibros = createAsyncThunk(
    "libros/getLibros",
    async (_, thunkAPI) => {
        try {
            return await libroService.getAllLibros();
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

// Update libro

export const updateLibro = createAsyncThunk(
    "libro/update",
    async (libroData, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await libroService.updateLibro(libroData, token);
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

// Delete libro

export const deleteLibro = createAsyncThunk(
    "libros/deleteLibro",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await libroService.deleteLibro(id, token);
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

export const libroSlice = createSlice({
    name: "libros",
    initialState,
    reducers: {
        reset : () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getLibros.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getLibros.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.libros = action.payload;
            })
            .addCase(getLibros.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createLibro.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createLibro.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.libros.push(action.payload);
            })
            .addCase(createLibro.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteLibro.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteLibro.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.libros = state.libros.filter((libro) => 
                    libro._id !== action.payload._id);
            })
            .addCase(deleteLibro.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateLibro.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateLibro.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.libros = state.libros.map((libro) => 
                    libro._id === action.payload._id ? action.payload : libro);
            })
            .addCase(updateLibro.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const { reset } = libroSlice.actions;
export default libroSlice.reducer;