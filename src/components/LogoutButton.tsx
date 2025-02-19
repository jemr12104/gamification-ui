import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login"); // Redirigir al login
    };

    return (
        <Button variant="contained" color="error" onClick={handleLogout}>
            Logout
        </Button>
    );
};

export default LogoutButton;
