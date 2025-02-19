import { useEffect, useState } from "react";
import { fetchUsers } from "../actions/api.ts";
import { Card, CardContent, Typography, Grid, LinearProgress, Container, Paper, Avatar, Divider } from "@mui/material";
import LogoutButton from "../components/LogoutButton";
const UserProfile = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers().then(setUsers);
    }, []);

    // @ts-ignore
    return (
        <Container maxWidth="md">
            <Paper elevation={2} sx={{ padding: "20px", marginBottom: "20px", textAlign: "center" }}>
                <Typography variant="h5" fontWeight="bold">User Dashboard</Typography>
            </Paper>

            <Grid container spacing={2}>
                {users.map(({ id, name, xp, level, badges }) => (
                    <Grid item key={id} xs={12} sm={6}>
                        <Card sx={{ display: "flex", alignItems: "center", padding: "15px", boxShadow: 1 }}>

                            {/* Avatar */}
                            <Avatar sx={{ bgcolor: "grey.700", width: 45, height: 45, fontSize: "18px", marginRight: "10px" }}>
                                {name.charAt(0)}
                            </Avatar>

                            {/* User Info */}
                            <CardContent sx={{ flexGrow: 1, padding: "5px" }}>
                                <Typography variant="body1" fontWeight="bold">{name}</Typography>
                                <Typography variant="caption" color="textSecondary">Level {level}</Typography>

                                {/* XP Progress */}
                                <LinearProgress variant="determinate" value={(xp / 100) * 100} sx={{ marginTop: 1, height: 6, borderRadius: 3 }} />
                                <Typography variant="caption">XP: {xp} / 100</Typography>

                                {/* Badges */}
                                <Divider sx={{ marginY: 1 }} />
                                <Typography variant="caption">Badges: {badges.length ? badges.join(", ") : "No badges"}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};
<LogoutButton />
export default UserProfile;
