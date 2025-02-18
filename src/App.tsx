import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserProfile from "./pages/UserProfile";
import AdminPage from "./pages/AdminPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<UserProfile />} />
                <Route path="/admin" element={<AdminPage />} />
            </Routes>
        </Router>
    );
}

export default App;
