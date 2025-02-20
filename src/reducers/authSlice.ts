import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { login as loginAPI } from "../actions/api";

// Definir la estructura del estado de autenticación
interface AuthState {
    token: string | null;
    loading: boolean;
    error: string | null;
}

// Estado inicial de autenticación
const initialState: AuthState = {
    token: localStorage.getItem("token") || null, // Cargar el token desde localStorage si existe
    loading: false,
    error: null,
};

// **Thunk para iniciar sesión y obtener el token**
export const login = createAsyncThunk("auth/login", async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
    try {
        const token = await loginAPI(username, password);
        localStorage.setItem("token", token); // Guardar el token en localStorage
        return token;
    } catch (error: any) {
        return rejectWithValue(error.message || "Login failed");
    }
});

// **Slice de autenticación**
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            localStorage.removeItem("token"); // Eliminar el token al cerrar sesión
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            localStorage.setItem("token", action.payload); // Guardar token en localStorage
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.token = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

// Exportar las acciones y el reducer
export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;
