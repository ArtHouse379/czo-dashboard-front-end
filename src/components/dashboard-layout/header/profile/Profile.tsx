'use client'

import { useState } from 'react'
import Loader from '@/components/ui/Loader'
import { ProfileMenu } from '@/components/ui/menu/ProfileMenu'
import { useProfile } from '@/hooks/useProfile'

export function Profile() {
	const [isProfileMenu, toggleProfileMenu] = useState<boolean>(false)
	const { data, isLoading } = useProfile()

	return (
		<div className='absolute top-big-layout right-big-layout'>
			{isLoading ? (
				<Loader />
			) : (
				<div className='flex items-center gap-2'>
					<div
						onClick={() => toggleProfileMenu(!isProfileMenu)}
						className='w-14 h-14 flex justify-center items-center text-xl text-white bg-blue-600 rounded uppercase cursor-pointer relative'
					>
						{data?.user.name?.charAt(0) || 'A'}
						{data?.user.surname?.charAt(0) || ''}
						{data && isProfileMenu ? <ProfileMenu profile={data} /> : null}
					</div>
					<div>
						<p className='font-bold -mb-1'>
							{data?.user.name} {data?.user.surname}
						</p>
						<p className='text-sm italic opacity-40'>{data?.user.email}</p>
					</div>
				</div>
			)}
		</div>
	)
}
