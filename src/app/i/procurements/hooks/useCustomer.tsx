import { customerService } from "@/services/customer.service";
import { useQuery } from "@tanstack/react-query";

export function useCustomer(customerId: string) {
    const {data, isLoading, isSuccess} = useQuery({
        queryKey: ['customerById'],
        queryFn: () => customerService.getById(customerId)
    })

    return {data, isLoading, isSuccess}
}