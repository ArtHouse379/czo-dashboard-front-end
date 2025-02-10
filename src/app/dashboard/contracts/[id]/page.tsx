'use client'

import { Loader } from 'lucide-react'
import { useParams } from 'next/navigation'
import { Heading } from '@/components/ui/Heading'
import { ContractView } from '@/components/ui/views/ContractView'
import { useContract } from '../hooks/useContract'

export default function ContractInfo() {
	const { id } = useParams()
	const { data, isLoading } = useContract(id.toString())

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<Heading title='Contract info' />

					{data ? <ContractView contract={data} /> : 'no data'}
				</>
			)}
		</>
	)
}
