import { useState } from 'react';
import axios from 'axios';

const useDelete = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [response, setResponse] = useState<any>(null);

    const deleteRequest = async (id: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await axios.delete(`pipelines/${id}`);
            setResponse(res.data);
        } catch (err) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, error, response, deleteRequest };
};

export default useDelete;