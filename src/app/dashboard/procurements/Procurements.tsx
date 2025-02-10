'use client'

import Link from 'next/link'
import Loader from '@/components/ui/Loader'
import { Button } from '@/components/ui/buttons/Button'
import ProcurementListItem from './ProcurementListItem'
import { useProcurements } from '@/app/dashboard/procurements/hooks/useProcurements'

export function Procurements() {
	const { data, isLoading } = useProcurements()

	return isLoading ? (
		<Loader />
	) : (
		<>
			{data ? (
				<>
					<div className='flex flex-col'>
						<div className='italic my-2'>Total: {data.length}</div>

						<form>
							<input
								type='text'
								name='search'
								id='search'
								placeholder='search...(product, price)'
								className='bg-transparent border rounded-md p-1 border-gray-400 w-full text-lg text-center my-2'
							/>
							<div className='flex justify-end my-2'>
								<label htmlFor='sort-data'>By data:</label>
								<select
									name='sort'
									id='sort-data'
									className='bg-transparent border-b-2 hover:cursor-pointer mx-2 text-center'
								>
									<option value=''>-</option>
									<option value='older'>Older</option>
									<option value='newest'>Newest</option>
									<option value='cheaper'>Cheaper</option>
									<option value='expensive'>Most expensive</option>
								</select>

								<label htmlFor='sort-manager'>By manager:</label>
								<select
									name='sort'
									id='sort-manager'
									className='bg-transparent border-b-2 hover:cursor-pointer ml-2 text-center'
								>
									<option value=''>All</option>
									<option value='Kuchansky'>Kuchansky</option>
									<option value='Guz'>Guz</option>
									<option value='Chechel'>Chechel</option>
								</select>
							</div>
						</form>
					</div>

					<div className='flex my-2'>
						<div>
							<Button>
								<Link href='procurements/create'>Add new</Link>
							</Button>
						</div>
					</div>
				</>
			) : (
				''
			)}
			<div className='flex pt-4 gap-4'>
				{data?.length ? (
					data.map((procurement, index) => (
						<ProcurementListItem
							procurement={procurement}
							key={`procurement${index}`}
						/>
					))
				) : (
					<div className='w-full text-center'>...procurements not loaded!</div>
				)}
			</div>
		</>
	)
}
