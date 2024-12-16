'use client'

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { sidebarLinks } from '@/utils/constant'
import Breadcrumb from '../base/Breadcrumb'
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
    )
}

export default CourseCreate