'use client'

import { ContractsOverview } from '@/components/dashboard/ContractsOverview'
import { CustomerInsights } from '@/components/dashboard/CustomerInsights'
import { ProcurementAnalytics } from '@/components/dashboard/ProcurementAnalytics'
import { Heading } from '@/components/ui/Heading'

export default function DashboardPage() {
	return (
		<div className='space-y-6'>
			<Heading title='Dashboard' />

			<div>
				<ProcurementAnalytics />
				<ContractsOverview />
				<CustomerInsights />
			</div>
		</div>
	)
}
