import { useQuery } from '@tanstack/react-query'
import { userService } from '@/services/user.service'

export function useManagers() {
	const { data, isLoading, isSuccess } = useQuery({
		queryKey: [`managers-list`],
		queryFn: () => userService.getManagers()
	})

	return { data, isLoading, isSuccess }
}
