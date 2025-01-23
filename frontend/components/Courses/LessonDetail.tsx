'use client'

import React, { useEffect, useState } from 'react'
import { useAccountContext } from '../Account/AccountContext';
import Link from 'next/link';
import { useToastContext } from '../Toast/ToastContext';
import { redirect, usePathname } from 'next/navigation';
import { LessonType } from '@/types';
import { getDetailCourse, getLessons } from '@/services/api/courses';

const LessonDetail = () => {

    const { currentUser } = useAccountContext();
    const { addToast } = useToastContext();
    const [lessons, setLessons] = useState<LessonType[]>([]);
    const [courseThumbnail, setCourseThumbnail] = useState<string>('/images/placeholder_image.png');
    const [courseTitle, setCourseTitle] = useState<string>('');
    const [lessonId, setLessonId] = useState<string>('');
    const [showSidebar, setShowSidebar] = useState(true);
    const pathname = usePathname();
    const url = pathname.split('/');
    const courseId = url[2];

    // navigate between lessons on sidebar
    function changeLesson(lsId: string) {
        setLessonId(lsId);
        redirect(`/courses/${courseId}/lesson/${lsId}`);
    }

    // show/hide sidebar
    function toggleSidebar() {
        setShowSidebar(prev => !prev);
    }

    // get course id and order from current url
    useEffect(() => {
        setLessonId(url[4]);

        if (!currentUser) addToast('warning', 'Please log in to learn');

        getDetailCourse(courseId)
            .then(data => {
                setCourseThumbnail(data.thumbnail); 
                setCourseTitle(data.title); 
            })
            .catch(err => {
                console.log(err);
                const errMessage = err instanceof Error ? err.message : "Fail to get course's courseThumbnail";
                addToast('error', errMessage);
            })

        getLessons(courseId)
            .then(data => {
                setLessons(data);
                if (data.length) changeLesson(data[0]._id);
            })
            .catch(err => {
                console.log(err);
                const errMessage = err instanceof Error ? err.message : 'An error occured';
                addToast('error', errMessage);
            })

    }, [])

    return (
        <div className="pt-20 flex flex-row ">

            {/* Sidebar - navigate lessons */}
            <aside className="z-40 fixed top-16 h-screen start-0 max-w-80 transition-transform sm:translate-x-0" aria-label="Sidebar">
                <button className={`absolute top-8 p-1 hover:bg-gray-100 rounded-md transition-transform ${showSidebar ? 'end-2' : 'start-2 rotate-180'}`} onClick={toggleSidebar}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                        <path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z" />
                    </svg>
                </button>
                <div className={`h-full px-3 py-8 overflow-y-auto bg-gray-50 dark:bg-gray-800 transition-all ${showSidebar ? '' : '-translate-x-full'}`}>
                    <div className="flex items-center mb-5">
                        <img src={courseThumbnail} className="h-4 w-7 rounded-md me-3 sm:h-7" alt="courseThumbnail" />
                        <Link href={`/courses/${courseId}`} className="self-center text-md font-semibold whitespace-nowrap dark:text-white">{courseTitle}</Link>
                    </div>
                    <ul className="space-y-2 font-medium">
                        {lessons.map((lesson, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => changeLesson(lesson._id)}
                                    className={`text-left p-2 text-gray-900 rounded-lg w-full dark:text-white ${lesson._id === lessonId ? '' : `hover:`}bg-gray-100 dark:${lesson._id === lessonId ? '' : `hover:`}bg-gray-700 group`}
                                >
                                    <span className="mx-2">{lesson.order + '. ' + lesson.title}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>

            {/* Content */}
            <div className={`p-4 transition-all ${showSidebar ? 'translate-x-80 w-9/12' : 'translate-x-12 w-11/12'}`}>
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    {currentUser && (<iframe
                        // width="560"
                        // height="315"
                        className="w-full aspect-video"
                        src={lessons.find((lesson: LessonType) => lesson._id === lessonId)?.video_url}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>)}
                    <div className="mt-12">
                        <h2 className="text-2xl mb-2">Content</h2>
                        {lessons.find((lesson: LessonType) => lesson._id === lessonId)?.content.split('\n')
                            .map((ct, index) => (<div key={index}>{ct}<br /></div>))
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default LessonDetail