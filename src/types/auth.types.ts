import { IBase } from "./root.types"

export interface IAuthForm {
    email: string
    password: string
}

export interface IUser extends IBase {
    name?: string
    email: string
}

export interface IAuthResponse {
    accessToken: string
    user: IUser
}

export type TypeUserForm = Omit<IUser, 'id'> & { password?: string }