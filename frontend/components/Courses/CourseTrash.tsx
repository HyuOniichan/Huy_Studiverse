'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useToastContext } from '../Toast/ToastContext'
import { CourseType } from '@/types'

const CourseTrash = () => {

    const toast = useToastContext();
    const [courses, setCourses] = useState<CourseType[] | null>(null);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/course/deleted`, {
            method: 'GET',
            credentials: 'include'
        })
            .then(res => {
                if (!res.ok) {
                    res.json()
                        .then((errorData: { error: string, message: string }) => {
                            throw new Error(errorData.message || 'An error occured');
                        })
                        .catch(err => toast.addToast('error', err.message))
                }
                return res.json();
            })
            .then(data => setCourses(data))
            .catch((err: Error) => toast.addToast('error', err.message))
    }, [])


    return (
        <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
            <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                    <th scope="col" className="p-4">
                        <div className="flex items-center">
                            <input id="checkbox-all" aria-describedby="checkbox-1" type="checkbox" className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                        </div>
                    </th>
                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                        Title
                    </th>
                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                        Creator
                    </th>
                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                        Deleted by
                    </th>
                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {courses && courses.map((data, index) => (
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700" key={index}>
                        <td className="w-4 p-4">
                            <div className="flex items-center">
                                <input id="checkbox-{{ .id }}" aria-describedby="checkbox-1" type="checkbox" className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="checkbox-{{ .id }}" className="sr-only">
                                    checkbox
                                </label>
                            </div>
                        </td>
                        <td className="flex items-center p-4 mr-12 space-x-6 whitespace-nowrap">
                            <img
                                className='w-10 h-10 rounded-md'
                                src={data.thumbnail}
                                alt="Avatar"
                            />
                            <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                <div className="text-base font-semibold text-gray-900 dark:text-white">
                                    {data.title}
                                </div>
                                <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                    {data.tags.join(', ')}
                                </div>
                            </div>
                        </td>
                        <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize">
                            {data.creator.username}
                        </td>
                        <td className="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
                            <div className="flex items-center">
                                {data.deleted_by ? data.deleted_by.username : 'username'}
                            </div>
                        </td>
                        <td className="p-4 space-x-2 whitespace-nowrap">
                            <button type="button" data-modal-toggle="edit-user-modal" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                <svg className="w-4 h-4 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 -960 960 960">
                                    <path d="M440-320h80v-166l64 62 56-56-160-160-160 160 56 56 64-62v166ZM280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z" />
                                </svg>
                                Restore
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default CourseTrash