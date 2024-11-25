'use client'

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useToastContext } from '../Toast/ToastContext';

type AccountType = {
    userId: string;
    role: string;
}

interface AccountContextType {
    currentUser: AccountType | null;
    updateUser: (user: AccountType | null) => void;
}

const AccountContext = createContext<AccountContextType | null>(null);

export const AccountProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [currentUser, setCurrentUser] = useState<AccountType | null>(null);
    const toast = useToastContext();

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/user`, {
            method: 'GET',
            credentials: 'include'
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(errorData => {
                        throw new Error(errorData || 'An error occured');
                    })
                }
                return res.json();
            })
            .then(data => {
                const { userId, role } = data;
                updateUser({ userId, role });
            })
            .catch(err => console.log(err));
    }, [])

    const updateUser = (user: AccountType | null) => {
        setCurrentUser(user)
        if (user !== null) toast.addToast('success', 'Welcome bro!');
    }

    return (
        <AccountContext.Provider value={{ currentUser, updateUser }}>
            {children}
        </AccountContext.Provider>
    )
}

export const useAccountContext = () => {
    const context = useContext(AccountContext);
    if (!context) throw new Error('Cannot check current user');
    return context;
}