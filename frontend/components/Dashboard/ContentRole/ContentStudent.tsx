'use client'

import React from 'react'
import { CourseType, UserType } from '@/types';
import Link from 'next/link';

interface ContentProps {
    currentData: (UserType | CourseType)[] | undefined;
}

const ContentStudent = ({ currentData }: ContentProps) => {

    return (
        <>
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
                            Name
                        </th>
                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                            Teacher
                        </th>
                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                            Status
                        </th>
                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {(currentData && currentData.length) ? currentData.map((data, index) => (
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
                                    src={(data as CourseType).thumbnail}
                                    alt="Avatar"
                                />
                                <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                    <div className="text-base font-semibold text-gray-900 dark:text-white">
                                        {(data as CourseType).title}
                                    </div>
                                    <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                        {(data as CourseType).tags && (data as CourseType).tags.join(', ')}
                                    </div>
                                </div>
                            </td>
                            <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize">
                                {(data as CourseType).creator && (data as CourseType).creator.username}
                            </td>
                            <td className="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
                                <div className="flex items-center">
                                    <div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div>
                                    Active
                                </div>
                            </td>
                            <td className="p-4 space-x-2 whitespace-nowrap">
                                <Link href={`/courses/${(data as CourseType)._id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path>
                                    </svg>
                                    View course
                                </Link>
                                {/* <button type="button" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900">
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
                                    </svg>
                                    Drop out
                                </button> */}
                            </td>
                        </tr>
                    )) : (
                        <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                            <td></td>
                            <td className="py-2">Find your favourite one and let&apos;s start!</td>
                            <td></td><td></td><td></td><td></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}

export default ContentStudent