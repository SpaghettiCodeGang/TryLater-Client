import {createContext, useContext, useState} from "react";
import apiService from './../service/apiService.jsx';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const register = async ( data ) => {
        setLoading(true);
        setError(null);

        try {
            return await apiService.post('/user', data);
        } catch (error) {
            setTimeout(() =>
                setError(error.data?.errors), 1000);
            return null
        } finally {
            setTimeout(() => setLoading(false), 1000);
        }
    };

    return (
        <AuthContext.Provider value={{ register, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
