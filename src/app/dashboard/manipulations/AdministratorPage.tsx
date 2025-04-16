'use client'

import { useProfile } from '@/hooks/useProfile'
import { UsersTable } from './UsersTable'

export function AdministratorPage() {
	const userProfile = useProfile()

	return userProfile.data?.user.isAdmin ? (
		<div>
			<UsersTable />
		</div>
	) : (
		<div className='text-center text-red-500 font-semibold text-2xl'>
			You haven`t access to this page!
		</div>
	)
}
