import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#102A43", // Deep corporate blue
        },
        secondary: {
            main: "#243B55", // Dark blue-gray
        },
        background: {
            default: "#E3E6E8", // Light gray corporate background
            paper: "#FFFFFF", // Card background
        },
        text: {
            primary: "#0D1B2A", // Dark blue-black for primary text
            secondary: "#829AB1", // Light gray for secondary text
        },
    },
    typography: {
        fontFamily: "'Inter', sans-serif",
        h6: {
            fontWeight: "bold",
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundImage: "url('/assets/background.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    borderRadius: 10,
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                        transform: "translateY(-2px)", // Elevación más limpia en hover
                        boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    padding: "20px",
                    borderRadius: 12,
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.2)", // Sombras más sutiles
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 14,
                    backgroundColor: "#FFFFFF", // Fondo sólido sin transparencia
                    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.45)", // Mayor profundidad sin desenfoque
                    display: "flex",
                    alignItems: "center",
                    padding: "16px",
                    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                    "&:hover": {
                        transform: "translateY(-5px)", // Elevación suave sin distorsión
                        boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.3)",
                    },
                },
            },
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    width: 45,
                    height: 45,
                    fontSize: "18px",
                    backgroundColor: "#243B55",
                    color: "#FFFFFF",
                    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.2)", // Reducción de sombras para menos distorsión
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 6,
                    fontSize: "13px",
                    fontWeight: "bold",
                    backgroundColor: "#102A43", // Azul corporativo
                    color: "#FFFFFF",
                    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.15)", // Sombras más limpias
                    position: "relative", // 📌 Se asegura de que no sea cubierto por otras cajas
                    zIndex: 2, // 📌 Se mantiene por encima de otros elementos
                },
            },
        },
    },
});

export default theme;
