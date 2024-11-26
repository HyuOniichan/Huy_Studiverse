'use client'

import React, { useState, useEffect } from 'react'

import { RenderReviewStars } from '../Icons/Star'
import { useToastContext } from '../Toast/ToastContext'

type CourseType = {
    title: string;
    description?: string;
    price?: string;
    thumbnail?: string;
    tags?: string[];
    lessons: string[];
    createdAt: Date;
    updatedAt: Date;
}

const CourseDetail = () => {

    const [path, setPath] = useState(''); 
    const { addToast } = useToastContext();
    const [course, setCourse] = useState<CourseType | null>(null);

    // Update later
    const rate = 3;
    const studentNumber = 1625;

    // get current path to fetch data
    useEffect(() => {
        const url = window.location.pathname.split('/'); 
        setPath(url[url.length-1]); 
    }, [])
    
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/course/${path}`, {
            method: 'GET',
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
                return res.json();
            })
            .then(data => setCourse(data))
            .catch(err => {
                const errMessage = err instanceof Error ? err.message : 'An error occured';
                addToast('error', errMessage);
            })
    }, [path])

    return (
        <div>
            <section className="py-10 lg:py-24 relative ">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                        <div className="pro-detail w-full flex flex-col justify-center order-last lg:order-none max-lg:max-w-[608px] max-lg:mx-auto">
                            <p className="font-medium text-lg text-indigo-600 mb-4">
                                {course && course.tags && course.tags.map((tag, index) => {
                                    if (index) return ` | ${tag}`;
                                    return `${tag}`;
                                })}
                            </p>
                            <h2 className="mb-2 font-manrope font-bold text-3xl leading-10 text-gray-900">
                                {course?.title}
                            </h2>
                            <div className="flex flex-col sm:flex-row sm:items-center mb-6">
                                <h6
                                    className="font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5">
                                    {course?.price + ' VND'}
                                </h6>
                                <div className="flex items-center gap-2">
                                    <RenderReviewStars numberOfStars={rate} />
                                    <span className="pl-2 font-normal leading-7 text-gray-500 text-sm ">{studentNumber} students</span>
                                </div>

                            </div>
                            <p className="text-gray-500 text-base font-normal mb-8 ">
                                {course?.description}
                            </p>
                            <div className="flex items-center gap-3">
                                        <button
                                            className="group transition-all duration-500 p-4 rounded-full bg-indigo-50 hover:bg-indigo-100 hover:shadow-sm hover:shadow-indigo-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26"
                                                fill="none">
                                                <path
                                                    d="M4.47084 14.3196L13.0281 22.7501L21.9599 13.9506M13.0034 5.07888C15.4786 2.64037 19.5008 2.64037 21.976 5.07888C24.4511 7.5254 24.4511 11.4799 21.9841 13.9265M12.9956 5.07888C10.5204 2.64037 6.49824 2.64037 4.02307 5.07888C1.54789 7.51738 1.54789 11.4799 4.02307 13.9184M4.02307 13.9184L4.04407 13.939M4.02307 13.9184L4.46274 14.3115"
                                                    stroke="#4F46E5" strokeWidth="1.6" strokeMiterlimit="10"
                                                    strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>

                                        </button>
                                        <button
                                            className="text-center w-full px-5 py-4 rounded-[100px] bg-indigo-600 flex items-center justify-center font-semibold text-lg text-white shadow-sm transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400">
                                            Enroll Now
                                        </button>
                                    </div>
                        </div>
                        <div className="flex flex-col h-full justify-center rounded overflow-hidden">
                            <img src={course?.thumbnail} alt="course_thumbnail" className="mx-auto object-cover object-center" />
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default CourseDetail