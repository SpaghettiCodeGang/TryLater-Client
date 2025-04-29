import { useCallback, useEffect, useState } from 'react';
import apiService from '../service/apiService';
import {useAuth} from "./useAuth.jsx";

export const useFetch = (path, options = { skip: false }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(!options.skip);
    const [error, setError] = useState(null);
    const [trigger, setTrigger] = useState(0);
    const { userIsNotAuthenticated } = useAuth();

    const refetch = useCallback(() => {
        setTrigger(prev => prev + 1);
    }, []);

    useEffect(() => {
        if (options.skip) return;

        let cancelled = false;

        setLoading(true);
        apiService.get(path)
            .then(response => {
                if (!cancelled) setData(response);
            })
            .catch(error => {
                if (error?.status === 401 || error?.status === 403) {
                    userIsNotAuthenticated();
                }

                if (!cancelled) setError(error?.data);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => { cancelled = true };
    }, [path, trigger]);

    return { data, loading, error, refetch };
};
