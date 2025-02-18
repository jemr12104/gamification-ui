import { useEffect, useState } from "react";
import { fetchUsers } from "../services/api";
import { Card, CardContent, Typography, Grid, LinearProgress, Container, Box, Avatar } from "@mui/material";
import { Star, TrendingUp } from "@mui/icons-material";

const UserProfile = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers().then(setUsers);
    }, []);

    return (
        <Container maxWidth="md">
            <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
                Gamification Dashboard
            </Typography>

            <Grid container spacing={2}>
                {users.map(({ id, name, xp, level, badges }) => (
                    <Grid item key={id} xs={12} sm={6}>
                        <Card sx={{ display: "flex", alignItems: "center", padding: "10px", boxShadow: 3 }}>

                            {/* Avatar Section */}
                            <Avatar sx={{ bgcolor: "#1E88E5", width: 50, height: 50, fontSize: "20px", marginRight: "10px" }}>
                                {name.charAt(0)}
                            </Avatar>

                            {/* User Info */}
                            <CardContent sx={{ flexGrow: 1, padding: "5px" }}>
                                <Typography variant="h6" fontWeight="bold">{name}</Typography>
                                <Typography variant="subtitle2" color="textSecondary">Level {level}</Typography>

                                {/* XP Progress Bar */}
                                <LinearProgress variant="determinate" value={(xp / 100) * 100} sx={{ marginTop: 1, height: 6, borderRadius: 3 }} />
                                <Typography variant="caption">XP: {xp} / 100</Typography>

                                {/* Badges */}
                                <Box sx={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "5px" }}>
                                    <Star sx={{ color: "#FFC107", fontSize: 18 }} />
                                    <Typography variant="caption">{badges.length ? badges.join(", ") : "No badges yet"}</Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default UserProfile;
