import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Paper, Typography } from "@mui/material";
import { login } from "../actions/api.ts";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const token = await login(username, password);
            localStorage.setItem("token", token);
            navigate("/admin");
        } catch (err) {
            setError("Invalid username or password");
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

                {error && <Typography color="error" sx={{ marginTop: 2 }}>{error}</Typography>}

                <Button variant="contained" color="primary" fullWidth sx={{ marginTop: 3 }} onClick={handleLogin}>
                    Login
                </Button>
            </Paper>
        </Container>
    );
};

export default Login;
