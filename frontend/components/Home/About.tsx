import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ArrowForward from '../Icons/ArrowForward'

const About = () => {
    return (
        <div>
            <section className="py-24 relative">
                <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
                    <div className="w-full justify-start items-center gap-12 grid lg:grid-cols-2 grid-cols-1">
                        <div
                            className="w-full justify-center items-start gap-6 grid sm:grid-cols-2 grid-cols-1 lg:order-first order-last">
                            <div className="pt-24 lg:justify-center sm:justify-end justify-start items-start gap-2.5 flex">
                                <Image width={280} height={280} className="rounded-xl object-cover" src="/images/about_01.jpg" alt="about Us image" />
                            </div>
                            <Image width={280} height={280} className="sm:ml-0 ml-auto rounded-xl object-cover" src="/images/about_02.jpg" alt="about Us image" />
                        </div>
                        <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
                            <div className="w-full flex-col justify-center items-start gap-8 flex">
                                <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                                    <h2 className="text-gray-900 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                                        Empowering Lifelong Learning
                                    </h2>
                                    <p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
                                        At Studiverse, we believe that learning should be a lifelong pursuit,
                                        not confined by traditional education systems. Our mission is to provide a flexible,
                                        accessible platform where learners can explore new topics, build new skills,
                                        and expand their knowledge without limitations. Whether you&apos;re a student, professional,
                                        or curious mind, Studiverse is here to support your learning journey.
                                    </p>
                                </div>
                                <div className="w-full lg:justify-start justify-center items-center sm:gap-10 gap-5 inline-flex">
                                    <div className="flex-col justify-start items-start inline-flex">
                                        <h3 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">3+</h3>
                                        <h6 className="text-gray-500 text-base font-normal leading-relaxed">Years of Experience</h6>
                                    </div>
                                    <div className="flex-col justify-start items-start inline-flex">
                                        <h4 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">25+</h4>
                                        <h6 className="text-gray-500 text-base font-normal leading-relaxed">Successful Projects</h6>
                                    </div>
                                    <div className="flex-col justify-start items-start inline-flex">
                                        <h4 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">50+</h4>
                                        <h6 className="text-gray-500 text-base font-normal leading-relaxed">Happy Clients</h6>
                                    </div>
                                </div>
                            </div>
                            <Link href="/about">
                                <button
                                    className="sm:w-fit w-full px-3.5 py-2 bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 ease-in-out rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex">
                                    <span className="px-1.5 text-white text-sm font-medium leading-6">Read More</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 relative xl:mr-0 lg:mr-5 mr-0">
                <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
                    <div className="w-full justify-start items-center xl:gap-12 gap-10 grid lg:grid-cols-2 grid-cols-1">
                        <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
                            <div className="w-full flex-col justify-center items-start gap-8 flex">
                                <div className="flex-col justify-start lg:items-start items-center gap-4 flex">
                                    {/* <h6 className="text-gray-400 text-base font-normal leading-relaxed">About Us</h6> */}
                                    <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                                        <h2 className="text-indigo-700 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                                            Expert-Led Courses: Learn from the Best
                                        </h2>
                                        <p
                                            className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
                                            Our achievement story is a testament to teamwork and perseverance. Together, we&apos;ve
                                            overcome challenges, celebrated victories, and created a narrative of progress and
                                            success.</p>
                                    </div>
                                </div>
                                <div className="w-full flex-col justify-center items-start gap-6 flex">
                                    <div className="w-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                                        <div
                                            className="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-300 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                                            <h4 className="text-gray-900 text-2xl font-bold font-manrope leading-9">90% Learner Engagement</h4>
                                            <p className="text-gray-500 text-base font-normal leading-relaxed">
                                                Increased engagement when learning from experts
                                            </p>
                                        </div>
                                        <div
                                            className="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-300 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                                            <h4 className="text-gray-900 text-2xl font-bold font-manrope leading-9">83% Career Advancement
                                            </h4>
                                            <p className="text-gray-500 text-base font-normal leading-relaxed">
                                                Learners who took expert-led courses report career growth
                                            </p>
                                        </div>
                                    </div>
                                    <div className="w-full h-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                                        <div
                                            className="w-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-300 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                                            <h4 className="text-gray-900 text-2xl font-bold font-manrope leading-9">76% Employer Preference</h4>
                                            <p className="text-gray-500 text-base font-normal leading-relaxed">
                                                Employers prefer candidates who complete expert-led online courses
                                            </p>
                                        </div>
                                        <div
                                            className="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-300 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                                            <h4 className="text-gray-900 text-2xl font-bold font-manrope leading-9">
                                                70% Faster Completion
                                            </h4>
                                            <p className="text-gray-500 text-base font-normal leading-relaxed">
                                                Learners complete courses 70% faster with expert guidance
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Link href="/courses">
                                <button className="sm:w-fit w-full group px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] transition-all duration-700 ease-in-out justify-center items-center flex">
                                    <span className="px-1.5 text-indigo-600 text-sm font-medium leading-6 group-hover:-translate-x-0.5 transition-all duration-700 ease-in-out">
                                        Explore courses  
                                    </span>
                                    <ArrowForward />
                                </button>
                            </Link>
                        </div>
                        <div className="w-full lg:justify-start justify-center items-start flex">
                            <div
                                className="sm:w-[564px] w-full sm:h-[646px] h-full sm:bg-gray-100 rounded-3xl sm:border border-gray-200 relative">
                                <img className="sm:mt-5 sm:ml-5 w-full h-full rounded-3xl object-cover"
                                    src="/images/about_03.png" alt="about Us image" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    )
}

export default About