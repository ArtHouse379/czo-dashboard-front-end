import { useQuery } from '@tanstack/react-query'
import { contractService } from '@/services/contract.service'

export function useContract(id: string) {
	const { data, isLoading, isSuccess } = useQuery({
		queryKey: [`contract-${id}`],
		queryFn: () => contractService.getById(id)
	})

	return { data, isLoading, isSuccess }
}
