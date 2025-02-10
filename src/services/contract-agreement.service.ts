import { IContractAgreement } from '@/types/contractAgreement.types'
import { axiosWithAuth } from '@/api/interceptors'

class ContractAgreementService {
	private BASE_URL = '/contract/agreements'

	async getAll(contractId: string) {
		const response = await axiosWithAuth.get<IContractAgreement[]>(
			`${this.BASE_URL}/${contractId}`
		)
		return response.data
	}

	async create(data: IContractAgreement, contractId: string) {
		const response = await axiosWithAuth.post(
			`${this.BASE_URL}/${contractId}`,
			data
		)
		return response.data
	}

	async update(data: IContractAgreement, contractAgreementId: string) {
		const response = await axiosWithAuth.put(
			`${this.BASE_URL}/${contractAgreementId}`,
			data
		)
		return response.data
	}

	async deleteTask(contractAgreementId: string) {
		const response = await axiosWithAuth.delete(
			`${this.BASE_URL}/${contractAgreementId}`
		)
		return response.data
	}
}

export const contractAgreementService = new ContractAgreementService()
