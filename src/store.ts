import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import rewardsReducer from "./reducers/rewardsSlice";
import authReducer from "./reducers/authSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer, // Estado de autenticación
        users: userReducer, // Estado de usuarios
        rewards: rewardsReducer, // Estado de recompensas
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Desactiva warnings de serialización con localStorage
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
