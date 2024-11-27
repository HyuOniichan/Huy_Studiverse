import React from 'react'
import Sidebar from './Sidebar'
import Content from './Content'

const Dashboard = () => {
    return (
        <div className='pt-20'>
            <Sidebar />
            <Content />
        </div>
    )
}

export default Dashboard