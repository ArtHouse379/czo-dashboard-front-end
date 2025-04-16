'use client'

import { useMutation } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { authService } from '@/services/auth.service'

export function LogoutButton() {
	const router = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => router.push('/auth')
	})

	return (
		<div className='absolute top-2 right-1'>
			<button
				className='opacity-20 hover:opacity-100 hover:text-blue-500 transition-opacity duration-300'
				onClick={() => mutate()}
			>
				<LogOut size={25} />
			</button>
		</div>
	)
}
