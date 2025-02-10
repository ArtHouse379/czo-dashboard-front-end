'use client'

import Link from 'next/link'
import Loader from '@/components/ui/Loader'
import { Card } from '@/components/ui/cards/Card'
import { LocaleDateFormatter } from '@/utils/DateFormatter'
import { useContracts } from './hooks/useContracts'

export function Contracts() {
	const { data, isLoading } = useContracts()

	return isLoading ? (
		<Loader />
	) : (
		<>
			{data ? (
				<div className='italic'>Count of contracts: {data.length}</div>
			) : (
				''
			)}
			<form>
				<input
					type='text'
					name='search'
					id='search'
					placeholder='search...(product, price)'
					className='bg-transparent border rounded-md p-1 border-gray-400 w-full text-lg text-center my-2'
				/>
			</form>

			<div className='flex justify-around flex-wrap'>
				{data ? (
					data.map(contract => (
						<Card
							key={contract.number}
							className='w-24p my-4'
						>
							<Link
								href={`contracts/${contract.id}`}
								className='text-center'
							>
								<div className='text-xl font-bold'>№ {contract.number}</div>
								<div className='italic my-2'>
									from {LocaleDateFormatter(contract.signatureDate)}
								</div>
								<div className='italic my-2'>{contract.product}</div>
							</Link>
						</Card>
					))
				) : (
					<div className='text-center'>Customers not loaded!</div>
				)}
			</div>
		</>
	)
}
