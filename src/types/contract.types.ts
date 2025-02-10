import { IContractAgreement } from './contractAgreement.types'
import { IBase } from './root.types'

export interface IContract extends IBase {
	number: string
	startValue: number
	currentValue: number
	signatureDate: string
	terminationDate: string
	product: string
	unit: string
	scope: number
	procurementId: string
	agreements: IContractAgreement[]
}

export type TypeContractFormState = Partial<IContract>
