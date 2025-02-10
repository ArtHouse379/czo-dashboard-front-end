import { TypeCustomerId } from '@/types/customer.types'
import { IProcurement, IProcurementForm } from '@/types/procurement.types'
import { axiosWithAuth } from '@/api/interceptors'

class ProcurementService {
	private BASE_URL = '/procurements'

	async getAll() {
		const response = await axiosWithAuth.get<IProcurement[]>(
			`${this.BASE_URL}/all`
		)
		return response.data
	}

	async getById(id: string) {
		const response = await axiosWithAuth.get<IProcurement>(
			`${this.BASE_URL}/${id}`
		)
		return response.data
	}

	async getByUserId() {
		const response = await axiosWithAuth.get<IProcurement[]>(
			`${this.BASE_URL}/users-procurements`
		)
		return response.data
	}

	async getByCustomerId(customerId: TypeCustomerId) {
		const response = await axiosWithAuth.get<IProcurement[]>(
			`${this.BASE_URL}/customers-procurements/${customerId}`
		)
		return response.data
	}

	async createProcurement(data: IProcurementForm) {
		const response = await axiosWithAuth.post(this.BASE_URL, data)
		return response.data
	}

	async connectToJointProcurement(
		data: IProcurementForm,
		procurementId: string
	) {
		const response = await axiosWithAuth.post(
			`${this.BASE_URL}/connect-to-joint/${procurementId}`,
			data
		)
		return response.data
	}

	async updateProcurement(procurementId: string, data: IProcurementForm) {
		const response = await axiosWithAuth.put(
			`${this.BASE_URL}/${procurementId}`,
			data
		)
		return response.data
	}

	async deleteProcurement(id: string) {
		const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
		return response.data
	}
}

export const procurementService = new ProcurementService()
