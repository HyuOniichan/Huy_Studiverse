'use client'

import { useAccountContext } from '@/components/Account/AccountContext';
import React from 'react'

// interface ContentAdminProps {
//     data
// }

const ContentAdmin = () => {

    const { currentUser } = useAccountContext();
    console.log(currentUser)


    return (
        <div>ContentAdmin</div>
    )
}

export default ContentAdmin