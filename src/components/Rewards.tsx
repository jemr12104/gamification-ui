import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRewards, addReward, redeemReward } from "../reducers/rewardsSlice";
import { RootState, AppDispatch } from "../store";
import { Card, CardContent, Typography, Grid, Button, Container, Paper, Avatar, Box, Divider, TextField, Snackbar, Alert } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LogoutButton from "../components/LogoutButton";

const Rewards = () => {
    const dispatch = useDispatch<AppDispatch>();

    // Accessing state from Redux
    const { rewards, loading, error } = useSelector((state: RootState) => state.rewards);

    // Local state
    const [newRewardName, setNewRewardName] = useState("");
    const [newRewardXpCost, setNewRewardXpCost] = useState("");
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState<"success" | "error">("success");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchRewards());
    }, [dispatch]);

    // Add a new reward
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
            setMessage("Failed to add the reward.");
            setSeverity("error");
        }
        setOpen(true);
    };

    // Redeem a reward
    const handleRedeem = async (rewardId: number) => {
        try {
            await dispatch(redeemReward({ userId: 1, rewardId })).unwrap();
            setMessage("Reward redeemed successfully!");
            setSeverity("success");
            dispatch(fetchRewards());
        } catch (error) {
            setMessage("Not enough XP to redeem this reward.");
            setSeverity("error");
        }
        setOpen(true);
    };

    return (
        <Container maxWidth="md">
            {/* Notifications */}
            <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
                <Alert onClose={() => setOpen(false)} severity={severity} sx={{ width: "100%" }}>
                    {message}
                </Alert>
            </Snackbar>

            {/* Header */}
            <Paper elevation={3} sx={{ padding: 2, textAlign: "center", mb: 2 }}>
                <Typography variant="h5" fontWeight="bold">Rewards Store</Typography>
            </Paper>

            {/* Show error or loading */}
            {loading && <Typography textAlign="center">Loading rewards...</Typography>}
            {error && <Typography color="error" textAlign="center">{error}</Typography>}

            {/* Add new reward */}
            <Box sx={{ textAlign: "center", marginBottom: 2 }}>
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
                <Button variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />} onClick={handleAddReward}>
                    Add Reward
                </Button>
            </Box>

            {/* Rewards List */}
            <Grid container spacing={2}>
                {rewards.length === 0 ? (
                    <Typography variant="h6" textAlign="center" sx={{ width: "100%", marginTop: 2 }}>
                        No rewards available
                    </Typography>
                ) : (
                    rewards.map(({ id, name, xp_cost }) => (
                        <Grid item key={id} xs={12} sm={6}>
                            <Card>
                                <Avatar>
                                    <ShoppingCartIcon />
                                </Avatar>
                                <CardContent>
                                    <Typography variant="h6" fontWeight="bold">{name}</Typography>
                                    <Divider sx={{ marginY: 1 }} />
                                    <Typography variant="body2">XP Cost: {xp_cost}</Typography>
                                </CardContent>
                                <Box sx={{ display: "flex", justifyContent: "center", paddingRight: 2 }}>
                                    <Button variant="contained" color="secondary" onClick={() => handleRedeem(id)}>
                                        Redeem
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>

            <Box textAlign="center" mt={3}>
                <LogoutButton />
            </Box>
        </Container>
    );
};

export default Rewards;
