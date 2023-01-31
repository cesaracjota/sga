import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fraseService from "../services/frase.service";

const initialState = {
    frases: [],
    fraseRamdom: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Get all frases
export const getAllFrases = createAsyncThunk(
    'frases/getAllFrases',
    async (_, thunkAPI) => {
        try {
            return await fraseService.getAllPhrases();
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

// Get ramdom frase

export const getRandomFrase = createAsyncThunk(
    "frases/getRandomFrase",
    async (_, thunkAPI) => {
        try {
            return await fraseService.getRandomPhrase();
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

// Create a new frase

export const createFrase = createAsyncThunk(
    "frases/create",
    async (phraseData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await fraseService.createPhrase(phraseData, token);
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

// Update phrase

export const updateFrase = createAsyncThunk(
    "frases/update",
    async ( phraseData, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await fraseService.updatePhrase(phraseData, token);
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

// Delete category

export const deleteFrase = createAsyncThunk(
    "frases/deletePhrase",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await fraseService.deletePhrase(id, token);
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

export const fraseSlice = createSlice({
    name: "frases",
    initialState,
    reducers: {
        reset : () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllFrases.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllFrases.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.frases = action.payload;
            })
            .addCase(getAllFrases.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getRandomFrase.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getRandomFrase.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.fraseRamdom = action.payload;
            })
            .addCase(getRandomFrase.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createFrase.pending, (state) => {
                state.isLoading = false;
            })
            .addCase(createFrase.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.frases.push(action.payload);
            })
            .addCase(createFrase.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateFrase.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateFrase.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.frases = state.frases.map((frase) => 
                    frase._id === action.payload._id ? action.payload : frase);
            })
            .addCase(updateFrase.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteFrase.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteFrase.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.frases = state.frases.filter((frase) => 
                    frase._id !== action.payload._id);
            })
            .addCase(deleteFrase.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
        }
    })

export const { reset } = fraseSlice.actions;
export default fraseSlice.reducer;