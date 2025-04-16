'use client'

import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Card } from '@/components/ui/cards/Card'
import { IUser } from '@/types/auth.types'
// Assuming this hook exists
import { useManagers } from '@/hooks/useManagers'
import { RandomColorGenerator } from '@/utils/RandomColorGenerator'

export function ProcurementManagersChart() {
	const managers: IUser[] | undefined = useManagers().data
	const [managerData, setManagerData] = useState({})

	useEffect(() => {
		const fetchData = async () => {
			//* Assuming managers is an array of manager objects with procurements
			if (managers) {
				const data = managers.reduce(
					(acc, manager) => {
						manager.procurements.forEach(proc => {
							const date = new Date(proc.createdAt)
							const month = date.getMonth()
							if (!acc[manager.surname]) {
								acc[manager.surname] = Array(12).fill(0)
							}
							acc[manager.surname][month]++
						})
						return acc
					},
					{} as Record<string, number[]>
				)
				setManagerData(data)
			}
		}
		fetchData()
	}, [managers])

	const getChartData = () => {
		return {
			labels: [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December'
			],
			datasets: Object.keys(managerData).map(managerSurname => ({
				label: `${managerSurname}`,
				data: (managerData as Record<string, number[]>)[managerSurname],
				borderColor: RandomColorGenerator(), //? Random color for each manager
				fill: false,
				borderWidth: 2
			}))
		}
	}

	return (
		<Card className='p-6'>
			<h3 className='text-lg font-semibold mb-4'>Managers Performance</h3>
			<div className='h-[400px]'>
				<Line
					data={getChartData()}
					options={{
						responsive: true,
						maintainAspectRatio: false,
						interaction: {
							mode: 'index',
							intersect: false
						},
						scales: {
							y: {
								type: 'linear',
								display: true,
								position: 'left',
								title: {
									display: true,
									text: 'Count of Procurements'
								}
							}
						}
					}}
				/>
			</div>
		</Card>
	)
}
