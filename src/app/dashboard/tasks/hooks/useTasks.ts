import { taskService } from "@/services/task.service";
import { useQuery } from "@tanstack/react-query";

export function useTasks() {
    const {data, isLoading, isSuccess} = useQuery({
        queryKey: ['tasks'],
        queryFn: () => taskService.getAll()
    })

    return {data, isLoading, isSuccess}
}