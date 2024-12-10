'use client'

import React from 'react'

import Content from '@/components/Dashboard/Content'
import useCustomPath from '@/hooks/useCustomPath'
import { useAccountContext } from '@/components/Account/AccountContext';
import { usePathname } from 'next/navigation';

const DashboardPage = () => {

    const path = useCustomPath();
    const allowedRoles = path?.role;
    const { currentUser } = useAccountContext();

    return (
        <>
            {(allowedRoles && currentUser && allowedRoles.includes(currentUser?.role)) && <Content />}
        </>
    )
}

export default DashboardPage