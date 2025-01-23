'use client'

import React, { useEffect, useState } from 'react'
import { useAccountContext } from '../Account/AccountContext'
import { useToastContext } from '../Toast/ToastContext'
import { getDetailCourse, patchDeleteLesson, patchEditCourse, patchRestoreLesson } from '@/services/api/courses'
import { usePathname } from 'next/navigation'
import { LessonType } from '@/types'
import Link from 'next/link'

const CourseEdit = () => {

    const { currentUser } = useAccountContext();
    const { addToast } = useToastContext();
    const currentUrl = usePathname();
    const courseId = currentUrl.split('/')[2];

    const [title, setTitle] = useState<string>('');
    const [desc, setDesc] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [thumbnail, setThumbnail] = useState<string>('');
    const [tags, setTags] = useState<string>('');
    const [lessons, setLessons] = useState<LessonType[]>([]);

    // get current course data
    useEffect(() => {
        getDetailCourse(courseId)
            .then(data => {
                // console.log(data); 
                setTitle(data.title);
                setDesc(data.description);
                setPrice(data.price);
                setThumbnail(data.thumbnail);
                setTags(data.tags.join(', '));
                setLessons(data.lessons);
            })
            .catch(err => {
                console.log(err);
                const errMessage = err instanceof Error ? err.message : 'An error occured';
                addToast('error', errMessage);
            })
    }, [])

    // send request to edit course
    function handleEditCourse() {

        if (!currentUser || !['teacher', 'admin'].includes(currentUser.role)) {
            addToast('error', 'You are not allowed to edit course');
            return;
        }

        const tagsArr = tags.trim().split(',').map(tag => tag.trim()).filter(e => e);
        const newCourse = {
            title,
            description: desc,
            price,
            thumbnail,
            tags: tagsArr
        }

        patchEditCourse(courseId, newCourse)
            .then(() => {
                addToast('success', 'Your course edited');
            })
            .catch(err => {
                console.log(err);
                const errMessage = err instanceof Error ? err.message : 'An error occured';
                addToast('error', errMessage);
            })
    }

    // handle delete lesson 
    function handleDeleteLesson(lessonId: string) {

        if (!currentUser || !['teacher', 'admin'].includes(currentUser.role)) {
            addToast('error', 'You are not allowed to edit course');
            return;
        }

        if (!confirm('Are you sure to delete this lesson?')) return;

        // call api request
        patchDeleteLesson(courseId, lessonId)
            .then(() => {
                toggleDeleteLesson(lessonId, true); 
                addToast('success', 'Your lesson deleted');
            })
            .catch(err => {
                console.log(err);
                const errMessage = err instanceof Error ? err.message : 'An error occured';
                addToast('error', errMessage);
            })
    }

    // restore lesson 
    function handleRestoreLesson(lessonId: string) {
        patchRestoreLesson(courseId, lessonId)
            .then(() => {
                toggleDeleteLesson(lessonId, false); 
                addToast('success', 'Your lesson restored');
            })
            .catch(err => {
                console.log(err);
                const errMessage = err instanceof Error ? err.message : 'An error occured';
                addToast('error', errMessage);
            })
    }

    // update UI after delete/restore lesson 
    function toggleDeleteLesson(lessonId: string, deleted: boolean) {
        const deletedAt = (deleted)? new Date() : null; 
        setLessons((prev: LessonType[]) => prev.map((lesson: LessonType) => {
            if (lesson._id === lessonId) {
                return { ...lesson, deleted_at: deletedAt };
            }
            return lesson;
        }));
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
                <div className="mb-5">
                    <div className="flex flex-row justify-between align-center mb-2">
                        <h4 className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Lessons</h4>
                        <Link href={`/courses/${courseId}/lesson/create`} type="button" className="px-3 py-1 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg className="w-4 h-4 mr-1 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                            Add lesson
                        </Link>
                    </div>
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Order
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Title
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {lessons.map((lesson, index) =>
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-6 py-4">
                                            {lesson.order}
                                        </td>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {lesson.title}
                                        </th>
                                        <td className="px-6 py-4 flex flex-row gap-4">
                                            {(lesson.deleted_at === null) && (<Link
                                                href={`/courses/${courseId}/lesson/${lesson._id}/edit`}
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                            >
                                                Edit
                                            </Link>)}
                                            {(lesson.deleted_at !== null) ? (
                                                <p
                                                    className="font-medium text-green-600 dark:text-green-500 hover:underline hover:cursor-pointer"
                                                    onClick={() => handleRestoreLesson(lesson._id)}
                                                >
                                                    Restore
                                                </p>
                                            ) : (
                                                <p
                                                    className="font-medium text-red-600 dark:text-red-500 hover:underline hover:cursor-pointer"
                                                    onClick={() => handleDeleteLesson(lesson._id)}
                                                >
                                                    Delete
                                                </p>
                                            )}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleEditCourse}
                >
                    Submit changes
                </button>
            </form>
        </div>
    )
}

export default CourseEdit