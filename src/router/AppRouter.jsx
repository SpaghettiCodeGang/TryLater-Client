import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {useState} from "react";
import HomePage from '../pages/HomePage.jsx';
import LoginPage from '../pages/auth/LoginPage.jsx';
import RegisterPage from '../pages/auth/RegisterPage.jsx';
import MyRecommendationsPage from '../pages/recommendation/MyRecommendationsPage.jsx';
import SettingsPage from '../pages/SettingsPage.jsx';
import PublicLayout from '../layouts/PublicLayout';
import PrivateLayout from '../layouts/PrivateLayout';
import DiscoverRecommendationsPage from "../pages/recommendation/DiscoverRecommendationsPage.jsx";
import NewRecommendationsPage from "../pages/recommendation/NewRecommendationsPage.jsx";
import ContactPage from "../pages/contact/ContactPage.jsx";

const AppRouter = () => {
    // TODO: Die Authentifizierung muss später noch implementiert werden. (useAuth()-Hook erstellen)
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Router>
            <Routes>
                {/* Public Pages */}
                <Route element={<PublicLayout setIsLoggedIn={setIsLoggedIn} />}>
                    <Route path="/" element={!isLoggedIn ? <HomePage /> : <Navigate to="/recommendations" />} />
                    <Route path="/login" element={!isLoggedIn ? <LoginPage /> : <Navigate to="/recommendations" />} />
                    <Route path="/register" element={!isLoggedIn ? <RegisterPage /> : <Navigate to="/recommendations" />} />
                </Route>

                {/* Private Pages */}
                <Route element={<PrivateLayout setIsLoggedIn={setIsLoggedIn} />}>
                    <Route path="/recommendations" element={isLoggedIn ? <MyRecommendationsPage /> : <Navigate to="/login" />} />
                    <Route path="/recommendations/received" element={isLoggedIn ? <DiscoverRecommendationsPage /> : <Navigate to="/login" />} />
                    <Route path="/recommendations/create" element={isLoggedIn ? <NewRecommendationsPage /> : <Navigate to="/login" />} />
                    <Route path="/contacts" element={isLoggedIn ? <ContactPage /> : <Navigate to="/login" />} />
                    <Route path="/settings" element={isLoggedIn ? <SettingsPage /> : <Navigate to="/login" />} />
                </Route>

                {/* Catch-all */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;