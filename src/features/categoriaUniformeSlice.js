import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoriaUniformeService from "../services/categoria_uniforme.service";

const initialState = {
    categoria_uniformes: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const createCategoriaUniforme = createAsyncThunk(
    "categoria_uniforme/create",
    async ( data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await categoriaUniformeService.createCategoriaUniforme(data, token);
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

export const getCategoriasUniforme = createAsyncThunk(
    "categoria_uniformes/get",
    async (_, thunkAPI) => {
        try {
            return await categoriaUniformeService.getAllCategoriasUniforme();
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

export const updateCategoriaUniforme = createAsyncThunk(
    "categoria_uniforme/update",
    async (data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await categoriaUniformeService.updateCategoriaUniforme(data, token);
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

export const deleteCategoriaUniforme = createAsyncThunk(
    "categoria_uniforme/delete",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await categoriaUniformeService.deleteCategoriaUniforme(id, token);
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

export const categoriaUniformeSlice = createSlice({
    name: "categoria_uniformes",
    initialState,
    reducers: {
        reset : () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategoriasUniforme.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCategoriasUniforme.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.categoria_uniformes = action.payload;
            })
            .addCase(getCategoriasUniforme.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createCategoriaUniforme.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCategoriaUniforme.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.categoria_uniformes.push(action.payload);
            })
            .addCase(createCategoriaUniforme.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteCategoriaUniforme.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCategoriaUniforme.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.categoria_uniformes = state.categoria_uniformes.filter((categoria_uniforme) => 
                    categoria_uniforme._id !== action.payload._id);
            })
            .addCase(deleteCategoriaUniforme.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateCategoriaUniforme.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCategoriaUniforme.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.categoria_uniformes = state.categoria_uniformes.map((categoria_uniforme) => 
                    categoria_uniforme._id === action.payload._id ? action.payload : categoria_uniforme);
            })
            .addCase(updateCategoriaUniforme.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const { reset } = categoriaUniformeSlice.actions;
export default categoriaUniformeSlice.reducer;