import { axiosWithAuth } from "@/api/interceptors";
import { IContract, TypeContractFormState } from "@/types/contract.types";

class ContractService {
    private BASE_URL = '/contracts'

    async getAll() {
        const response = await axiosWithAuth.get<IContract[]>(this.BASE_URL)
        return response.data
    }

    async getById(procurementId: string) {
        const response = await axiosWithAuth.get<IContract[]>(`${this.BASE_URL}/${procurementId}`)
        return response.data
    }

    async create(data: TypeContractFormState, procurementId: string) {
        const response = await axiosWithAuth.post(`${this.BASE_URL}/${procurementId}`, data)
        return response.data
    }

    async update(data: TypeContractFormState, contractId: string) {
        const response = await axiosWithAuth.put(`${this.BASE_URL}/${contractId}`, data)
        return response.data
    }

    async deleteTask(contractId: string) {
        const response = await axiosWithAuth.delete(`${this.BASE_URL}/${contractId}`)
        return response.data
    }
}

export const contractService = new ContractService()