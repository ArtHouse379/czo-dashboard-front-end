import { axiosWithAuth } from "@/api/interceptors";
import { TypeCustomerFormState } from "@/types/customer.types";

class CustomerService {
    private BASE_URL = '/customers'

    async getAll() {
        const response = await axiosWithAuth.get<TypeCustomerFormState[]>(this.BASE_URL)
        return response.data
    }

    async getById(customerId: string) {
        const response = await axiosWithAuth.get<TypeCustomerFormState[]>(`${this.BASE_URL}/${customerId}`)
        return response.data
    }

    async getByEmail(email: string) {
        const response = await axiosWithAuth.get<TypeCustomerFormState[]>(`${this.BASE_URL}/${email}`)
        return response.data
    }

    async create(data: TypeCustomerFormState) {
        const response = await axiosWithAuth.post(this.BASE_URL, data)
        return response.data
    }

    async update(id: string, data: TypeCustomerFormState) {
        const response = await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data)
        return response.data
    }

    async deleteTask(id: string) {
        const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
        return response.data
    }
}

export const customerService = new CustomerService()