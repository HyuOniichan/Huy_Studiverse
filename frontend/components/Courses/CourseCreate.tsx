'use client'

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { sidebarLinks } from '@/constant/constant'
import Breadcrumb from '../Breadcrumb/Breadcrumb'
import { useAccountContext } from '../Account/AccountContext'
import { useToastContext } from '../Toast/ToastContext'

const CourseCreate = () => {

    const { currentUser } = useAccountContext();
    const { addToast } = useToastContext();

    // get the path to render breadcrumb
    const [path, setPath] = useState<string>('');

    useEffect(() => {
        const currentView = sidebarLinks.find(e => e.url === window.location.pathname);
        if (currentView) setPath(currentView.label.toLowerCase());
    })

    const breadcrumbPaths = [
        {
            label: path || 'Courses',
            url: '/dashboard/courses'
        },
        {
            label: 'Create course',
            url: '/dashboard/courses/create'
        },
    ]

    const [title, setTitle] = useState<string>('');
    const [desc, setDesc] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [thumbnail, setThumbnail] = useState<string>('');
    const [tags, setTags] = useState<string>('');

    // send request to create new course
    function handleSubmit() {

        if (!currentUser || !['teacher', 'admin'].includes(currentUser.role)) {
            addToast('error', 'You are not allowed to create new course');
            return;
        }

        const tagsArr = tags.trim().split(',').map(tag => tag.trim()).filter(e => e);
        const newCourse = {
            title,
            description: desc,
            price,
            thumbnail,
            tags: tagsArr,
            creator: currentUser?._id,
            lessons: []
        }

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/course/store`, {
            method: 'POST', 
            body: JSON.stringify(newCourse), 
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(errorData => {
                        throw new Error(errorData.message || 'An error occured');
                    }).catch(err => {
                        const errMessage = err instanceof Error ? err.message : 'An error occured';
                        addToast('error', errMessage);
                    })
                }
                addToast('success', 'Your course created');
                return res.json();
            })
            .catch(err => {
                const errMessage = err instanceof Error ? err.message : 'An error occured';
                addToast('error', errMessage);
            })
    }

    return (
        <div className="p-4 pt-24">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">

                <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
                    <div className="w-full mb-1">
                        <div className="mb-4">
                            <Breadcrumb paths={breadcrumbPaths} />
                            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white capitalize">
                                Create new course
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
                                <Link href={`/dashboard/courses`} type="button" className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 sm:w-auto dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                    <svg className="w-5 h-5 mr-1 -ml-1 rotate-45" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                    Cancel
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

                {/* CREATE FORM */}
                <div className="mt-4">
                    <form className="max-w ml-8">
                        <div className="mb-5">
                            <label htmlFor="title" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Title</label>
                            <input value={title} onChange={e => setTitle(e.target.value)} type="text" id="title"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Pick a unique name" required
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="description" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Description</label>
                            <textarea value={desc} onChange={e => setDesc(e.target.value)} id="description" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="What's special?"></textarea>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="price" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Price</label>
                            <input value={price} onChange={e => setPrice(e.target.value)} type="text" id="price"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="skip if your course is free" required
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="thumbnail" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Thumbnail</label>
                            <input value={thumbnail} onChange={e => setThumbnail(e.target.value)} type="text" id="thumbnail"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Should be a nice image to show off!" required
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="tags" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Tags</label>
                            <input value={tags} onChange={e => setTags(e.target.value)} type="text" id="tags"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Seperated, by, commas" required
                            />
                        </div>
                        <button 
                            type="button" 
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default CourseCreate