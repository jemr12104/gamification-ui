import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppBar, Toolbar, Typography, Button, Container, CssBaseline, ThemeProvider } from "@mui/material";
import UserProfile from "./components/UserProfile";
import AdminPage from "./components/AdminPage";
import Login from "./components/Login";
import Rewards from "./components/Rewards";
import { RootState } from "./store";
import { JSX } from "react";
import theme from "./theme";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const token = useSelector((state: RootState) => state.auth.token);
    return token ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <AppBar position="static" color="primary" elevation={3}>
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>Gamification Portal</Typography>
                        <Button color="inherit" component={Link} to="/">Profile</Button>
                        <Button color="inherit" component={Link} to="/admin">Admin</Button>
                        <Button color="inherit" component={Link} to="/rewards">Rewards</Button>
                    </Toolbar>
                </AppBar>
                <Container sx={{ marginTop: 4 }}>
                    <Routes>
                        <Route path="/" element={<UserProfile />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/admin" element={<PrivateRoute><AdminPage /></PrivateRoute>} />
                        <Route path="/rewards" element={<PrivateRoute><Rewards /></PrivateRoute>} />
                    </Routes>
                </Container>
            </Router>
        </ThemeProvider>
    );
}

export default App;
