'use client'

import { navLinks } from '@/utils/constant'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import React, { useState } from 'react'
import Logo from '../Home/Logo/Logo'

import { useAccountContext } from '../Account/AccountContext'
import { useToastContext } from '../Toast/ToastContext'

const Nav = () => {

    const router = useRouter(); 
    const currentPath = 'home';
    const { currentUser, updateUser } = useAccountContext();
    const { addToast } = useToastContext();
    const [menu, setMenu] = useState(false);

    const toggleMenu = () => setMenu(prev => !prev);

    const handleSignout = () => {
        updateUser(null);

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/auth/logout`, {
            method: 'POST',
            body: JSON.stringify({}),
            headers: { "Content-Type": "application/json" },
            credentials: 'include'
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('An error occured');
                }
                return res.json();
            })
            .then(() => {
                setMenu(false); 
                addToast('success', 'See ya ~~');
                router.push('/');
            })
            .catch(() => addToast('error', 'An error occured'))
    }

    return (
        <div className='fixed w-full transition-all duration-200 h-[9vh] z-[1000]'>

            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w flex flex-wrap items-center justify-between mx-4 p-4">
                    <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Logo />
                    </Link>
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-x-4">
                        {(currentUser === null) ? (
                            <>
                                <Link href="/account/login">
                                    <button type="button" className="text-blue-700 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Sign in
                                    </button>
                                </Link>
                                <Link href="/account/register">
                                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Sign up
                                    </button>
                                </Link>
                            </>
                        ) : (
                            <div className='relative'>
                                <button
                                    type="button"
                                    className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                    onClick={toggleMenu}
                                >
                                    <span className="sr-only">Open user menu</span>
                                    <img className="w-10 h-10 rounded-full" src={currentUser.avatar} alt="user avatar" />
                                </button>
                                <div className={`${!menu && 'hidden'} min-w-40 z-50 absolute top-8 end-0 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}>
                                    <div className="px-4 py-3">
                                        <span className="block text-sm text-gray-900 dark:text-white">{currentUser.username}</span>
                                        <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{currentUser.email}</span>
                                    </div>
                                    <ul className="py-2" aria-labelledby="user-menu-button">
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Courses</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                                        </li>
                                        <li>
                                            <button
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-400 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                onClick={handleSignout}
                                            >Sign out</button>
                                        </li>
                                    </ul>
                                </div>
                                <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                                    <span className="sr-only">Open main menu</span>
                                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                                    </svg>
                                </button>

                            </div>
                        )}
                        <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            {navLinks.map(link => <Link key={link.id} href={link.url} className={(currentPath === link.label) ? 'nav__link--active' : 'nav__link'}>
                                {link.label}
                            </Link>)}
                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Nav