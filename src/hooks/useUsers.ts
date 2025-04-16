import { useQuery } from '@tanstack/react-query'
import { userService } from '@/services/user.service'

export function useUsers() {
	const { data, isLoading, isSuccess } = useQuery({
		queryKey: [`users-all`],
		queryFn: () => userService.getAll()
	})
	return { data, isLoading, isSuccess }
}
