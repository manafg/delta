import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MessageBar, MessageBarType } from '@fluentui/react';

// Define the context type
interface AlertContextType {
    showMessage: (message: string, type: MessageBarType) => void;
}

// Create the context
const AlertContext = createContext<AlertContextType | undefined>(undefined);

// Create a provider component
export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<MessageBarType>(MessageBarType.info);

    const showMessage = (message: string, type: MessageBarType) => {
        setMessage(message);
        setMessageType(type);

        // Automatically dismiss the message after 1 second
        setTimeout(() => {
            setMessage(null);
        }, 2500);
    };

    return (
        <AlertContext.Provider value={{ showMessage }}>
            {message && (
                <MessageBar
                    messageBarType={messageType}
                    onDismiss={() => setMessage(null)}
                >
                    {message}
                </MessageBar>
            )}
            {children}
        </AlertContext.Provider>
    );
};

// Custom hook to use the AlertContext
export const useAlert = (): AlertContextType => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlert must be used within an AlertProvider');
    }
    return context;
};
