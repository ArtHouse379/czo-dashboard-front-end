import { IProcurement } from './procurement.types'
import { IBase } from './root.types'

export interface ICustomer extends IBase {
	name: string
	code: string
	email: string
	phone: string
	address: string
	procurements: IProcurement[]
}

export type TypeCustomerFormState = Partial<Omit<ICustomer, 'updatedAt'>>

export type TypeCustomerId = Omit<
	ICustomer,
	| 'updatedAt'
	| 'createdAt'
	| 'name'
	| 'code'
	| 'email'
	| 'phone'
	| 'procurements'
	| 'address'
>
