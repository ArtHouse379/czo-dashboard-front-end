import { IProcurement } from './procurement.types'
import { IBase } from './root.types'
import { ITaskResponse } from './task.types'

export interface IAuthForm {
	email: string
	password: string
}

export interface IUser extends IBase {
	name: string
	surname: string
	isAdmin: boolean
	isManager: boolean
	isGuest: boolean
	procurements: IProcurement[]
	tasks: ITaskResponse[]
	email: string
}

export interface IAuthResponse {
	accessToken: string
	user: IUser
}

export type TypeUserForm = Omit<IUser, 'id'> & { password?: string }
