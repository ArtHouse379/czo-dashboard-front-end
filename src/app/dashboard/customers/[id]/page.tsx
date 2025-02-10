'use client'

import { useParams } from 'next/navigation'
import { Heading } from '@/components/ui/Heading'
import Loader from '@/components/ui/Loader'
import { CustomerView } from '@/components/ui/views/CustomerView'
import { useCustomer } from '../../procurements/hooks/useCustomer'

export default function CustomerPage() {
	const { id } = useParams()
	const { data, isLoading } = useCustomer(id.toString())

	return (
		<div>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<Heading title='Customer info' />

					{data ? <CustomerView customer={data} /> : 'No data'}
				</>
			)}
		</div>
	)
}
