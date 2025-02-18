import axios from "axios";

const API_URL = "http://127.0.0.1:5000";

export const api = axios.create({
    baseURL: API_URL,
    headers: { "Content-Type": "application/json" },
});

// Fetch all users
export const fetchUsers = () => api.get("/users").then(res => res.data);

// Update XP
export const updateXP = (userId: number, xpAmount: number) =>
    api.put(`/users/${userId}/xp`, { xp: xpAmount }).then(res => res.data);

// Add Badge
export const addBadge = (userId: number, badge: string) =>
    api.post(`/users/${userId}/add_badge`, { badge }).then(res => res.data);

export const createUser = async (name: string) => {
    try {
        const response = await api.post("/users", { name });
        return response.data;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};
