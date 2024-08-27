
import { procurementService } from "@/services/procurement.service";
import { useQuery } from "@tanstack/react-query";

export function useProcurements() {
    const {data, isLoading, isSuccess} = useQuery({
        queryKey: ['procurements'],
        queryFn: () => procurementService.getAll()
    })

    return {data, isLoading, isSuccess}
}