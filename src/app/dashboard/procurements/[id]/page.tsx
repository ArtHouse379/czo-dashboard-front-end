'use client'

import { useParams } from 'next/navigation'
import { Heading } from '@/components/ui/Heading'
import Loader from '@/components/ui/Loader'
import ProcurementView from '@/components/ui/views/ProcurementView'
import { useProcurement } from '../hooks/useProcurement'

export default function procurementView() {
	const { id } = useParams()
	const { data, isLoading } = useProcurement(id.toString())
	return (
		<div>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<Heading title='Procurement view' />

					{data ? <ProcurementView procurement={data} /> : 'No data...'}
				</>
			)}
		</div>
	)
}
