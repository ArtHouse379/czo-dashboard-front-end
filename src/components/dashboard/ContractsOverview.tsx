'use client'

import { Line, Pie } from 'react-chartjs-2'
import { Card } from '@/components/ui/cards/Card'
import '@/config/chart.config'

export function ContractsOverview() {
	const contractStatusData = {
		labels: ['Active', 'Completed', 'Pending Review'],
		datasets: [
			{
				data: [15, 25, 10],
				backgroundColor: [
					'rgba(255, 99, 132, 0.8)',
					'rgba(54, 162, 235, 0.8)',
					'rgba(255, 206, 86, 0.8)'
				],
				borderWidth: 1
			}
		]
	}

	const contractValueTrendData = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
		datasets: [
			{
				label: 'Contract Values',
				data: [30000, 45000, 35000, 50000, 60000, 75000],
				borderColor: 'rgb(75, 192, 192)',
				tension: 0.3,
				fill: false
			}
		]
	}

	return (
		<div className='my-6'>
			<h2 className='text-2xl font-bold mb-4'>Contracts Overview</h2>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
				<Card className='p-6'>
					<h3 className='text-lg font-semibold mb-4'>
						Contract Status Distribution
					</h3>
					<div className='h-[300px] flex items-center justify-center'>
						<Pie
							data={contractStatusData}
							options={{
								responsive: true,
								maintainAspectRatio: false
							}}
						/>
					</div>
				</Card>

				<Card className='p-6'>
					<h3 className='text-lg font-semibold mb-4'>Contract Value Trends</h3>
					<div className='h-[300px]'>
						<Line
							data={contractValueTrendData}
							options={{
								responsive: true,
								maintainAspectRatio: false,
								scales: {
									y: {
										beginAtZero: true
									}
								}
							}}
						/>
					</div>
				</Card>
			</div>
		</div>
	)
}
