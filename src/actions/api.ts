import axios from "axios";

const API_URL = "http://127.0.0.1:5000";

export const api = axios.create({
    baseURL: API_URL,
    headers: { "Content-Type": "application/json" },
});

// Automatically include JWT token in protected requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    } else {
        console.warn("No token found in localStorage!");
    }
    return config;
});

// Authentication
export const login = async (username: string, password: string) => {
    try {
        const response = await api.post("/login", { username, password });
        localStorage.setItem("token", response.data.access_token);
        console.log("User logged in, token stored:", response.data.access_token);
        return response.data.access_token;
    } catch (error) {
        console.error("Login failed:", error.response ? error.response.data : error.message);
        throw new Error("Login failed");
    }
};

export const logout = () => {
    console.log("User logged out, token removed");
    localStorage.removeItem("token");
};

// Fetch all users
export const fetchUsers = async () => {
    try {
        const response = await api.get("/users");
        console.log("Users fetched:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error.response ? error.response.data : error.message);
        throw error;
    }
};

// Fetch all rewards
export const fetchRewards = async () => {
    try {
        const response = await api.get("/rewards");
        console.log("Rewards fetched:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching rewards:", error.response ? error.response.data : error.message);
        throw error;
    }
};

// Add new reward
export const addReward = async (name: string, xp_cost: number) => {
    try {
        console.log("Adding reward:", { name, xp_cost });
        const response = await api.post("/rewards", { name, xp_cost });
        console.log("Reward added successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error adding reward:", error.response ? error.response.data : error.message);
        throw new Error("Failed to add reward");
    }
};

// Redeem reward
export const redeemReward = async (userId: number, rewardId: number) => {
    try {
        console.log(`Redeeming reward ${rewardId} for user ${userId}`);
        const response = await api.post(`/users/${userId}/redeem`, { reward_id: rewardId });
        console.log("Reward redeemed successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error redeeming reward:", error.response ? error.response.data : error.message);
        throw new Error("Failed to redeem reward");
    }
};

// Add XP to user
export const updateXP = async (userId: number, xpAmount: number) => {
    try {
        console.log(`Updating XP for user ${userId} by ${xpAmount}`);
        const response = await api.put(`/users/${userId}/xp`, { xp: xpAmount });
        console.log("XP updated successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating XP:", error.response ? error.response.data : error.message);
        throw error;
    }
};

// Assign Badge
export const addBadge = async (userId: number, badge: string) => {
    try {
        console.log(`Assigning badge ${badge} to user ${userId}`);
        const response = await api.post(`/users/${userId}/add_badge`, { badge });
        console.log("Badge assigned successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error assigning badge:", error.response ? error.response.data : error.message);
        throw error;
    }
};

// Create User
export const createUser = async (name: string) => {
    try {
        console.log("Creating user:", name);
        const response = await api.post("/users", { name });
        console.log("User created successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating user:", error.response ? error.response.data : error.message);
        throw error;
    }
};
