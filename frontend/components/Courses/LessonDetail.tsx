'use client'

import React, { useEffect, useState } from 'react'
import { useAccountContext } from '../Account/AccountContext';
import Link from 'next/link';
import { useToastContext } from '../Toast/ToastContext';
import { redirect } from 'next/navigation';

type UserType = {
    _id: string;
    role: string;
    about: string;
    avatar: string;
    username: string;
    email: string;
    created_courses: CourseType[];
    enrolled_courses: CourseType[];
}

type CourseType = {
    _id: string,
    title: string;
    description: string;
    price: string;
    thumbnail: string;
    tags: string[];
    lessons: LessonType[];
    creator: UserType;
    createdAt: Date;
    updatedAt: Date;
}

type LessonType = {
    _id: string;
    title: string;
    description: string;
    video_url: string;
    content: string;
    course: CourseType;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

const LessonDetail = () => {

    const { currentUser } = useAccountContext();
    const { addToast } = useToastContext();
    const [course, setCourse] = useState<CourseType | undefined>();
    const [order, setOrder] = useState<number>(1);
    const [showSidebar, setShowSidebar] = useState(true); 

    // navigate between lessons on sidebar
    function changeLesson(ord: number) {
        setOrder(ord);
        redirect(`/courses/${course?._id}/lesson/${ord}`);
    }

    // show/hide sidebar
    function toggleSidebar() {
        setShowSidebar(prev => !prev); 
    }

    // get course id and order from current url
    useEffect(() => {
        const url = window.location.pathname.split('/');
        setOrder(parseInt(url[4])); 
        if (!currentUser) addToast('warning', 'Please log in to learn');

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/course/${url[2]}`)
            .then(res => {
                if (!res.ok) {
                    return res.json().then(errorData => {
                        throw new Error(errorData.message || 'An error occured');
                    }).catch(err => {
                        const errMessage = err instanceof Error ? err.message : 'An error occured';
                        addToast('error', errMessage);
                    })
                }
                return res.json();
            })
            .then(data => {
                setCourse(data)
            })
            .catch(err => {
                const errMessage = err instanceof Error ? err.message : 'An error occured';
                addToast('error', errMessage);
            })

    }, [])

    return (
        <div className="pt-20">

            {/* Sidebar - navigate lessons */}
            <aside className="fixed z-40 top-16 left-0 z-40 min-w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <button className={`absolute top-8 p-1 hover:bg-gray-100 rounded-md transition-transform ${showSidebar? 'end-2' : 'start-2 rotate-180'}`} onClick={toggleSidebar}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                        <path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z" />
                    </svg>
                </button>
                <div className={`h-full px-3 py-8 overflow-y-auto bg-gray-50 dark:bg-gray-800 transition-transform ${showSidebar? '' : '-translate-x-full'}`}>
                    <div className="flex items-center mb-5">
                        <img src={course?.thumbnail} className="h-4 w-7 rounded-md me-3 sm:h-7" alt="thumbnail" />
                        <Link href={`/courses/${course?._id}`} className="self-center text-md font-semibold whitespace-nowrap dark:text-white">{course?.title}</Link>
                    </div>
                    <ul className="space-y-2 font-medium">
                        {course?.lessons.map((lesson, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => changeLesson(lesson.order)}
                                    className={`flex items-center p-2 text-gray-900 rounded-lg w-full dark:text-white ${lesson.order === order ? '' : `hover:`}bg-gray-100 dark:${lesson.order === order ? '' : `hover:`}bg-gray-700 group`}
                                >
                                    <span className="mx-2">{lesson.order + '. ' + lesson.title}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>

            {/* Content */}
            <div className={`p-4 sm:ml-64`}>
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    {currentUser && (<iframe
                        width="560"
                        height="315"
                        src={course?.lessons.find((lesson: LessonType) => lesson.order === order)?.video_url}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>)}
                    <div className="mt-12">
                        <h2 className="text-2xl mb-2">Content</h2>
                        {course?.lessons.find((lesson: LessonType) => lesson.order === order)?.content.split('\n').map((ct, index) => (<div key={index}>{ct}<br/></div>))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default LessonDetail