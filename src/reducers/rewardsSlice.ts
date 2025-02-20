import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchRewards as fetchRewardsAPI, addReward as addRewardAPI, redeemReward as redeemRewardAPI } from "../actions/api";

interface Reward {
    id: number;
    name: string;
    xp_cost: number;
}

interface RewardState {
    rewards: Reward[];
    loading: boolean;
    error: string | null;
}

// **Initial state**
const initialState: RewardState = {
    rewards: [],
    loading: false,
    error: null,
};

// **Thunk to fetch rewards**
export const fetchRewards = createAsyncThunk("rewards/fetchRewards", async (_, { rejectWithValue }) => {
    try {
        const response = await fetchRewardsAPI();
        return response;
    } catch (error: any) {
        return rejectWithValue(error.message || "Failed to fetch rewards");
    }
});

// **Thunk to add a reward**
export const addReward = createAsyncThunk(
    "rewards/addReward",
    async ({ name, xp_cost }: { name: string; xp_cost: number }, { rejectWithValue }) => {
        try {
            const response = await addRewardAPI(name, xp_cost);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || "Failed to add reward");
        }
    }
);

// **Thunk to redeem a reward**
export const redeemReward = createAsyncThunk(
    "rewards/redeemReward",
    async ({ userId, rewardId }: { userId: number; rewardId: number }, { rejectWithValue }) => {
        try {
            const response = await redeemRewardAPI(userId, rewardId);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || "Failed to redeem reward");
        }
    }
);

// **Rewards slice**
export const rewardsSlice = createSlice({
    name: "rewards",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRewards.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRewards.fulfilled, (state, action: PayloadAction<Reward[]>) => {
                state.loading = false;
                state.rewards = action.payload;
            })
            .addCase(fetchRewards.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addReward.fulfilled, (state, action: PayloadAction<Reward>) => {
                state.rewards.push(action.payload);
            })
            .addCase(addReward.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(redeemReward.fulfilled, (state, action: PayloadAction<Reward>) => {
                state.rewards = state.rewards.filter((reward) => reward.id !== action.payload.id);
            })
            .addCase(redeemReward.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export default rewardsSlice.reducer;
