import { useQuery } from '@tanstack/react-query'
import { customerService } from '@/services/customer.service'

export function useCustomer(customerId: string) {
	const { data, isLoading, isSuccess } = useQuery({
		queryKey: [`searchCustomer${customerId}`],
		queryFn: () => customerService.getById(customerId)
	})

	return { data, isLoading, isSuccess }
}
