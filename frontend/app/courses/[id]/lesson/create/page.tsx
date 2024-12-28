'use client'

import React from 'react'
import LessonCreate from '@/components/Courses/LessonCreate'
import Sidebar from '@/components/Dashboard/Sidebar'
import Header from '@/components/Dashboard/Header'

const LessonCreatePage = () => {
	return (
		<div className='pt-20'>
			<Sidebar />
			<div className="p-4 sm:ml-64">
				<div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
					<Header path={'Create lesson'} />
					<LessonCreate />
				</div>
			</div>
		</div>
	)
}

export default LessonCreatePage