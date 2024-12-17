import Course from "@/components/Icons/Course"
import Dashboard from "@/components/Icons/Dashboard"
import Products from "@/components/Icons/Products"
import Users from "@/components/Icons/Users"

export const navLinks = [
    {
        id: 1,
        url: '/',
        label: 'home'
    },
    {
        id: 2,
        url: '/about',
        label: 'about'
    },
    {
        id: 3,
        url: '/courses',
        label: 'courses'
    },
    // {
    //     id: 4,
    //     url: '/blogs',
    //     label: 'blogs'
    // },
    {
        id: 5,
        url: '/dashboard',
        label: 'dashboard'
    },
]

// prefix - /dashboard /...
export const sidebarLinks = [
    {
        role: ['admin', 'teacher', 'student'],
        url: '/dashboard', 
        api: '',
        label: 'dashboard', 
        icon: Dashboard
    }, 
    {
        role: ['admin'], 
        url: '/dashboard/users', 
        api: '/user/all',
        label: 'users', 
        icon: Users
    }, 
    {
        role: ['admin'], 
        url: '/dashboard/courses', 
        api: '/course',
        label: 'all courses', 
        icon: Course
    }, 
    {
        role: ['teacher'], 
        url: '/dashboard/courses/managed', 
        api: '',
        label: 'managed courses', 
        icon: Course
    }, 
    {
        role: ['teacher', 'student'], 
        url: '/dashboard/courses/enrolled', 
        api: '',
        label: 'enrolled courses', 
        icon: Course
    }, 
]

export const dbCrudLinks = [
    {
        role: ['admin', 'teacher'], 
        url: '/dashboard/courses/create', 
        redirect: '/dashboard/courses', 
        api: '',
        label: 'create course'
    }, 
    {
        role: ['admin', 'teacher'], 
        url: '/dashboard/courses/trash', 
        redirect: '/dashboard/courses', 
        api: '',
        label: 'Course trash'
    }, 
]
