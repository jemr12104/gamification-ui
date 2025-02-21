import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../reducers/userSlice";
import { RootState, AppDispatch } from "../store";
import { Card, CardContent, Typography, Grid, LinearProgress, Container, Paper, Avatar, Divider, CircularProgress, Box } from "@mui/material";
import { EmojiEvents } from "@mui/icons-material";

const UserProfile = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { users, loading, error } = useSelector((state: RootState) => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const sortedUsers = [...users].sort((a, b) => b.xp - a.xp);

    return (
        <Container maxWidth="lg">
            <Grid container spacing={4}>
                {/* Sección de Perfil */}
                <Grid item xs={12} md={8}>
                    <Paper elevation={2} sx={{ padding: "20px", marginBottom: "20px", textAlign: "center" }}>
                        <Typography variant="h5" fontWeight="bold">User Dashboard</Typography>
                    </Paper>

                    {loading && <CircularProgress sx={{ display: "block", margin: "auto" }} />}
                    {error && <Typography color="error" textAlign="center">{error}</Typography>}

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
                                        <LinearProgress variant="determinate" value={(xp / 100) * 100} sx={{ marginTop: 1, height: 6, borderRadius: 3 }} />
                                        <Typography variant="caption">XP: {xp} / 100</Typography>
                                        <Divider sx={{ marginY: 1 }} />
                                        <Typography variant="caption">Badges: {badges.length ? badges.join(", ") : "No badges"}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                {/* Sección de Leaderboard */}
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ padding: "20px", textAlign: "center" }}>
                        <Typography variant="h6" fontWeight="bold">Leaderboard</Typography>
                    </Paper>

                    <Box sx={{ maxHeight: "500px", overflowY: "auto", marginTop: "10px" }}>
                        <Grid container spacing={2}>
                            {sortedUsers.map(({ id, name, xp, level }, index) => (
                                <Grid item key={id} xs={12}>
                                    <Card sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        padding: "15px",
                                        boxShadow: 3,
                                        backgroundColor: index === 0 ? "#FFD700" : index === 1 ? "#C0C0C0" : index === 2 ? "#CD7F32" : "white"
                                    }}>
                                        <Avatar sx={{ bgcolor: "primary.main", width: 50, height: 50, fontSize: "20px", marginRight: "10px" }}>
                                            {index < 3 ? <EmojiEvents /> : name.charAt(0)}
                                        </Avatar>
                                        <CardContent sx={{ flexGrow: 1, padding: "5px" }}>
                                            <Typography variant="h6" fontWeight="bold">{name}</Typography>
                                            <Typography variant="body2" color="textSecondary">Level {level}</Typography>
                                            <Typography variant="caption">XP: {xp}</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default UserProfile;
