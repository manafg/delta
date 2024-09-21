import { useState } from 'react';
import axios from 'axios';
const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [loginError, setError] = useState<string | null>(null);

    const login = async (username: string, password: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.post('https://account.kafryuba.com/connect/token', new URLSearchParams({
                grant_type: 'password',
                username,
                password,
                client_id: 'Pipebricks_App',
                scope: 'offline_access email Pipebricks'
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            if (response.data && response.data.access_token) {
                localStorage.setItem('token', response.data.access_token);
                localStorage.setItem('refresh_token', response.data.refresh_token);
                setIsSuccess(true);
            } else {
                setError('Invalid response from server');
            }
        } catch (err: any) {
            console.log(err);
            setError(err?.message || 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return { login, isLoading, isSuccess, loginError };
};

export default useLogin;
