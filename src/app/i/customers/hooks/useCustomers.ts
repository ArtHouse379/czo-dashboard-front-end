
import { customerService } from "@/services/customer.service";
import { useQuery } from "@tanstack/react-query";

export function useCustomers() {
    const {data, isLoading, isSuccess} = useQuery({
        queryKey: ['customers'],
        queryFn: () => customerService.getAll()
    })

    return {data, isLoading, isSuccess}
}