import { useQuery } from '@tanstack/react-query'
import { procurementService } from '@/services/procurement.service'

export function useProcurement(id: string) {
	const { data, isLoading, isSuccess } = useQuery({
		queryKey: [`procurement-${id}`],
		queryFn: () => procurementService.getById(id)
	})

	return { data, isLoading, isSuccess }
}
