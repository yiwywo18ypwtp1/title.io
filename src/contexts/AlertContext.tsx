import React, { createContext, useContext, useState } from "react";
import Alert from "../components/FloatAlert";

export type AlertType = "success" | "error";

export interface AlertMessage {
    id: string;
    text: string;
    type: AlertType;
    duration?: number;
}

interface AlertContextType {
    addAlert: (text: string, type: AlertType, duration?: number) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [alerts, setAlerts] = useState<AlertMessage[]>([]);

    const addAlert = (text: string, type: AlertType, duration: number = 3000) => {
        const id = Date.now().toString();
        setAlerts((prev) => [...prev, { id, text, type, duration }]);
    };

    const removeAlert = (id: string) => {
        setAlerts((prev) => prev.filter((a) => a.id !== id));
    };

    return (
        <AlertContext.Provider value={{ addAlert }}>
            {children}
            {alerts.map((alert) => (
                <Alert
                    key={alert.id}
                    text={alert.text}
                    type={alert.type}
                    duration={alert.duration}
                    setError={() => removeAlert(alert.id)}
                />
            ))}
        </AlertContext.Provider>
    );
};

export const useAlert = (): AlertContextType => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error("useAlert must be used within an AlertProvider");
    }
    return context;
};