import { useQuery } from '@tanstack/react-query'
import { procurementService } from '@/services/procurement.service'

export function useProcurements() {
	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ['get-procurements'],
		queryFn: () => procurementService.getAll()
	})

	return { data, isLoading, isSuccess }
}
