'use client'

import Loader from '@/components/ui/Loader'
import { AnimatedCard } from '@/components/ui/cards/AnimatedCard'
import { useProfile } from '@/hooks/useProfile'

export function UserStatistics() {
	const { data, isLoading } = useProfile()

	return isLoading ? (
		<Loader />
	) : (
		<div className='grid grid-cols-4 gap-12 mt-7'>
			{data?.statistics.length ? (
				data.statistics.map(statistic => (
					<AnimatedCard
						className='text-center'
						key={statistic.label}
					>
						<div className='text-xl'>{statistic.label}</div>
						<div className='text-3xl font-semibold'>{statistic.value}</div>
					</AnimatedCard>
				))
			) : (
				<div>Statistics not loaded!</div>
			)}
		</div>
	)
}
