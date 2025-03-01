import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { login as loginAPI } from "../actions/api";

// Definir la estructura del estado de autenticación
interface AuthState {
    token: string | null;
    username: string | null;
    loading: boolean;
    error: string | null;
}

// Estado inicial de autenticación
const initialState: AuthState = {
    token: localStorage.getItem("token") || null, // Cargar el token desde localStorage si existe
    username: localStorage.getItem("username") || null,
    loading: false,
    error: null,
};

// **Thunk para iniciar sesión y obtener el token**
export const login = createAsyncThunk(
    "auth/login",
    async (
        { username, password }: { username: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await loginAPI(username, password);
            const { access_token, username: returnedUsername } = response;

            localStorage.setItem("token", access_token); // Guardar el token en localStorage
            localStorage.setItem("username", returnedUsername); // Guardar el username en localStorage

            return { token: access_token, username: returnedUsername };
        } catch (error: any) {
            return rejectWithValue(error.message || "Login failed");
        }
    }
);

// **Slice de autenticación**
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.username = null;
            localStorage.removeItem("token"); // Eliminar el token al cerrar sesión
            localStorage.removeItem("username"); // Eliminar el username al cerrar sesión
        },
        setToken: (state, action: PayloadAction<{ token: string; username: string }>) => {
            state.token = action.payload.token;
            state.username = action.payload.username;
            localStorage.setItem("token", action.payload.token); // Guardar token en localStorage
            localStorage.setItem("username", action.payload.username); // Guardar username en localStorage
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                login.fulfilled,
                (state, action: PayloadAction<{ token: string; username: string }>) => {
                    state.loading = false;
                    state.token = action.payload.token;
                    state.username = action.payload.username;
                }
            )
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

// Exportar las acciones y el reducer
export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;
