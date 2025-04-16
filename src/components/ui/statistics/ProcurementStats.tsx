'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/cards/Card'
import { useProcurementsStore } from '@/store/ProcurementStore'

export function ProcurementStats() {
	const { procurements } = useProcurementsStore()
	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
	const [formattedAmount, setFormattedAmount] = useState('0 ₴')

	const getFilteredProcurements = (year: number) => {
		return procurements.filter(
			proc => new Date(proc.createdAt).getFullYear() === year
		)
	}

	const currentMonth = new Date().getMonth()
	const currentYear = new Date().getFullYear()

	const stats = {
		total: getFilteredProcurements(selectedYear).length,
		finished: getFilteredProcurements(selectedYear).filter(
			proc => proc.status === 'finished'
		).length,
		totalAmount: getFilteredProcurements(selectedYear).reduce(
			(sum, proc) => sum + Number(proc.expectedValue),
			0
		),
		currentMonth: procurements.filter(proc => {
			const date = new Date(proc.createdAt)
			return (
				date.getMonth() === currentMonth && date.getFullYear() === currentYear
			)
		}).length,
		previousMonth: procurements.filter(proc => {
			const date = new Date(proc.createdAt)
			return (
				date.getMonth() === currentMonth - 1 &&
				date.getFullYear() === currentYear
			)
		}).length
	}

	useEffect(() => {
		setFormattedAmount(
			new Intl.NumberFormat('uk-UA', {
				style: 'currency',
				currency: 'UAH',
				currencyDisplay: 'symbol'
			}).format(stats.totalAmount)
		)
	}, [stats.totalAmount])

	const monthlyChange =
		((stats.currentMonth - stats.previousMonth) / stats.previousMonth) * 100

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
			<Card className='p-4'>
				<div className='flex justify-between items-start mb-2'>
					<h4 className='text-sm text-gray-600'>Total Procurements</h4>
					<select
						value={selectedYear}
						onChange={e => setSelectedYear(Number(e.target.value))}
						className='bg-transparent border-b-2 hover:cursor-pointer mx-2 text-center'
					>
						{[2025, 2024, 2023, 2022, 2021].map(year => (
							<option
								key={year}
								value={year}
							>
								{year}
							</option>
						))}
					</select>
				</div>
				<p className='text-2xl font-bold'>{stats.total}</p>
			</Card>

			<Card className='p-4'>
				<div className='flex justify-between items-start mb-2'>
					<h4 className='text-sm text-gray-600'>Finished Procurements</h4>
					<span className='text-sm'>{selectedYear}</span>
				</div>
				<p className='text-2xl font-bold'>{stats.finished}</p>
			</Card>

			<Card className='p-4'>
				<div className='flex justify-between items-start mb-2'>
					<h4 className='text-sm text-gray-600'>Total Expected Value</h4>
					<span className='text-sm'>{selectedYear}</span>
				</div>
				<div className='text-2xl font-bold'>{formattedAmount}</div>
			</Card>

			<Card className='p-4'>
				<h4 className='text-sm text-gray-600 mb-2'>Current Month</h4>
				<p className='text-2xl font-bold'>{stats.currentMonth}</p>
				<span
					className={`text-sm ${monthlyChange >= 0 ? 'text-green-500' : 'text-red-500'}`}
				>
					{monthlyChange >= 0 ? '↑' : '↓'} {Math.abs(monthlyChange).toFixed(1)}%
					from last month
				</span>
			</Card>
		</div>
	)
}
