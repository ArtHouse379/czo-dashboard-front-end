import { IContract } from './contract.types'
import { IBase } from './root.types'

export interface IProcurement extends IBase {
	expectedValue: number
	resultValue: number
	announcedAt: string
	finishedAt: string
	prozorroId: string
	prozorroLink: string
	product: string
	unit: string
	scope: number
	status: string
	customerId: string
	userId: string
	jointProcurementid: string
	contracts: IContract[]
}

export type IProcurementForm = Partial<
	Omit<
		IProcurement,
		| 'id'
		| 'updatedAt'
		| 'createdAt'
		| 'announcedAt'
		| 'finishedAt'
		| 'prozorroId'
		| 'prozorroLink'
		| 'resultValue'
	>
>

export type IProcurementEditForm = Partial<IProcurement>
