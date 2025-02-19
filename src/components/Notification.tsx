import { Snackbar, Alert } from "@mui/material";
import { useState } from "react";

const Notification = ({ message, severity, open, onClose }) => {
    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
            <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Notification;
