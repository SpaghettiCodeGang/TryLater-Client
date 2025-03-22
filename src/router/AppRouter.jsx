import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {useState} from "react";
import Home from '../pages/Home.jsx';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Recommendations from '../pages/Recommendations';
import Settings from '../pages/Settings';
import PublicLayout from '../layouts/PublicLayout';
import PrivateLayout from '../layouts/PrivateLayout';
import ReceivedRecommendations from "../pages/ReceivedRecommendations.jsx";
import CreateRecommendations from "../pages/CreateRecommendations.jsx";
import Contacts from "../pages/Contacts.jsx";

const AppRouter = () => {
    // TODO: Die Authentifizierung muss später noch implementiert werden. (useAuth()-Hook erstellen)
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Router>
            <Routes>
                {/* Public Pages */}
                <Route element={<PublicLayout setIsLoggedIn={setIsLoggedIn} />}>
                    <Route path="/" element={!isLoggedIn ? <Home /> : <Navigate to="/recommendations" />} />
                    <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/recommendations" />} />
                    <Route path="/register" element={!isLoggedIn ? <Register /> : <Navigate to="/recommendations" />} />
                </Route>

                {/* Private Pages */}
                <Route element={<PrivateLayout setIsLoggedIn={setIsLoggedIn} />}>
                    <Route path="/recommendations" element={isLoggedIn ? <Recommendations /> : <Navigate to="/login" />} />
                    <Route path="/recommendations/received" element={isLoggedIn ? <ReceivedRecommendations /> : <Navigate to="/login" />} />
                    <Route path="/recommendations/create" element={isLoggedIn ? <CreateRecommendations /> : <Navigate to="/login" />} />
                    <Route path="/contacts" element={isLoggedIn ? <Contacts /> : <Navigate to="/login" />} />
                    <Route path="/settings" element={isLoggedIn ? <Settings /> : <Navigate to="/login" />} />
                </Route>

                {/* Catch-all */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;