import { axiosWithAuth } from "@/api/interceptors";
import { ICustomer, TypeCustomerId } from "@/types/customer.types";
import { IProcurement, TypeProcurementFormState } from "@/types/procurement.types";

class ProcurementService {
    private BASE_URL = '/procurements'

    async getAll() {
        const response = await axiosWithAuth.get<IProcurement[]>(`${this.BASE_URL}/all`)
        return response.data
    }

    async getByUserId() {
        const response = await axiosWithAuth.get<IProcurement[]>(`${this.BASE_URL}/users-procurements`)
        return response.data
    }

    async getByCustomerId(customerId: TypeCustomerId) {
        const response = await axiosWithAuth.get<IProcurement[]>(`${this.BASE_URL}/customers-procurements/${customerId}`)
        return response.data
    }

    async createProcurement(data: TypeProcurementFormState) {
        const response = await axiosWithAuth.post(this.BASE_URL, data)
        return response.data
    }

    async connectToJointProcurement(data: TypeProcurementFormState, procurementId: string) {
        const response = await axiosWithAuth.post(`${this.BASE_URL}/connect-to-joint/${procurementId}`, data)
        return response.data
    }

    async updateProcurement(procurementId: string, data: TypeProcurementFormState) {
        const response = await axiosWithAuth.put(`${this.BASE_URL}/${procurementId}`, data)
        return response.data
    }

    async deleteProcurement(id: string) {
        const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
        return response.data
    }
}

export const procurementService = new ProcurementService()