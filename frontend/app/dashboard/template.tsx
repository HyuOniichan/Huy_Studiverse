'use client'

import React, { ReactNode } from 'react'

import Sidebar from '@/components/Dashboard/Sidebar'
import Header from '@/components/Dashboard/Header'
import useCustomPath from '@/hooks/useCustomPath'

const DashboardTemplate = ({ children }: { children: ReactNode }) => {

    const path = useCustomPath();

    return (
        <div className='pt-20'>

            <Sidebar />

            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">

                    <Header path={path?.label} />

                    {children}

                </div>
            </div>

        </div>
    )
}

export default DashboardTemplate