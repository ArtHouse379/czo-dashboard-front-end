import { Bar } from 'react-chartjs-2'
import '@/config/chart.config'
import { useProcurementsStore } from '@/store/ProcurementStore'
import { Card } from '../../cards/Card'

export const ProcurementsTotalValueChart = () => {
	const { procurements } = useProcurementsStore()

	// Process monthly value trends
	const getValueTrends = () => {
		const monthlyData = procurements.reduce(
			(acc, proc) => {
				const date = new Date(proc.createdAt)
				const monthKey = date.toLocaleString('en-US', { month: 'short' })
				acc[monthKey] = (acc[monthKey] || 0) + Number(proc.expectedValue)
				return acc
			},
			{} as Record<string, number>
		)

		const lastSixMonths = Array.from({ length: 6 }, (_, i) => {
			const date = new Date()
			date.setMonth(date.getMonth() - i)
			return date.toLocaleString('en-US', { month: 'short' })
		}).reverse()

		return {
			labels: lastSixMonths,
			datasets: [
				{
					label: 'Procurements Value',
					data: lastSixMonths.map(month => monthlyData[month] || 0),
					backgroundColor: 'rgba(54, 162, 235, 0.5)',
					borderColor: 'rgba(54, 162, 235, 1)',
					borderWidth: 1
				}
			]
		}
	}
	const valueData = getValueTrends()
	return (
		<Card className='p-6'>
			<h3 className='text-lg font-semibold mb-4'>Total value</h3>
			<div className='h-[300px]'>
				<Bar
					data={valueData}
					options={{
						responsive: true,
						maintainAspectRatio: false,
						scales: {
							y: {
								beginAtZero: true
							}
						},
						plugins: {
							legend: {
								display: false
							}
						}
					}}
				/>
			</div>
		</Card>
	)
}
