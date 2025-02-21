import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, updateXP, addBadge, createUser } from "../reducers/userSlice";
import { RootState, AppDispatch } from "../store";
import {Card, CardContent, Typography, Grid, Button, TextField, Container, Box, Paper,
    Avatar, IconButton, Divider, CircularProgress, Snackbar, Alert, LinearProgress
} from "@mui/material";

import { Add, CheckCircleOutline, PersonAdd, ExitToApp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

const AdminPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    // Acceder a los datos del store
    const { users, loading, error } = useSelector((state: RootState) => state.users);
    const [updatedUsers, setUpdatedUsers] = useState(users);

    // Estados locales
    const [badgeInput, setBadgeInput] = useState("");
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [newUserName, setNewUserName] = useState("");
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState<"success" | "error">("success");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    useEffect(() => {
        setUpdatedUsers(users);
    }, [users]);

    // Dar XP al usuario
    const handleGiveXP = async (userId: number) => {
        try {
            await dispatch(updateXP({ userId, xpAmount: 50 })).unwrap();
            setMessage("XP updated successfully!");
            setSeverity("success");
            dispatch(fetchUsers()); // Refrescar lista de usuarios
        } catch (error) {
            setMessage("Failed to update XP.");
            setSeverity("error");
        }
        setOpen(true);
    };

    // Asignar una insignia
    const handleAddBadge = async () => {
        if (!selectedUserId || !badgeInput.trim()) return;
        try {
            await dispatch(addBadge({ userId: selectedUserId, badge: badgeInput })).unwrap();
            setMessage("Badge assigned successfully!");
            setSeverity("success");
            dispatch(fetchUsers());
        } catch (error) {
            setMessage("Failed to assign badge.");
            setSeverity("error");
        }
        setBadgeInput("");
        setSelectedUserId(null);
        setOpen(true);
    };

    // Crear un nuevo usuario
    const handleCreateUser = async () => {
        if (!newUserName.trim()) return;
        try {
            await dispatch(createUser(newUserName)).unwrap();
            setMessage("User created successfully!");
            setSeverity("success");
            setNewUserName("");
            dispatch(fetchUsers());
        } catch (error) {
            setMessage("Failed to create user.");
            setSeverity("error");
        }
        setOpen(true);
    };

    // Cerrar sesión
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <Container maxWidth="md">
            {/* Notificación */}
            <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
                <Alert onClose={() => setOpen(false)} severity={severity} sx={{ width: "100%" }}>
                    {message}
                </Alert>
            </Snackbar>

            <Paper elevation={3} sx={{ padding: "20px", marginBottom: "20px", textAlign: "center", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h5" fontWeight="bold">Admin Panel</Typography>
                <Button variant="contained" color="error" startIcon={<ExitToApp />} onClick={handleLogout}>
                    Logout
                </Button>
            </Paper>

            {/* Mostrar error o carga */}
            {loading && <CircularProgress sx={{ display: "block", margin: "auto" }} />}
            {error && <Typography color="error" textAlign="center">{error}</Typography>}

            {/* Crear nuevo usuario */}
            <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
                <TextField
                    label="New User Name"
                    variant="outlined"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    sx={{ marginRight: 2 }}
                />
                <Button variant="contained" onClick={handleCreateUser} startIcon={<PersonAdd />}>
                    Add User
                </Button>
            </Box>

            {/* Asignar insignias */}
            {selectedUserId && (
                <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
                    <Typography variant="subtitle1">Assign a badge to user ID {selectedUserId}</Typography>
                    <TextField
                        label="Badge Name"
                        variant="outlined"
                        value={badgeInput}
                        onChange={(e) => setBadgeInput(e.target.value)}
                        sx={{ marginRight: 2 }}
                    />
                    <Button variant="contained" onClick={handleAddBadge} startIcon={<CheckCircleOutline />}>
                        Assign Badge
                    </Button>
                </Box>
            )}

            {/* Lista de usuarios */}
            <Grid container spacing={2}>
                {updatedUsers.map(({ id, name, xp, level, badges }) => (
                    <Grid item key={id} xs={12} sm={6}>
                        <Card sx={{ display: "flex", alignItems: "center", padding: "15px", boxShadow: 3 }}>
                            <Avatar sx={{ bgcolor: "grey.700", width: 45, height: 45, fontSize: "18px", marginRight: "10px" }}>
                                {name.charAt(0)}
                            </Avatar>

                            <CardContent sx={{ flexGrow: 1, padding: "5px" }}>
                                <Typography variant="body1" fontWeight="bold">{name}</Typography>
                                <Typography variant="caption" color="textSecondary">Level {level}</Typography>

                                {/* Barra de progreso de XP */}
                                <LinearProgress variant="determinate" value={(xp / 100) * 100} sx={{ marginTop: 1, height: 6, borderRadius: 3 }} />
                                <Typography variant="caption">XP: {xp} / 100</Typography>

                                <Divider sx={{ marginY: 1 }} />
                                <Typography variant="caption">
                                    Badges: {Array.isArray(badges) ? (badges.length > 0 ? badges.join(", ") : "No badges") : "No badges"}
                                </Typography>
                            </CardContent>

                            {/* Botones de acción */}
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                                <IconButton onClick={() => handleGiveXP(id)}>
                                    <Add />
                                </IconButton>
                                <IconButton onClick={() => setSelectedUserId(id)}>
                                    <CheckCircleOutline />
                                </IconButton>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Botón de Logout */}
            <LogoutButton />
        </Container>
    );
};

export default AdminPage;
