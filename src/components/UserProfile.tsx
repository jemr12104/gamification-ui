import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../reducers/userSlice";
import { RootState, AppDispatch } from "../store";
import { Card, CardContent, Typography, Grid, LinearProgress, Container, Paper, Avatar, CircularProgress, Box, Chip } from "@mui/material";
import { WorkspacePremium, MilitaryTech, Star } from "@mui/icons-material";
import LogoutButton from "../components/LogoutButton";

const UserProfile = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { users, loading, error } = useSelector((state: RootState) => state.users) || { users: [], loading: false, error: null };

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const sortedUsers = [...users].sort((a, b) => b.xp - a.xp);

    return (
        <Container maxWidth="lg">
            <Grid container spacing={3} alignItems="flex-start">
                {/* Sección de Perfil */}
                <Grid item xs={12} md={8}>
                    <Paper elevation={3} sx={{ padding: 2, textAlign: "center", mb: 2 }}>
                        <Typography variant="h6" fontWeight="bold">User Dashboard</Typography>
                    </Paper>

                    {loading && <CircularProgress sx={{ display: "block", margin: "auto", mt: 3 }} />}
                    {error && <Typography color="error" textAlign="center">{error}</Typography>}

                    <Grid container spacing={2}>
                        {users.map(({ id, name, xp, level, badges }) => (
                            <Grid item key={id} xs={12} sm={6}>
                                <Card sx={{ display: "flex", alignItems: "center", padding: 2 }}>
                                    <Avatar sx={{ marginRight: 2 }}>{name.charAt(0)}</Avatar>
                                    <CardContent>
                                        <Typography variant="body2" fontWeight="bold">{name}</Typography>
                                        <Typography variant="caption">Nivel {level}</Typography>
                                        <LinearProgress variant="determinate" value={(xp / 100) * 100} sx={{ mt: 1, height: 6, borderRadius: 3 }} />
                                        <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                            {badges.length > 0 ? badges.map((badge, index) => (
                                                <Chip key={index} label={badge} color="primary" size="small" />
                                            )) : <Typography variant="caption">Sin badges</Typography>}
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                {/* Sección de Ranking */}
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ padding: 2, textAlign: "center", mb: 2 }}>
                        <Typography variant="h6" fontWeight="bold">Ranking</Typography>
                    </Paper>

                    <Box sx={{ maxHeight: "400px", overflowY: "auto" }}>
                        <Grid container spacing={2}>
                            {sortedUsers.map(({ id, name, xp, level, badges }, index) => {
                                let icon;

                                if (index === 0) icon = <WorkspacePremium fontSize="small" />;
                                else if (index === 1) icon = <MilitaryTech fontSize="small" />;
                                else if (index === 2) icon = <Star fontSize="small" />;
                                else icon = name.charAt(0);

                                return (
                                    <Grid item xs={12} key={id}>
                                        <Card sx={{ display: "flex", alignItems: "center", padding: 2 }}>
                                            <Avatar sx={{ marginRight: 2 }}>{icon}</Avatar>
                                            <CardContent>
                                                <Typography variant="body2" fontWeight="bold">{name}</Typography>
                                                <Typography variant="caption">Nivel {level}</Typography>
                                                <Typography variant="caption">XP: {xp}</Typography>
                                                <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                                    {badges.length > 0 ? badges.map((badge, index) => (
                                                        <Chip key={index} label={badge} color="secondary" size="small" />
                                                    )) : <Typography variant="caption">Sin badges</Typography>}
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Box>
                </Grid>
            </Grid>

            <Box textAlign="center" mt={2}>
                <LogoutButton />
            </Box>
        </Container>
    );
};

export default UserProfile;
