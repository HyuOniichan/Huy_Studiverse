'use client'

import React, { useEffect } from 'react'
import { useAccountContext } from '../Account/AccountContext'
import { sidebarLinks } from '@/utils/constant'
import Link from 'next/link'
import { useToastContext } from '../Toast/ToastContext'

const Sidebar = () => {

    const { currentUser } = useAccountContext();
    const { addToast } = useToastContext();
    console.log(currentUser)

    // Guest cannot access to dashboard
    useEffect(() => {
        if (currentUser === null) {
            addToast('warning', 'Please log in');
        }
    }, [])

    return (
        <aside id="logo-sidebar" className="fixed z-40 top-20 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center ps-2.5 mb-5">
                    <img src={currentUser?.avatar} className="h-6 me-3 sm:h-7" alt="Avatar" />
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">{currentUser?.username}</span>
                </div>
                <ul className="space-y-2 font-medium">
                    {sidebarLinks.map((link, index) => currentUser && (link.role.includes(currentUser?.role)) && (
                        <li key={index}>
                            <Link href={link.url} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <link.icon />
                                <span className="ms-3">{link.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar