import { IUser, TypeUserForm } from '@/types/auth.types'
import { axiosWithAuth } from '@/api/interceptors'

export interface IProfileResponse {
	user: IUser
	statistics: {
		label: string
		value: string
	}[]
}

class UserService {
	private BASE_URL = 'users'

	async getAll() {
		const response = await axiosWithAuth.get<IUser[]>(`${this.BASE_URL}/all`)
		return response.data
	}

	async getProfile() {
		const response = await axiosWithAuth.get<IProfileResponse>(
			`${this.BASE_URL}/profile`
		)
		return response.data
	}

	async getById(userId: string) {
		const response = await axiosWithAuth.get<IUser>(
			`${this.BASE_URL}/${userId}`
		)
		return response.data
	}

	async getManagers() {
		const response = await axiosWithAuth.get<IUser[]>(
			`${this.BASE_URL}/managers`
		)
		return response.data
	}

	async getAdmins() {
		const response = await axiosWithAuth.get<IUser[]>(`${this.BASE_URL}/admins`)

		return response.data
	}

	async update(data: TypeUserForm) {
		const response = await axiosWithAuth.put(this.BASE_URL, data)
		return response.data
	}
}

export const userService = new UserService()
