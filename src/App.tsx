import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserProfile from "./components/UserProfile.tsx";
import AdminPage from "./components/AdminPage.tsx";
import Login from "./components/Login.tsx";
import Rewards from "./components/Rewards.tsx";
import { RootState } from "./store";
import { JSX } from "react";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const token = useSelector((state: RootState) => state.auth.token);
    return token ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<UserProfile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<PrivateRoute><AdminPage /></PrivateRoute>} />
                <Route path="/rewards" element={<PrivateRoute><Rewards /></PrivateRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
