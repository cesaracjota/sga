import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import venta_uniformeService from "../services/venta_uniforme.service";

const initialState = {
    ventas_uniforme: [],
    venta_uniforme: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Es muy importante ver que no se repitan los nobres de los asyncFunctions -> "laboratorio/create",

export const registrarVenta = createAsyncThunk(
    "venta_uniforme/create",
    async ( data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await venta_uniformeService.CREATE(data, token);
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

export const getAllVentaUniformes = createAsyncThunk(
    "ventas_uniforme/get",
    async (_, thunkAPI) => {
        try {
            return await venta_uniformeService.GETALL();
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

export const getVentaUniforme = createAsyncThunk(
    "venta_uniforme/get",
    async (id, thunkAPI) => {
        try {
            return await venta_uniformeService.GET(id);
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

// export const updateLaboratorio = createAsyncThunk(
//     "laboratorio/update",
//     async (data, thunkAPI ) => {
//         try {
//             const token = thunkAPI.getState().auth.user.token;
//             return await laboratorioService.UPDATE(data, token);
//         } catch (error) {
//             const message = (error.response && 
//                 error.response.data && 
//                 error.response.data.msg) || 
//                 error.message || 
//                 error.toString();
//             return thunkAPI.rejectWithValue(message);
//         }
//     }
// );

export const deleteVentaUniforme = createAsyncThunk(
    "venta_uniforme/delete",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await venta_uniformeService.DELETE(id, token);
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

export const venta_uniformeSlice = createSlice({
    name: "ventas_uniforme",
    initialState,
    reducers: {
        reset : () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllVentaUniformes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllVentaUniformes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.ventas_uniforme = action.payload;
            })
            .addCase(getAllVentaUniformes.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getVentaUniforme.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getVentaUniforme.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.venta_uniforme = action.payload;
            })
            .addCase(getVentaUniforme.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(registrarVenta.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registrarVenta.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.ventas_uniforme.push(action.payload);
            })
            .addCase(registrarVenta.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteVentaUniforme.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteVentaUniforme.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.ventas_uniforme = state.ventas_uniforme.filter((venta_uniforme) => 
                    venta_uniforme._id !== action.payload._id);
            })
            .addCase(deleteVentaUniforme.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const { reset } = venta_uniformeSlice.actions;
export default venta_uniformeSlice.reducer;