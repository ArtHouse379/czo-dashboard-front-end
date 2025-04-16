import { useQuery } from '@tanstack/react-query'
import { userService } from '@/services/user.service'

export function useAdmins() {
	const { data, isLoading, isSuccess } = useQuery({
		queryKey: [`admins-list`],
		queryFn: () => userService.getAdmins()
	})

	return { data, isLoading, isSuccess }
}
