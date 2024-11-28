'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useToastContext } from '../Toast/ToastContext'

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
    lessons: string[];
    creator: UserType;
    createdAt: Date;
    updatedAt: Date;
}

const CourseList = () => {

    const toast = useToastContext();
    const [courses, setCourses] = useState<CourseType[] | null>(null);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/course`, {
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
        <>
            <h1 className='text-3xl font-bold mb-4 ms-4'>Courses list</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {
                    courses && courses.map(course => (
                        <div key={course._id} className="max-w bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <Link href={`/courses/${course._id}`}>
                                <img className="rounded-t-lg" src={course.thumbnail} alt="course_thumbnail" />
                            </Link>
                            <div className="p-5">
                                <Link href={`/courses/${course._id}`}>
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {course.title}
                                    </h5>
                                </Link>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                    {course.description}
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>

        </>
    )
}

export default CourseList