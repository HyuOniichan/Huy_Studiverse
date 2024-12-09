'use client'

import React, { useEffect, useState } from 'react'
import { sidebarLinks } from '@/utils/constant'
import { useToastContext } from '../Toast/ToastContext'
import { UserType, CourseType } from '@/types'
import { usePathname } from 'next/navigation'
import useCustomPath from '@/hooks/useCustomPath'
import { useAccountContext } from '../Account/AccountContext'
import ContentAdmin from './ContentRole/ContentAdmin'
import ContentTeacher from './ContentRole/ContentTeacher'
import ContentStudent from './ContentRole/ContentStudent'

const Content = () => {

    const currentUrl = usePathname();
    const { addToast } = useToastContext();
    const [currentData, setCurrentData] = useState<(UserType | CourseType)[] | undefined>(undefined);
    const { currentUser } = useAccountContext();
    const path = useCustomPath();

    // fetch data based on the path
    useEffect(() => {
        const currentView = sidebarLinks.find(e => e.url === currentUrl);

        if (currentView?.api) {
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_LINK}${currentView.api}`, {
                method: 'GET',
                credentials: 'include'
            })
                .then(res => {
                    if (!res.ok) {
                        return res.json().then(errorData => {
                            throw new Error(errorData.message || 'An error occured');
                        }).catch(err => {
                            addToast('error', err.message);
                        });
                    }
                    return res.json();
                })
                .then(data => setCurrentData(data))
                .catch(err => {
                    addToast('error', err.message);
                })
        }

    }, [])

    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden shadow">
                        {(currentUser?.role === 'admin') && <ContentAdmin currentData={currentData} />}
                        {(currentUser?.role === 'teacher') && <ContentTeacher />}
                        {(currentUser?.role === 'student') && <ContentStudent />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Content