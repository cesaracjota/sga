import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import uniformeService from "../services/uniforme.service";

const initialState = {
    uniformes: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const createUniforme = createAsyncThunk(
    "uniforme/create",
    async ( data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await uniformeService.createUniforme(data, token);
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

export const getUniformes = createAsyncThunk(
    "uniformes/get",
    async (_, thunkAPI) => {
        try {
            return await uniformeService.getAllUniformes();
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

export const updateUniforme = createAsyncThunk(
    "uniforme/update",
    async (data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await uniformeService.updateUniforme(data, token);
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

export const deleteUniforme = createAsyncThunk(
    "uniforme/delete",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await uniformeService.deleteUniforme(id, token);
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

export const uniformeSlice = createSlice({
    name: "uniformes",
    initialState,
    reducers: {
        reset : () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUniformes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUniformes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.uniformes = action.payload;
            })
            .addCase(getUniformes.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createUniforme.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createUniforme.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.uniformes.push(action.payload);
            })
            .addCase(createUniforme.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteUniforme.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteUniforme.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.uniformes = state.uniformes.filter((uniforme) => 
                    uniforme._id !== action.payload._id);
            })
            .addCase(deleteUniforme.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateUniforme.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUniforme.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.uniformes = state.uniformes.map((uniforme) => 
                    uniforme._id === action.payload._id ? action.payload : uniforme);
            })
            .addCase(updateUniforme.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const { reset } = uniformeSlice.actions;
export default uniformeSlice.reducer;