'use client'

import { ReactNode, useState, createContext, useContext } from "react";
import ToastBox from "./ToastBox";

type Toast = {
    id: string;
    type: string; 
    message: string;
    duration: number;
}

interface ToastContextType {
    addToast: (type: string, message: string, duration?: number) => void;
    removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = (type: string = 'warning', message: string, duration: number = 3000) => {
        const id = `${Date.now()}`;
        setToasts(prev => [...prev, { id, type, message, duration }]);

        setTimeout(() => removeToast(id), duration);
    }

    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <ToastBox toasts={toasts} />
        </ToastContext.Provider>
    )

}

export const useToastContext = () => {
    const context = useContext(ToastContext); 
    if (!context) throw new Error('useToastContext must be used within a ToastProvider'); 
    return context; 
}
