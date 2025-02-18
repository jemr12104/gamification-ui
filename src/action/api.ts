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
    }
    return config;
});

// Authentication
export const login = async (username: string, password: string) => {
    try {
        const response = await api.post("/login", { username, password });
        localStorage.setItem("token", response.data.access_token);
        return response.data.access_token;
    } catch (error) {
        throw new Error("Login failed");
    }
};

export const logout = () => {
    localStorage.removeItem("token");
};

// Fetch all users
export const fetchUsers = () => api.get("/users").then(res => res.data);

// Fetch all rewards
export const fetchRewards = () => api.get("/rewards").then(res => res.data);

// Add new reward
export const addReward = async (name: string, xp_cost: number) => {
    return api.post("/rewards", { name, xp_cost }).then(res => res.data);
};

// Redeem reward
export const redeemReward = async (userId: number, rewardId: number) => {
    return api.post(`/users/${userId}/redeem`, { reward_id: rewardId }).then(res => res.data);
};

// Add XP to user
export const updateXP = (userId: number, xpAmount: number) =>
    api.put(`/users/${userId}/xp`, { xp: xpAmount }).then(res => res.data);

// Assign Badge
export const addBadge = (userId: number, badge: string) =>
    api.post(`/users/${userId}/add_badge`, { badge }).then(res => res.data);

// Create User
export const createUser = async (name: string) => {
    return api.post("/users", { name }).then(res => res.data);
};
