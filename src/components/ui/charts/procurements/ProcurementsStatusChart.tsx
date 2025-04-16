import { Doughnut } from 'react-chartjs-2'
import '@/config/chart.config'
import { useProcurementsStore } from '@/store/ProcurementStore'
import { Card } from '../../cards/Card'

export const ProcurementsStatusChart = () => {
	const { procurements } = useProcurementsStore()

	//* Process status distribution
	const getStatusDistribution = () => {
		const statusCounts = procurements.reduce(
			(acc, proc) => {
				acc[proc.status] = (acc[proc.status] || 0) + 1

				return acc
			},
			{} as Record<string, number>
		)

		return {
			labels: ['active', 'finished', 'in work'],
			datasets: [
				{
					data: [
						statusCounts['active'] || 0,
						statusCounts['finished'] || 0,
						statusCounts['in work'] || 0
					],
					backgroundColor: [
						'rgba(54, 162, 235, 0.8)',
						'rgba(75, 192, 192, 0.8)',
						'rgba(255, 206, 86, 0.8)'
					],
					borderWidth: 1
				}
			]
		}
	}

	const statusData = getStatusDistribution()

	return (
		<Card className='p-6'>
			<h3 className='text-lg font-semibold mb-4'>Status Distribution</h3>
			<div className='h-[300px] flex items-center justify-center'>
				<Doughnut
					data={statusData}
					options={{
						responsive: true,
						maintainAspectRatio: false
					}}
				/>
			</div>
		</Card>
	)
}
