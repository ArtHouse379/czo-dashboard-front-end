
import { contractService } from "@/services/contract.service";
import { useQuery } from "@tanstack/react-query";

export function useContracts() {
    const {data, isLoading, isSuccess} = useQuery({
        queryKey: ['contracts'],
        queryFn: () => contractService.getAll()
    })

    return {data, isLoading, isSuccess}
}