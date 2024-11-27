'use client'

import React, { useEffect, useState } from 'react'
import { sidebarLinks } from '@/constant/constant'
import { useToastContext } from '../Toast/ToastContext'
import ContentTable from './ContentTable'
import Link from 'next/link'

type UserType = {
    _id: string;
    role: string;
    about: string;
    avatar: string;
    username: string;
    email: string;
    created_courses: string[];
    enrolled_courses: string[];
}

type CourseType = {
    title: string;
    description: string;
    price: string;
    thumbnail: string;
    tags: string[];
    lessons: string[];
    creator: string;
    createdAt: Date;
    updatedAt: Date;
}

const Content = () => {

    const { addToast } = useToastContext();
    const [currentData, setCurrentData] = useState<(UserType | CourseType)[] | undefined>(undefined);
    const [path, setPath] = useState<string>('');

    useEffect(() => {
        // get the path 
        const currentView = sidebarLinks.find(e => e.url === window.location.pathname);
        if (currentView) setPath(currentView.label.toLowerCase());
        else addToast('error', 'Cannot display current view');

        // fetch data based on the path
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_LINK}${currentView?.api}`, {
            method: 'GET',
            credentials: 'include'
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(errorData => {
                        throw new Error(errorData.message || 'An error occured');
                    }).catch(err => {
                        if (currentView?.api) addToast('error', err.message);
                    });
                }
                return res.json();
            })
            .then(data => setCurrentData(data))
            .catch(err => {
                if (currentView?.api) addToast('error', err.message);
            })

    }, [])

    return (
        <div className="p-4 sm:ml-64">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">

                <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
                    <div className="w-full mb-1">
                        <div className="mb-4">
                            <nav className="flex mb-5" aria-label="Breadcrumb">
                                <ol className="inline-flex items-center space-x-1 text-sm font-medium md:space-x-2">
                                    <li className="inline-flex items-center">
                                        <Link href="/" className="inline-flex items-center text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white">
                                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <div className="flex items-center">
                                            <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                            <span className="ml-1 text-gray-400 md:ml-2 dark:text-gray-500 capitalize" aria-current="page">{path}</span>
                                        </div>
                                    </li>
                                </ol>
                            </nav>
                            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white capitalize">
                                {path}
                            </h1>
                        </div>
                        <div className="sm:flex">
                            <div className="items-center hidden mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0 dark:divide-gray-700">
                                <form className="lg:pr-3" action="#" method="GET">
                                    <label htmlFor="users-search" className="sr-only">Search</label>
                                    <div className="relative mt-1 lg:w-64 xl:w-96">
                                        <input type="text" name="email" id="users-search" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" />
                                    </div>
                                </form>
                                <div className="flex pl-0 mt-3 space-x-1 sm:pl-2 sm:mt-0">
                                    <a href="#" className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path></svg>
                                    </a>
                                    <a href="#" className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                    </a>
                                    <a href="#" className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                    </a>
                                    <a href="#" className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-center ml-auto space-x-2 sm:space-x-3">
                                <Link href="/account/register" type="button" className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg className="w-5 h-5 mr-1 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                    Add {path.split(' ').slice(-1)}
                                </Link>
                                <button
                                    type="button"
                                    data-refresh
                                    className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                                >
                                    <svg
                                        className="w-5 h-5 mr-2 -ml-1"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                                        ></path>
                                    </svg>
                                    Refresh
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table of data */}
                <div className="flex flex-col">
                    <div className="overflow-x-auto">
                        <div className="inline-block min-w-full align-middle">
                            <div className="overflow-hidden shadow">
                                <ContentTable path={path} currentData={currentData} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Content