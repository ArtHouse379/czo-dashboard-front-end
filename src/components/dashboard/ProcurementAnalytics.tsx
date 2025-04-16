'use client'

import '@/config/chart.config'
import { ProcurementManagersChart } from '../ui/charts/procurements/ProcurementManagersChart'
import { ProcurementsStatusChart } from '../ui/charts/procurements/ProcurementsStatusChart'
import { ProcurementsTotalValueChart } from '../ui/charts/procurements/ProcurementsTotalValueChart'
import { ProcurementStats } from '../ui/statistics/ProcurementStats'

export function ProcurementAnalytics() {
	return (
		<div className='my-6'>
			<h2 className='text-2xl font-bold mb-4'>Procurement Analytics</h2>

			<ProcurementStats />

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 my-6'>
				<ProcurementsStatusChart />
				<ProcurementsTotalValueChart />
			</div>

			<div>
				<ProcurementManagersChart />
			</div>
		</div>
	)
}
