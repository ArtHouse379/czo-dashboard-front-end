import { useQuery } from '@tanstack/react-query'
import { userService } from '@/services/user.service'

export function useUser(userId: string) {
	const { data, isLoading, isSuccess } = useQuery({
		queryKey: [`user-${userId}`],
		queryFn: () => userService.getById(userId)
	})

	return { data, isLoading, isSuccess }
}
