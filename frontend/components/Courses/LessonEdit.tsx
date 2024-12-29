'use client'

import React, { useEffect, useState } from 'react'
import { useAccountContext } from '../Account/AccountContext'
import { useToastContext } from '../Toast/ToastContext'
import { getDetailLesson, patchEditCourse, patchEditLesson } from '@/services/api/courses'
import { usePathname } from 'next/navigation'
import { LessonType, NewLessonType } from '@/types'
import Link from 'next/link'

const LessonEdit = () => {

    const { currentUser } = useAccountContext();
    const { addToast } = useToastContext();
    const currentUrl = usePathname();
    const courseId = currentUrl.split('/')[2];
    const lessonId = currentUrl.split('/')[4];

    const [title, setTitle] = useState<string>('');
    const [desc, setDesc] = useState<string>('');
    const [thumbnail, setThumbnail] = useState<string>('');
    const [vid, setVid] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [order, setOrder] = useState<string>('1');

    // get current course data
    useEffect(() => {
        getDetailLesson(courseId, lessonId)
            .then(data => {
                // console.log(data); 
                setTitle(data.title)
                setDesc(data.description)
                setThumbnail(data.thumbnail)
                setVid(data.video_url)
                setContent(data.content)
                setOrder(`${data.order}`)
            })
            .catch(err => {
                console.log(err);
                const errMessage = err instanceof Error ? err.message : 'An error occured';
                addToast('error', errMessage);
            })
    }, [])

    // send request to edit lesson
    function handleEditLesson() {

        if (!currentUser || !['teacher', 'admin'].includes(currentUser.role)) {
            addToast('error', 'You are not allowed to edit course');
            return;
        }

        if (isNaN(Number(order))) {
            addToast('error', "The lesson's order should be a number");
            return;
        }

        const newLesson = {
            title,
            description: desc,
            thumbnail,
            video_url: vid,
            content,
            order: Number(order)
        }

        patchEditLesson(courseId, lessonId, newLesson)
            .then(data => {
                addToast('success', 'Your lesson edited');
                // console.log(data); 
            })
            .catch(err => {
                console.log(err);
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
                    <label htmlFor="order" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Order</label>
                    <input value={order} onChange={e => setOrder(e.target.value)} type="text" id="order"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Lesson's order in the course" required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="description" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Description</label>
                    <textarea value={desc} onChange={e => setDesc(e.target.value)} id="description" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="What's special?"></textarea>
                </div>
                <div className="mb-5">
                    <label htmlFor="content" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Content</label>
                    <textarea value={content} onChange={e => setContent(e.target.value)} id="content" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Main content of the lesson"></textarea>
                </div>
                <div className="mb-5">
                    <label htmlFor="thumbnail" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Thumbnail</label>
                    <input value={thumbnail} onChange={e => setThumbnail(e.target.value)} type="text" id="thumbnail"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Should be a nice image to show off!" required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="vid" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Video</label>
                    <input value={vid} onChange={e => setVid(e.target.value)} type="text" id="vid"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Video URL" required
                    />
                </div>

                <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleEditLesson}
                >
                    Submit changes
                </button>
            </form>
        </div>
    )
}

export default LessonEdit