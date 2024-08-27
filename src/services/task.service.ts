import type { ITaskResponse, TypeTaskFormState } from "@/types/task.types";
import { axiosWithAuth } from "@/api/interceptors";

class TaskService {
    private BASE_URL = '/user/tasks'

    async getAll() {
        const response = await axiosWithAuth.get<ITaskResponse[]>(this.BASE_URL)
        return response.data
    }

    async create(data: TypeTaskFormState) {
        const response = await axiosWithAuth.post(this.BASE_URL, data)
        return response.data
    }

    async update(id: string, data: TypeTaskFormState) {
        const response = await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data)
        return response.data
    }

    async delete(id: string) {
        const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
        return response.data
    }
}

export const taskService = new TaskService()