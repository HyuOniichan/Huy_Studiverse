'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

import { RenderReviewStars } from '../Icons/Star'
import { useToastContext } from '../Toast/ToastContext'
import { CourseType } from '@/types'
import { getDetailCourse } from '@/services/api/courses'
import { usePathname } from 'next/navigation'
import { useAccountContext } from '../Account/AccountContext'
import { getDetailEnrollment, postCreateEnrollment } from '@/services/api/enrollment'

const CourseDetail = () => {

    const { addToast } = useToastContext();
    const { currentUser } = useAccountContext();
    const [course, setCourse] = useState<CourseType>();
    const [enrollStatus, setEnrollStatus] = useState(false);
    const url = usePathname();
    const courseId = url.split('/')[2];

    // Update later
    const rate = 3;
    const studentNumber = 1625;

    // get current path to fetch data
    useEffect(() => {
        getDetailCourse(courseId)
            .then(data => setCourse(data))
            .catch(err => {
                console.log(err);
                const errMessage = err instanceof Error ? err.message : 'An error occured';
                addToast('error', errMessage);
            })
        if (currentUser) {
            getDetailEnrollment(courseId, currentUser?._id)
                .then(data => setEnrollStatus(!!data))
                .catch(err => {
                    console.log(err);
                    const errMessage = err instanceof Error ? err.message : 'An error occured';
                    addToast('error', errMessage);
                })
        }
    }, [currentUser])

    function handleEnrollCourse() {

        if (!currentUser || currentUser === null) {
            addToast('warning', 'Please login to learn this course');
            return;
        }

        const newEnrollment = {
            courseId,
            studentId: currentUser._id
        };

        postCreateEnrollment(newEnrollment)
            .then(data => {
                setEnrollStatus(true); 
                addToast('success', 'You enrolled the course successfully');
            })
            .catch(err => {
                console.log(err);
                const errMessage = err instanceof Error ? err.message : 'An error occured';
                addToast('error', errMessage);
            })
    }
    
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
                                {course && course.title}
                            </h2>
                            <div className="flex flex-col sm:flex-row sm:items-center mb-6">
                                <h6
                                    className="font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5">
                                    {course && course.price + ' VND'}
                                </h6>
                                <div className="flex items-center gap-2">
                                    <RenderReviewStars numberOfStars={rate} />
                                    <span className="pl-2 font-normal leading-7 text-gray-500 text-sm ">{studentNumber} students</span>
                                </div>

                            </div>
                            <p className="text-gray-500 text-base font-normal mb-8 ">
                                {course && course.description}
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
                                    className={`${enrollStatus ? 'bg-indigo-400 ' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-400 '} text-center w-full px-5 py-4 rounded-[100px] flex items-center justify-center font-semibold text-lg text-white shadow-sm transition-all duration-500`}
                                    onClick={handleEnrollCourse}
                                    disabled={enrollStatus}
                                >
                                    {enrollStatus? 'Enrolled' : 'Enroll Now'}
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col h-full justify-center rounded overflow-hidden">
                            <img src={course && course.thumbnail} alt="course_thumbnail" className="mx-auto object-cover object-center" />
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="mb-2 ml-2 font-manrope font-bold text-3xl leading-10 text-gray-900">
                        Lessons
                    </h2>
                    <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
                        <thead className="bg-gray-100 dark:bg-gray-700">
                            <tr>
                                <th scope="col" className="p-4">
                                    Order
                                </th>
                                <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                    Name
                                </th>
                                <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                            {course?.lessons.map((data, index) => (
                                <tr className="hover:bg-gray-100 dark:hover:bg-gray-700" key={index}>
                                    <td className="w-4 p-4 text-center">
                                        {data.order}
                                    </td>
                                    <td className="flex items-center p-4 mr-12 space-x-6 whitespace-nowrap">
                                        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                            <div className="text-base font-semibold text-gray-900 dark:text-white">
                                                {data.title}
                                            </div>
                                            <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                                {data.description.slice(0, 50) + '...'}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 space-x-2 whitespace-nowrap">
                                        {enrollStatus && <Link href={`/courses/${course._id}/lesson/${data.order}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path>
                                            </svg>
                                            Learn
                                        </Link>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

        </div>
    )
}

export default CourseDetail