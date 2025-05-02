import { createContext, useContext, useEffect, useState } from "react";
import apiService from './../service/apiService.jsx';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingLogo, setLoadingLogo] = useState(true);
    const [error, setError] = useState(null);
    const logoAnimationDuration = 2400;
    const loadingAnimationDuration = 500;

    useEffect(() => {
        apiService.get('/user/me')
            .then(response => setUser(response))
            .catch(() => setUser(null))
            .finally(() => {
                setTimeout(() =>
                    setLoadingLogo(false), logoAnimationDuration);
            });
    }, []);

    const userIsNotAuthenticated = () => {
        setLoadingLogo(true);
        setUser(null);
        setTimeout(() =>
            setLoadingLogo(false), logoAnimationDuration);
    }

    const register = async ( data ) => {
        setLoading(true);
        setError(null);

        try {
            await apiService.post('/user', data);
            return true;
        } catch (error) {
            setTimeout(() =>
                setError(error?.data?.errors), loadingAnimationDuration);
            return false;
        } finally {
            setTimeout(() =>
                setLoading(false), loadingAnimationDuration);
        }
    };

    const login = async ( data ) => {
        setLoading(true);
        setError(null);

        try {
            const user = await apiService.post('/auth/login', data);
            setLoadingLogo(true);
            setUser(user);
        } catch (error) {
            setTimeout(() =>
                setError(error?.data), loadingAnimationDuration);
        } finally {
            setTimeout(() =>
                setLoading(false), loadingAnimationDuration);
            setTimeout(() =>
                setLoadingLogo(false), logoAnimationDuration);
        }
    };

    const logout = async () => {
        setLoading(true);
        setError(null);

        try {
            await apiService.post('/auth/logout');
            setLoadingLogo(true);
        } catch (error) {
            setTimeout(() =>
                setError(error?.data), loadingAnimationDuration);
        } finally {
            setUser(null);
            setTimeout(() =>
                setLoading(false), loadingAnimationDuration);
            setTimeout(() =>
                setLoadingLogo(false), logoAnimationDuration);
        }
    };

    return (
        <AuthContext.Provider value={{ register, login, logout, userIsNotAuthenticated, user, loading, loadingLogo, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
