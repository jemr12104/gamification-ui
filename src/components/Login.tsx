import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { login } from "../reducers/authSlice";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Paper, Typography, CircularProgress, Alert } from "@mui/material";

const Login = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    // Estados locales
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Acceder al estado de autenticación desde Redux
    const { loading, error } = useSelector((state: RootState) => state.auth);

    const handleLogin = async () => {
        try {
            await dispatch(login({ username, password })).unwrap();
            navigate("/admin"); // Redirigir al panel de administración después del login exitoso
        } catch (err) {
            console.error("Login failed:", err);
        }
    };

    return (
        <Container maxWidth="xs">
            <Paper elevation={2} sx={{ padding: "20px", marginTop: "50px", textAlign: "center" }}>
                <Typography variant="h5" fontWeight="bold">Admin Login</Typography>

                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{ marginTop: 2 }}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ marginTop: 2 }}
                />

                {/* Mostrar error si el login falla */}
                {error && <Alert severity="error" sx={{ marginTop: 2 }}>{error}</Alert>}

                {/* Botón de login con indicador de carga */}
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginTop: 3 }}
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
                </Button>
            </Paper>
        </Container>
    );
};

export default Login;
