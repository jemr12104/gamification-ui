import axios from "axios";

const API_URL = "http://127.0.0.1:5000";

export const api = axios.create({
    baseURL: API_URL,
    headers: { "Content-Type": "application/json" },
});

// Automatically include JWT token in protected requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    } else {
        console.warn("No token found in localStorage!");
    }
    return config;
});

// Interceptor to refresh token if it expires
api.interceptors.response.use(
    response => response,
    async error => {
        if (error.response?.status === 401) {
            console.warn("Token expired. Trying to refresh...");
            try {
                const refreshToken = localStorage.getItem("token");
                if (refreshToken) {
                    const refreshResponse = await axios.post(`${API_URL}/refresh`, { refresh_token: refreshToken });
                    localStorage.setItem("token", refreshResponse.data.access_token);
                    error.config.headers["Authorization"] = `Bearer ${refreshResponse.data.access_token}`;
                    return api(error.config); // Retry original request
                } else {
                    console.error("No refresh token available. Redirecting to login...");
                    logout();
                }
            } catch (refreshError) {
                console.error("Error refreshing token:", refreshError);
                logout();
            }
        }
        return Promise.reject(error);
    }
);

export const login = async (username: string, password: string) => {
    try {
        const response = await api.post("/login", { username, password });

        if (response.data.access_token) {
            localStorage.setItem("token", response.data.access_token);
            localStorage.setItem("username", response.data.username);
        } else {
            console.error("No access token found in response!");
            throw new Error("Login failed: No token received");
        }

        return response.data; // Devolver toda la respuesta para asegurar que los datos están disponibles
    } catch (error: any) {
        console.error("Login failed:", error.response?.data || error.message);
        throw new Error("Login failed");
    }
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/login"; // Redirect to login page
};

export const fetchUsers = async () => {
    try {
        const response = await api.get("/users");
        return response.data;
    } catch (error: any) {
        console.error("Error fetching users:", error.response?.data || error.message);
        throw error;
    }
};

export const fetchRewards = async () => {
    try {
        const response = await api.get("/rewards");
        return response.data;
    } catch (error: any) {
        console.error("Error fetching rewards:", error.response?.data || error.message);
        throw error;
    }
};

export const addReward = async (name: string, xp_cost: number) => {
    try {
        const response = await api.post("/rewards", { name, xp_cost });
        return response.data;
    } catch (error: any) {
        console.error("Error adding reward:", error.response?.data || error.message);
        throw new Error("Failed to add reward");
    }
};

export const redeemReward = async (userId: number, rewardId: number) => {
    try {
        const response = await api.post(`/users/${userId}/redeem`, { reward_id: rewardId });
        return response.data;
    } catch (error: any) {
        console.error("Error redeeming reward:", error.response?.data || error.message);
        throw new Error("Failed to redeem reward");
    }
};

export const updateXP = async (userId: number, xpAmount: number) => {
    try {
        const response = await api.put(`/users/${userId}/xp`, { xp: xpAmount });
        return response.data;
    } catch (error: any) {
        console.error("Error updating XP:", error.response?.data || error.message);
        throw error;
    }
};

export const addBadge = async (userId: number, badge: string) => {
    try {
        const response = await api.post(`/users/${userId}/add_badge`, { badge });
        return response.data;
    } catch (error: any) {
        console.error("Error assigning badge:", error.response?.data || error.message);
        throw error;
    }
};

export const createUser = async (name: string) => {
    try {
        const response = await api.post("/users", { name });
        return response.data;
    } catch (error: any) {
        console.error("Error creating user:", error.response?.data || error.message);
        throw error;
    }
};
