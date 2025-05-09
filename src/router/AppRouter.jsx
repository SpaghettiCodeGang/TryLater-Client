import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth.jsx";
import HomePage from '../pages/HomePage.jsx';
import LoginPage from '../pages/auth/LoginPage.jsx';
import RegisterPage from '../pages/auth/RegisterPage.jsx';
import MyRecommendationsPage from '../pages/myrecommendations/MyRecommendationsPage.jsx';
import SettingsPage from '../pages/settings/SettingsPage.jsx';
import PublicLayout from '../layouts/PublicLayout';
import PrivateLayout from '../layouts/PrivateLayout';
import DiscoverRecommendationsPage from "../pages/discoverrecommendations/DiscoverRecommendationsPage.jsx";
import NewRecommendationsPage from "../pages/newrecommendations/NewRecommendationsPage.jsx";
import ContactPage from "../pages/contact/ContactPage.jsx";
import LogoAnimation from "../components/LogoAnimation.jsx";

const AppRouter = () => {
    const { user, loadingLogo } = useAuth();

    if (loadingLogo) {
        return <LogoAnimation />
    }

    return (
        <Router>
            <Routes>
                {/* Public Pages */}
                <Route element={<PublicLayout />}>
                    <Route path="/" element={!user ? <HomePage /> : <Navigate to="/recommendations" />} />
                    <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/recommendations" />} />
                    <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to="/recommendations" />} />
                </Route>

                {/* Private Pages */}
                <Route element={<PrivateLayout />}>
                    <Route path="/recommendations" element={user ? <MyRecommendationsPage /> : <Navigate to="/" />} />
                    <Route path="/received" element={user ? <DiscoverRecommendationsPage /> : <Navigate to="/" />} />
                    <Route path="/create" element={user ? <NewRecommendationsPage user={user} /> : <Navigate to="/" />} />
                    <Route path="/contacts" element={user ? <ContactPage /> : <Navigate to="/login" />} />
                    <Route path="/settings" element={user ? <SettingsPage user={user} /> : <Navigate to="/" />} />
                </Route>

                {/* Catch-all */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;