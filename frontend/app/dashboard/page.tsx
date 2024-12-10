'use client'

import React from 'react'

import useCustomPath from '@/hooks/useCustomPath'
import { useAccountContext } from '@/components/Account/AccountContext';
import DashboardContent from '@/components/Dashboard/DashboardContent';

const DashboardPage = () => {

    const path = useCustomPath();
    const allowedRoles = path?.role;
    const { currentUser } = useAccountContext();

    return (
        <>
            {(allowedRoles && currentUser && allowedRoles.includes(currentUser?.role)) && <DashboardContent />}
        </>
    )
}

export default DashboardPage