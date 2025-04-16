import { create } from 'zustand'
import { IUser } from '@/types/auth.types'

interface UserStore {
	users: IUser[]
	usersDefaultArray: IUser[]
	loading: boolean
	error: null
	setUsers: (users: IUser[]) => void
	saveDefaultUsersArray: (users: IUser[]) => void
	searchFilter: (searchValue: string) => void
	updateUser: (userId: string, data: {}) => void
}

export const useUsersStore = create<UserStore>()(set => ({
	users: [],
	usersDefaultArray: [],
	loading: false,
	error: null,
	setUsers: users => {
		set(() => ({
			users: users
		}))
	},
	saveDefaultUsersArray: users => {
		set(() => ({
			usersDefaultArray: users
		}))
	},
	searchFilter: searchValue => {
		const filteredUsers = searchValue
			? useUsersStore
					.getState()
					.usersDefaultArray.filter(user =>
						user.name.toLowerCase().includes(searchValue.toLowerCase())
					)
			: useUsersStore.getState().usersDefaultArray
		useUsersStore.getState().setUsers(filteredUsers)
	},
	updateUser: (userId, data) => {
		const users = useUsersStore.getState().users
		useUsersStore
			.getState()
			.setUsers(
				users.map(user => (userId === user.id ? { ...user, ...data } : user))
			)
	}
}))
