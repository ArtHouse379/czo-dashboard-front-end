'use client'

import { useUsersStore } from '@/store/UserStore'

export function UsersTable() {
	const { users, updateUser } = useUsersStore()

	return (
		<>
			{users ? (
				<div className='overflow-x-auto'>
					<table className='w-full'>
						<thead className='bg-gray-100/5'>
							<tr>
								<th className='p-2 text-left'>Email</th>
								<th className='p-2 text-left'>Name</th>
								<th className='p-2 text-left'>Surname</th>
								<th className='p-2 text-left'>Roles</th>
							</tr>
						</thead>
						<tbody>
							{users.map(user => (
								<tr
									key={user.id}
									className='border-b hover:bg-blue-400/15'
								>
									<td className='p-4'>{user.email}</td>
									<td className='p-4'>{user.name || '-'}</td>
									<td className='p-4'>{user.surname || '-'}</td>
									<td className='p-4'>
										<div className='flex gap-2'>
											<span
												onClick={() => {
													updateUser(user.id, {
														...user,
														isAdmin: !user.isAdmin
													})
												}}
												className={`${user.isAdmin ? 'bg-blue-300 hover:bg-blue-300/15' : 'bg-blue-300/15 hover:bg-blue-300'} text-blue-800 text-xs px-2 py-1 rounded cursor-pointer`}
											>
												Admin
											</span>

											<span
												onClick={() => {
													updateUser(user.id, {
														...user,
														isManager: !user.isManager
													})
												}}
												className={`${user.isManager ? 'bg-green-300 hover:bg-green-300/15' : 'bg-green-300/15 hover:bg-green-300'} text-green-800 text-xs px-2 py-1 rounded cursor-pointer`}
											>
												Manager
											</span>
											<span
												className={`${user.isGuest ? 'bg-gray-300' : 'bg-gray-300/15'} text-gray-800 text-xs px-2 py-1 rounded select-none`}
											>
												Guest
											</span>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			) : (
				<p className='text-2xl text-center font-semibold text-red-600'>
					No info!
				</p>
			)}
		</>
	)
}
