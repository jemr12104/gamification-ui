import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchUsers as fetchUsersAPI, updateXP as updateXPAPI, addBadge as addBadgeAPI, createUser as createUserAPI } from "../actions/api";

interface User {
    id: number;
    name: string;
    xp: number;
    level: number;
    badges: string[];
}

interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
}

// **Estado inicial**
const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
};

// **Thunk para obtener usuarios de la API**
export const fetchUsers = createAsyncThunk("users/fetchUsers", async (_, { rejectWithValue }) => {
    try {
        const response = await fetchUsersAPI();
        return response;
    } catch (error: any) {
        return rejectWithValue(error.message || "Failed to fetch users");
    }
});

// **Thunk para actualizar XP**
export const updateXP = createAsyncThunk(
    "users/updateXP",
    async ({ userId, xpAmount }: { userId: number; xpAmount: number }, { rejectWithValue }) => {
        try {
            const response = await updateXPAPI(userId, xpAmount);
            return response; // Esto devolverá el usuario actualizado
        } catch (error: any) {
            return rejectWithValue(error.message || "Failed to update XP");
        }
    }
);

// **Thunk para asignar insignia**
export const addBadge = createAsyncThunk(
    "users/addBadge",
    async ({ userId, badge }: { userId: number; badge: string }, { rejectWithValue }) => {
        try {
            const response = await addBadgeAPI(userId, badge);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || "Failed to add badge");
        }
    }
);

// **Thunk para crear un usuario**
export const createUser = createAsyncThunk("users/createUser", async (name: string, { rejectWithValue }) => {
    try {
        const response = await createUserAPI(name);
        return response;
    } catch (error: any) {
        return rejectWithValue(error.message || "Failed to create user");
    }
});

// **Slice de usuarios**
export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateXP.fulfilled, (state, action: PayloadAction<User>) => {
                state.users = state.users.map((user) =>
                    user.id === action.payload.id ? action.payload : user
                );
            })
            .addCase(updateXP.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(addBadge.fulfilled, (state, action: PayloadAction<User>) => {
                state.users = state.users.map((user) =>
                    user.id === action.payload.id ? action.payload : user
                );
            })
            .addCase(addBadge.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.users.push(action.payload);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export default userSlice.reducer;
