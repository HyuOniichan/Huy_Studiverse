'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Logo from '../Home/Logo/Logo'
import Visibility from '../Icons/Visibility'
import VisibilityOff from '../Icons/VisibilityOff'
import { useAccountContext } from './AccountContext'
import { useToastContext } from '../Toast/ToastContext'
import { useRouter } from 'next/navigation'

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const router = useRouter(); 
    const { updateUser } = useAccountContext();
    const { addToast } = useToastContext();

    // toggle password visibility 
    function toggleShowPass() {
        setShowPass(prev => !prev);
    }

    function handleLogin() {
        setEmail(prev => prev.trim());
        if (!email) {
            console.log('Where your email?');
            return;
        }
        if (!password) {
            console.log('Where your password?');
            return;
        }

        const authenUser = {
            email,
            password,
        }

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/auth/login`, {
            method: 'POST',
            body: JSON.stringify(authenUser),
            headers: { "Content-Type": "application/json" },
            credentials: 'include'
        })
            .then(res => {
                if (!res.ok) {
                    if (res.status === 400) {
                        return res.json().then(errorData => {
                            throw new Error(errorData.message || `Re-check your information?`);
                        })
                    }
                    throw new Error('An error occured');
                }
                return res.json();
            })
            .then(data => {
                if (data._id) {
                    updateUser(data); 
                    addToast('success', 'Welcome bro!');
                    router.push('/'); 
                }
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
                                Sign in
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#">
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
                                {/* <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                        </div>
                                    </div>
                                    <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Forgot password?</a>
                                </div> */}
                                <button
                                    type="button"
                                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    onClick={handleLogin}
                                >Log in</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don't have an account? <Link href="/account/register" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign up</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login