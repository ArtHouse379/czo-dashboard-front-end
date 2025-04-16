'use client'

import { Bar, Doughnut } from 'react-chartjs-2'
import { Card } from '@/components/ui/cards/Card'
import '@/config/chart.config'

export function CustomerInsights() {
	const customerTypeData = {
		labels: ['Regular', 'Premium', 'New'],
		datasets: [
			{
				data: [45, 25, 30],
				backgroundColor: [
					'rgba(153, 102, 255, 0.8)',
					'rgba(255, 159, 64, 0.8)',
					'rgba(75, 192, 192, 0.8)'
				],
				borderWidth: 1
			}
		]
	}

	const customerActivityData = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
		datasets: [
			{
				label: 'Active Customers',
				data: [120, 150, 180, 190, 210, 250],
				backgroundColor: 'rgba(153, 102, 255, 0.5)',
				borderColor: 'rgba(153, 102, 255, 1)',
				borderWidth: 1
			}
		]
	}

	return (
		<div className='my-6'>
			<h2 className='text-2xl font-bold mb-4'>Customer Insights</h2>

			{/* Statistics Cards */}
			<div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
				<Card className='p-4'>
					<h4 className='text-sm text-gray-600'>Total Customers</h4>
					<p className='text-2xl font-bold'>1,234</p>
					<span className='text-green-500 text-sm'>↑ 12% from last month</span>
				</Card>
				<Card className='p-4'>
					<h4 className='text-sm text-gray-600'>Active Customers</h4>
					<p className='text-2xl font-bold'>892</p>
					<span className='text-green-500 text-sm'>↑ 8% from last month</span>
				</Card>
				<Card className='p-4'>
					<h4 className='text-sm text-gray-600'>Average Deal Size</h4>
					<p className='text-2xl font-bold'>$45,678</p>
					<span className='text-red-500 text-sm'>↓ 3% from last month</span>
				</Card>
			</div>

			{/* Charts Grid */}
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
				<Card className='p-6'>
					<h3 className='text-lg font-semibold mb-4'>Customer Distribution</h3>
					<div className='h-[300px] flex items-center justify-center'>
						<Doughnut
							data={customerTypeData}
							options={{
								responsive: true,
								maintainAspectRatio: false
							}}
						/>
					</div>
				</Card>

				<Card className='p-6'>
					<h3 className='text-lg font-semibold mb-4'>
						Customer Activity Trends
					</h3>
					<div className='h-[300px]'>
						<Bar
							data={customerActivityData}
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
