import React from 'react'

import { sidebarLinks } from '@/utils/constant'
import { useAccountContext } from '../Account/AccountContext'
import DashboardContentCards from './DashboardContentCards';

// This content is only used for route /dashboard 
const DashboardContent = () => {

    const { currentUser } = useAccountContext();
    const allowedLinks = sidebarLinks
        .filter(sidebarLink => (currentUser && sidebarLink.role.includes(currentUser?.role)))
        
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-2">
            {allowedLinks.map((link, index) => (link.label !== 'dashboard') && (
                <DashboardContentCards
                    key={index}
                    {...link}
                />
            ))}
        </div>
    )
}

export default DashboardContent