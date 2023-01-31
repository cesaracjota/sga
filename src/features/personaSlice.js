import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import personaService from "../services/persona.service";

const initialState = {
    personas: [],
    persona: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const getAllPersonas = createAsyncThunk(
    "personas/getAllPersonas",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await personaService.getAllUsuarios(token);
        } catch (error){
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

export const getPersona = createAsyncThunk(
    "personas/getPersona",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await personaService.getUser(id, token);
        } catch (error){
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

export const createPersona = createAsyncThunk(
    "persona/create",
    async (personaData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await personaService.createUser(personaData, token);
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

export const updatePersona = createAsyncThunk(
    "persona/update",
    async ( personaData, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await personaService.updateUser(personaData, token);
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

export const deletePersona = createAsyncThunk(
    "persona/delete",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await personaService.deleteUser(id, token);
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

export const personaSlice = createSlice({
    name: "personas",
    initialState,
    reducers: {
        reset : () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(getAllPersonas.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllPersonas.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.personas = action.payload;
        });
        builder.addCase(getAllPersonas.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
        builder.addCase(getPersona.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getPersona.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.persona = action.payload;
        });
        builder.addCase(getPersona.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
        builder.addCase(createPersona.pending, (state) => {
            state.isLoading = false;
        })
        builder.addCase(createPersona.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.personas.push(action.payload);
        })
        builder.addCase(createPersona.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        builder.addCase(updatePersona.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(updatePersona.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.personas = state.personas.map((persona) => 
                persona.uid === action.payload.uid ? action.payload : persona);
        })
        builder.addCase(updatePersona.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        builder.addCase(deletePersona.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(deletePersona.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.personas = state.personas.filter((persona) => 
                persona.uid !== action.payload.uid);
        })
        builder.addCase(deletePersona.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
});

export const { reset } = personaSlice.actions;

export default personaSlice.reducer;
