import { useEffect, useState } from "react";
import { fetchUsers, updateXP, addBadge, logout } from "../actions/api.ts";
import { Card, CardContent, Typography, Grid, Button, TextField, Container, Box, Paper, Avatar, IconButton, Divider } from "@mui/material";
import { Add, CheckCircleOutline, PersonAdd, ExitToApp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [badgeInput, setBadgeInput] = useState("");
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [newUserName, setNewUserName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers().then(setUsers);
    }, []);

    const handleGiveXP = async (userId: number) => {
        const updatedUser = await updateXP(userId, 50);
        setUsers(users.map(user => user.id === userId ? updatedUser : user));
    };

    const handleAddBadge = async () => {
        if (!selectedUserId || !badgeInput.trim()) return;
        const updatedUser = await addBadge(selectedUserId, badgeInput);
        setUsers(users.map(user => user.id === selectedUserId ? updatedUser : user));
        setBadgeInput("");
        setSelectedUserId(null);
    };

    const handleCreateUser = async () => {
        if (!newUserName.trim()) return;
        const newUser = await createUser(newUserName);
        setUsers([...users, newUser]);
        setNewUserName("");
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={2} sx={{ padding: "20px", marginBottom: "20px", textAlign: "center", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h5" fontWeight="bold">Admin Panel</Typography>
                <Button variant="contained" color="error" startIcon={<ExitToApp />} onClick={handleLogout}>
                    Logout
                </Button>
            </Paper>

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

            <Grid container spacing={2}>
                {users.map(({ id, name, xp, level, badges }) => (
                    <Grid item key={id} xs={12} sm={6}>
                        <Card sx={{ display: "flex", alignItems: "center", padding: "15px", boxShadow: 1 }}>

                            <Avatar sx={{ bgcolor: "grey.700", width: 45, height: 45, fontSize: "18px", marginRight: "10px" }}>
                                {name.charAt(0)}
                            </Avatar>

                            <CardContent sx={{ flexGrow: 1, padding: "5px" }}>
                                <Typography variant="body1" fontWeight="bold">{name}</Typography>
                                <Typography variant="caption" color="textSecondary">Level {level}</Typography>

                                <Typography variant="caption">XP: {xp} / 100</Typography>

                                <Divider sx={{ marginY: 1 }} />
                                <Typography variant="caption">Badges: {badges.length ? badges.join(", ") : "No badges"}</Typography>
                            </CardContent>

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
        </Container>
    );
};
<LogoutButton />
export default AdminPage;
