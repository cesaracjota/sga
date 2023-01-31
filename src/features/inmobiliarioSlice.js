import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import inmobiliarioService from "../services/inmobiliario.service";

const initialState = {
    inmobiliarios: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const createInmobiliario = createAsyncThunk(
    "inmobiliario/create",
    async ( data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await inmobiliarioService.CREATE(data, token);
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

export const getInmobiliarios = createAsyncThunk(
    "inmobiliarios/get",
    async (_, thunkAPI) => {
        try {
            return await inmobiliarioService.GETALL();
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

export const updateInmobiliario = createAsyncThunk(
    "inmobiliario/update",
    async (data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await inmobiliarioService.UPDATE(data, token);
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

export const deleteInmobiliario = createAsyncThunk(
    "Inmobiliario/delete",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await inmobiliarioService.DELETE(id, token);
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

export const inmobiliarioSlice = createSlice({
    name: "inmobiliarios",
    initialState,
    reducers: {
        reset : () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getInmobiliarios.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getInmobiliarios.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.inmobiliarios = action.payload;
            })
            .addCase(getInmobiliarios.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createInmobiliario.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createInmobiliario.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.inmobiliarios.push(action.payload);
            })
            .addCase(createInmobiliario.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteInmobiliario.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteInmobiliario.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.inmobiliarios = state.inmobiliarios.filter((inmobiliario) => 
                    inmobiliario._id !== action.payload._id);
            })
            .addCase(deleteInmobiliario.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateInmobiliario.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateInmobiliario.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.inmobiliarios = state.inmobiliarios.map((inmobiliario) => 
                    inmobiliario._id === action.payload._id ? action.payload : inmobiliario);
            })
            .addCase(updateInmobiliario.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const { reset } = inmobiliarioSlice.actions;
export default inmobiliarioSlice.reducer;