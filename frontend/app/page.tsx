'use client'

import Hero from '@/components/Home/Hero'
import About from '@/components/Home/About'
import React, { useEffect } from 'react'

const HomePage = () => {

	useEffect(() => {
		fetch(`${process.env.NEXT_PUBLIC_BACKEND_LINK}`, {
			method: 'GET',
			credentials: 'include'
		})
			.then(res => {
				if (!res.ok) {
					res.json()
						.then(errorData => {
							throw new Error(errorData || 'An error occured');
						})
						.catch(err => {
							console.log(err)
						})
				}
				return res.json();
			})
			.then(data => {
				console.log(data)
			})
			.catch(err => console.log(err));
	}, [])

	return (
		<div>
			<Hero />
			<About />
		</div>
	)
}

export default HomePage