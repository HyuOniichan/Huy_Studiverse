'use client'

import React from 'react'
import CourseCreate from '@/components/Courses/CourseCreate'
import Sidebar from '@/components/Dashboard/Sidebar'
import Header from '@/components/Dashboard/Header'

const CourseCreatePage = () => {
	return (
		<div className='pt-20'>
			<Sidebar />
			<div className="p-4 sm:ml-64">
				<div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
					<Header path={'Create course'} />
					<CourseCreate />
				</div>
			</div>
		</div>
	)
}

export default CourseCreatePage