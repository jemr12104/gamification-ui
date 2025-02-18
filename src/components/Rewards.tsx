import { useEffect, useState } from "react";
import { fetchRewards, redeemReward, addReward } from "../action/api.ts";
import { Card, CardContent, Typography, Grid, Button, Container, Paper, Avatar, Box, Divider, TextField } from "@mui/material";
import { ShoppingCart, AddCircleOutline } from "@mui/icons-material";

const Rewards = () => {
    const [rewards, setRewards] = useState([]);
    const [newRewardName, setNewRewardName] = useState("");
    const [newRewardXpCost, setNewRewardXpCost] = useState("");

    useEffect(() => {
        fetchRewards().then(setRewards);
    }, []);

    const handleRedeem = async (rewardId: number) => {
        try {
            await redeemReward(1, rewardId); // Replace with actual user ID
            alert("Reward redeemed successfully!");
            setRewards(await fetchRewards());
        } catch (error) {
            alert("Not enough XP to redeem this reward.");
        }
    };

    const handleAddReward = async () => {
        if (!newRewardName.trim() || !newRewardXpCost.trim()) {
            alert("Please enter a reward name and XP cost.");
            return;
        }

        try {
            await addReward(newRewardName, parseInt(newRewardXpCost, 10));
            alert("Reward added successfully!");
            setNewRewardName("");
            setNewRewardXpCost("");
            setRewards(await fetchRewards());
        } catch (error) {
            alert("Failed to add reward.");
        }
    };

    return (
        <Container maxWidth="md">
            <Paper
                elevation={3}
                sx={{ padding: "20px", marginBottom: "30px", textAlign: "center", backgroundColor: "#1E88E5", color: "#fff" }}
            >
                <Typography variant="h5" fontWeight="bold">Rewards Store</Typography>
            </Paper>

            {/* Add Reward Section */}
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
                <Button variant="contained" color="success" startIcon={<AddCircleOutline />} onClick={handleAddReward}>
                    Add Reward
                </Button>
            </Box>

            <Grid container spacing={2}>
                {rewards.length === 0 ? (
                    <Typography variant="h6" textAlign="center" sx={{ width: "100%", marginTop: "20px" }}>
                        No rewards available
                    </Typography>
                ) : (
                    rewards.map(({ id, name, xp_cost }) => (
                        <Grid item key={id} xs={12} sm={6}>
                            <Card sx={{ display: "flex", alignItems: "center", padding: "15px", boxShadow: 3 }}>

                                {/* Avatar/Icon */}
                                <Avatar sx={{ bgcolor: "#1E88E5", width: 50, height: 50, fontSize: "20px", marginRight: "10px" }}>
                                    <ShoppingCart />
                                </Avatar>

                                {/* Reward Info */}
                                <CardContent sx={{ flexGrow: 1, padding: "5px" }}>
                                    <Typography variant="h6" fontWeight="bold">{name}</Typography>
                                    <Divider sx={{ marginY: 1 }} />
                                    <Typography variant="body2">XP Cost: {xp_cost}</Typography>
                                </CardContent>

                                {/* Redeem Button */}
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
    );
};

export default Rewards;
