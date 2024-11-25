'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Logo from '../Home/Logo/Logo'
import Visibility from '../Icons/Visibility'
import VisibilityOff from '../Icons/VisibilityOff'
import { useRouter } from 'next/navigation'
import { useToastContext } from '../Toast/ToastContext'

const Register = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [role, setRole] = useState('student');
    const router = useRouter();
    const { addToast } = useToastContext();

    const usernameMaxLen = 30;
    const usernameMinLen = 3;

    // toggle password visibility 
    function toggleShowPass() {
        setShowPass(prev => !prev);
    }

    // send request to create user
    function handleCreateUser() {
        setUsername(prev => prev.trim());
        if (username.length < usernameMinLen) {
            console.log("You're too short");
            return;
        }
        if (username.length > usernameMaxLen) {
            console.log("Your username is too long");
            return;
        }
        if (!email.length) {
            console.log("Fill the email field");
            return;
        }
        if (!password.length) {
            console.log("No password? Nice try bro");
            return;
        }
        const newUser = {
            username: username,
            email: email,
            password: password,
            role: role,
            avatar: '',
            about: '',
            enrolled_courses: [],
            created_courses: []
        }

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/auth/register`, {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: { "Content-Type": "application/json" },
            credentials: 'include'
        })
            .then(res => {
                if (!res.ok) {
                    if (res.status === 409) {
                        return res.json().then(errorData => {
                            throw new Error(errorData.message || `This username or email was used`);
                        })
                    }
                    throw new Error('An error occured');
                }
                return res.json();
            })
            .then(() => {
                addToast('success', 'Registered successfully, please login with your new account', 10000); 
                router.push('/account/login')
            })
            .catch(err => console.log(err))


    }

    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="mb-6">
                        <Logo />
                    </div>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign up
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                                    <input
                                        value={username}
                                        name="username"
                                        id="username"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="username"
                                        required
                                        onChange={e => setUsername(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input
                                        value={email}
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                        required
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="relative">
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input
                                        value={password}
                                        type={showPass ? 'text' : 'password'}
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                    <button type="button" className="absolute top-10 end-3" onClick={toggleShowPass}>
                                        {showPass ? <VisibilityOff /> : <Visibility />}
                                    </button>
                                </div>
                                <div>
                                    <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Who are you?</label>
                                    <select
                                        id="role"
                                        className="bg-gray-50 border outline outline-1 outline-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:outline-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:outline-blue-500 border-r-8 border-transparent"
                                        defaultValue={role}
                                        onChange={e => setRole(e.target.value)}
                                    >
                                        <option value="student">Student</option>
                                        <option value="teacher">Teacher</option>
                                    </select>
                                </div>
                                <button
                                    type="button"
                                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    onClick={handleCreateUser}
                                >
                                    Create your account
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <Link href="/account/login" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign in</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Register