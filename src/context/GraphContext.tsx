import React, { useState, useContext } from 'react';

const JobIdContext = React.createContext<{
    jobId: string | undefined;
    setJobId: React.Dispatch<React.SetStateAction<string | undefined>>;
    graph: any; // Replace 'any' with the appropriate type for your graph
    setGraph: React.Dispatch<React.SetStateAction<any>>; // Replace 'any' with the appropriate type
} | undefined>(undefined);

export const JobIdProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [jobId, setJobId] = useState<string | undefined>(undefined);
    const [graph, setGraph] = useState<any>(undefined); // Initialize with the appropriate default value

    return (
        <JobIdContext.Provider value={{ jobId, setJobId, graph, setGraph }}>
            {children}
        </JobIdContext.Provider>
    );
};

export const useJobId = () => {
    const context = useContext(JobIdContext);
    if (!context) {
        throw new Error('useJobId must be used within a JobIdProvider');
    }
    return context;
};

