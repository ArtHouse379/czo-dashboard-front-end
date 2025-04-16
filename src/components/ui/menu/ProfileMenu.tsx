'use client'

import Link from 'next/link'
import { IProfileResponse } from '@/services/user.service'

interface ProfileProps {
	profile: IProfileResponse
}

export function ProfileMenu({ profile }: ProfileProps) {
	return (
		<div className='absolute top-16 right-14 flex flex-col bg-blue-500/25 rounded-2xl rounded-tr-none w-48 text-sm'>
			<Link
				className='text-center hover:bg-blue-500/50 p-2 rounded-2xl rounded-tr-none font-semibold normal-case'
				href={'/dashboard/profile'}
			>
				View profile
			</Link>
			{profile?.user.isAdmin ? (
				<Link
					className='text-center hover:bg-blue-500/50 p-2 rounded-2xl rounded-t-none font-semibold normal-case'
					href={'/dashboard/manipulations'}
				>
					Admin page
				</Link>
			) : null}
		</div>
	)
}
