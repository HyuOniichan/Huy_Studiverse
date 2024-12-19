'use client'

import useCustomPath from '@/hooks/useCustomPath';
import React, { useState } from 'react'
import { useAccountContext } from '../Account/AccountContext';
import { dbCrudLinks } from '@/utils/constant';
import Link from 'next/link';

const HeaderActBtn = () => {

    const { currentUser } = useAccountContext();
    const path = useCustomPath();
    // const currentPath = path?.url;
    const currentPath = dbCrudLinks.find(e => {
        if (e.url === path?.url) return e; 
    })

    const isRender = (
        path?.label !== 'dashboard'
        && (currentUser && ['admin', 'teacher'].includes(currentUser?.role))
    )

    const btnType = currentPath ? 'cancel' : 'add';

    return (
        <>{isRender && (
            <>
                {
                    (btnType === 'add') && (
                        <Link href={`/dashboard/${path ? path.label.split(' ').slice(-1) : ''}/create`} type="button" className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg className="w-5 h-5 mr-1 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                            Add {path ? path.label.split(' ').slice(-1) : 'new'}
                        </Link>
                    )
                }

                {
                    (btnType === 'cancel') && (
                        <Link href={currentPath ? currentPath?.redirect : ''} type="button" className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 sm:w-auto dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                            <svg className="w-5 h-5 mr-1 -ml-1 rotate-45" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                            Cancel
                        </Link>
                    )
                }
            </>
        )}</>
    )
}

export default HeaderActBtn