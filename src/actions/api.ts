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

// **Authentication**
export const login = async (username: string, password: string) => {
    try {
        const response = await api.post("/login", { username, password });
        localStorage.setItem("token", response.data.access_token);
        return response.data.access_token;
    } catch (error: any) {
        console.error("Login failed:", error.response?.data || error.message);
        throw new Error("Login failed");
    }
};

export const logout = () => {
    localStorage.removeItem("token");
};

// **Fetch all users**
export const fetchUsers = async () => {
    try {
        const response = await api.get("/users");
        return response.data;
    } catch (error: any) {
        console.error("Error fetching users:", error.response?.data || error.message);
        throw error;
    }
};

// **Fetch all rewards**
export const fetchRewards = async () => {
    try {
        const response = await api.get("/rewards");
        return response.data;
    } catch (error: any) {
        console.error("Error fetching rewards:", error.response?.data || error.message);
        throw error;
    }
};

// **Add new reward**
export const addReward = async (name: string, xp_cost: number) => {
    try {
        const response = await api.post("/rewards", { name, xp_cost });
        return response.data;
    } catch (error: any) {
        console.error("Error adding reward:", error.response?.data || error.message);
        throw new Error("Failed to add reward");
    }
};

// **Redeem reward**
export const redeemReward = async (userId: number, rewardId: number) => {
    try {
        const response = await api.post(`/users/${userId}/redeem`, { reward_id: rewardId });
        return response.data;
    } catch (error: any) {
        console.error("Error redeeming reward:", error.response?.data || error.message);
        throw new Error("Failed to redeem reward");
    }
};

// **Add XP to user**
export const updateXP = async (userId: number, xpAmount: number) => {
    try {
        const response = await api.put(`/users/${userId}/xp`, { xp: xpAmount });
        return response.data;
    } catch (error: any) {
        console.error("Error updating XP:", error.response?.data || error.message);
        throw error;
    }
};

// **Assign Badge**
export const addBadge = async (userId: number, badge: string) => {
    try {
        const response = await api.post(`/users/${userId}/add_badge`, { badge });
        return response.data;
    } catch (error: any) {
        console.error("Error assigning badge:", error.response?.data || error.message);
        throw error;
    }
};

// **Create User**
export const createUser = async (name: string) => {
    try {
        const response = await api.post("/users", { name });
        return response.data;
    } catch (error: any) {
        console.error("Error creating user:", error.response?.data || error.message);
        throw error;
    }
};
