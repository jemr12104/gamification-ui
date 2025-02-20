import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRewards, addReward, redeemReward } from "../reducers/rewardsSlice";
import { RootState, AppDispatch } from "../store";
import { Card, CardContent, Typography, Grid, Button, Container, Paper, Avatar, Box, Divider, Switch, ThemeProvider, createTheme, TextField, Snackbar, Alert } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const Rewards = () => {
    const dispatch = useDispatch<AppDispatch>();

    // Acceder a los datos del store
    const { rewards, loading, error } = useSelector((state: RootState) => state.rewards);
    const [darkMode, setDarkMode] = useState(false);

    // Estados locales
    const [newRewardName, setNewRewardName] = useState("");
    const [newRewardXpCost, setNewRewardXpCost] = useState("");
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState<"success" | "error">("success");
    const [open, setOpen] = useState(false);

    // Simulación de usuario actual (esto debe venir de Redux en el futuro)
    const userId = 1;

    useEffect(() => {
        dispatch(fetchRewards());
    }, [dispatch]);

    // Agregar una nueva recompensa
    const handleAddReward = async () => {
        if (!newRewardName.trim() || !newRewardXpCost.trim()) {
            setMessage("Please enter a reward name and XP cost.");
            setSeverity("error");
            setOpen(true);
            return;
        }

        try {
            await dispatch(addReward({ name: newRewardName, xp_cost: parseInt(newRewardXpCost, 10) })).unwrap();
            setMessage("Reward added successfully!");
            setSeverity("success");
            setNewRewardName("");
            setNewRewardXpCost("");
        } catch (error) {
            setMessage("Failed to add reward.");
            setSeverity("error");
        }
        setOpen(true);
    };

    // Canjear una recompensa
    const handleRedeem = async (rewardId: number) => {
        try {
            await dispatch(redeemReward({ userId, rewardId })).unwrap();
            setMessage("Reward redeemed successfully!");
            setSeverity("success");
            dispatch(fetchRewards()); // Refrescar lista de recompensas
        } catch (error) {
            setMessage("Not enough XP to redeem this reward.");
            setSeverity("error");
        }
        setOpen(true);
    };

    const theme = createTheme({
        palette: {
            mode: darkMode ? "dark" : "light",
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="md">
                {/* Notificaciones */}
                <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
                    <Alert onClose={() => setOpen(false)} severity={severity} sx={{ width: "100%" }}>
                        {message}
                    </Alert>
                </Snackbar>

                {/* Header */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h5" fontWeight="bold">Rewards Store</Typography>
                    <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                </Box>

                {/* Mostrar error o carga */}
                {loading && <Typography textAlign="center">Loading rewards...</Typography>}
                {error && <Typography color="error" textAlign="center">{error}</Typography>}

                {/* Agregar nueva recompensa */}
                <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
                    <TextField
                        label="Reward Name"
                        variant="outlined"
                        value={newRewardName}
                        onChange={(e) => setNewRewardName(e.target.value)}
                        sx={{ marginRight: 2 }}
                    />
                    <TextField
                        label="XP Cost"
                        type="number"
                        variant="outlined"
                        value={newRewardXpCost}
                        onChange={(e) => setNewRewardXpCost(e.target.value)}
                        sx={{ marginRight: 2, width: "120px" }}
                    />
                    <Button variant="contained" color="success" startIcon={<AddCircleOutlineIcon />} onClick={handleAddReward}>
                        Add Reward
                    </Button>
                </Box>

                {/* Lista de recompensas */}
                <Grid container spacing={2}>
                    {rewards.length === 0 ? (
                        <Typography variant="h6" textAlign="center" sx={{ width: "100%", marginTop: "20px" }}>
                            No rewards available
                        </Typography>
                    ) : (
                        rewards.map(({ id, name, xp_cost }) => (
                            <Grid item key={id} xs={12} sm={6}>
                                <Card sx={{ display: "flex", alignItems: "center", padding: "15px", boxShadow: 3 }}>
                                    <Avatar sx={{ bgcolor: "#1E88E5", width: 50, height: 50, fontSize: "20px", marginRight: "10px" }}>
                                        <ShoppingCartIcon />
                                    </Avatar>
                                    <CardContent sx={{ flexGrow: 1, padding: "5px" }}>
                                        <Typography variant="h6" fontWeight="bold">{name}</Typography>
                                        <Divider sx={{ marginY: 1 }} />
                                        <Typography variant="body2">XP Cost: {xp_cost}</Typography>
                                    </CardContent>
                                    <Box sx={{ display: "flex", justifyContent: "center", paddingRight: "10px" }}>
                                        <Button variant="contained" color="primary" onClick={() => handleRedeem(id)}>
                                            Redeem
                                        </Button>
                                    </Box>
                                </Card>
                            </Grid>
                        ))
                    )}
                </Grid>
            </Container>
        </ThemeProvider>
    );
};

export default Rewards;
