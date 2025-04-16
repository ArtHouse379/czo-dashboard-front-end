'use client'

import Link from 'next/link'
import Loader from '@/components/ui/Loader'
import { Button } from '@/components/ui/buttons/Button'
import { Card } from '@/components/ui/cards/Card'
import { useCustomers } from '@/app/dashboard/customers/hooks/useCustomers'

export function Customers() {
	const { data, isLoading } = useCustomers()

	return isLoading ? (
		<Loader />
	) : (
		<>
			{data ? (
				<>
					<div className='italic my-2'>Count of customers: {data.length}</div>
					<form>
						<input
							type='text'
							name='search'
							id='search'
							placeholder='search...(product, price)'
							className='bg-transparent border rounded-md p-1 border-gray-400 w-full text-lg text-center my-2'
						/>
					</form>
					<div className='flex my-2'>
						<div>
							<Button>
								<Link href='customers/create'>Add new</Link>
							</Button>
						</div>
					</div>
				</>
			) : (
				''
			)}
			<div className='flex flex-wrap justify-between'>
				{data?.length ? (
					data.map(customer => (
						<Card
							key={customer.id}
							className='w-32p flex justify-center items-center my-4'
						>
							<Link
								href={`customers/${customer.id}`}
								className='text-center'
							>
								<div className='text-xl'>{customer.name}</div>
							</Link>
						</Card>
					))
				) : (
					<div className='w-full text-center'>Customers not loaded!</div>
				)}
			</div>
		</>
	)
}
