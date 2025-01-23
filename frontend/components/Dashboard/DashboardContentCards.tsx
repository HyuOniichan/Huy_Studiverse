import Link from 'next/link'
import React from 'react'

type DashboardContentCardsProps<T = unknown> = {
    role: string[],
    url: string,
    api: string | (() => Promise<T>),
    label: string,
    icon: React.ElementType
}

const DashboardContentCards = (comp: DashboardContentCardsProps) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div className='flex flex-row gap-2 items-center'>
                <comp.icon />
                <h3 className="text-lg font-semibold text-gray-800 capitalize">{comp.label}</h3>
            </div>

            {/* Description */}
            {/* <p className="text-gray-600 text-sm my-2">{description}</p> */}

            <Link
                href={comp.url}
                className="mt-auto text-blue-600 font-semibold hover:underline"
            >
                See details
            </Link>
        </div>
    )
}

export default DashboardContentCards