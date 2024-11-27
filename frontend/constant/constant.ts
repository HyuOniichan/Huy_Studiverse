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
    {
        id: 4,
        url: '/blogs',
        label: 'blogs'
    },
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
        label: 'Dashboard', 
        icon: Dashboard
    }, 
    {
        role: ['admin'], 
        url: '/dashboard/users', 
        label: 'Users', 
        icon: Users
    }, 
    {
        role: ['admin'], 
        url: '/dashboard/courses', 
        label: 'All Courses', 
        icon: Course
    }, 
    {
        role: ['teacher'], 
        url: '/dashboard/courses/managed', 
        label: 'Managed Courses', 
        icon: Course
    }, 
    {
        role: ['teacher', 'student'], 
        url: '/dashboard/courses/enrolled', 
        label: 'Enrolled Courses', 
        icon: Course
    }, 
]
