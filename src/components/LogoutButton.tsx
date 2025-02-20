import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { logout } from "../reducers/authSlice";

const LogoutButton = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout()); // Dispatch Redux logout action
        navigate("/login"); // Redirect to login
    };

    return (
        <Button variant="contained" color="error" onClick={handleLogout}>
            Logout
        </Button>
    );
};

export default LogoutButton;
