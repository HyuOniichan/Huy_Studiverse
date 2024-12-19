'use client'

import React, { useEffect, useState } from 'react'
import { useAccountContext } from '../Account/AccountContext'
import ContentAdmin from './ContentRole/ContentAdmin'
import ContentTeacher from './ContentRole/ContentTeacher'
import ContentStudent from './ContentRole/ContentStudent'
import useCustomPath from '@/hooks/useCustomPath'
import { CourseType, UserType } from '@/types'
import { sidebarLinks } from '@/utils/constant'
import { useToastContext } from '../Toast/ToastContext'

const Content = () => {

    const { currentUser } = useAccountContext();
    const { addToast } = useToastContext();
    const customPath = useCustomPath();
    const path = customPath?.label;
    const currentUrl = customPath?.url;
    const [currentData, setCurrentData] = useState<(UserType | CourseType)[] | undefined>(undefined);

    useEffect(() => {
        const currentView = sidebarLinks.find(e => e.url === currentUrl);

        if (currentView?.api && typeof (currentView.api) === 'function') {
            currentView.api()
                .then(data => setCurrentData(data))
                .catch(err => {
                    console.log(err);
                    const errMessage = err instanceof Error ? err.message : 'An error occured';
                    addToast('error', errMessage);
                })
        }
    }, [path])

    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden shadow">
                        {(currentUser?.role === 'admin') && <ContentAdmin currentData={currentData} />}
                        {(currentUser?.role === 'teacher') && <ContentTeacher currentData={currentData} />}
                        {(currentUser?.role === 'student') && <ContentStudent currentData={currentData} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Content