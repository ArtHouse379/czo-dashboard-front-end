'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import Loader from '@/components/ui/Loader'
import { Button } from '@/components/ui/buttons/Button'
import { IProcurement } from '@/types/procurement.types'
import { useProcurementsStore } from '@/store/ProcurementStore'
import ProcurementListItem from './ProcurementListItem'

export function Procurements() {
	const { reset } = useForm()

	const {
		procurements,
		filterByManager,
		resetProcurements,
		searchFilter,
		sortProcurements,
		loading
	} = useProcurementsStore()

	if (loading) return <Loader />

	console.log('Procurements: ', procurements)
	return (
		<>
			<div>
				<div className='flex flex-col'>
					<div className='italic my-2'>Total: {procurements.length}</div>

					<form>
						<input
							type='text'
							name='search'
							id='search'
							placeholder='search...(product / ID)'
							className='bg-transparent border rounded-md p-1 border-gray-400 w-full text-lg text-center my-2'
							onChange={e => {
								e.target.value
									? searchFilter(e.target.value)
									: resetProcurements()
							}}
						/>
						<div className='flex justify-end items-center my-2'>
							<div>
								<label htmlFor='sort-data'>By data:</label>
								<select
									name='sort'
									id='sort-data'
									className='bg-transparent border-b-2 hover:cursor-pointer mx-2 text-center'
									onChange={e =>
										sortProcurements(e.target.value as keyof IProcurement)
									}
								>
									<option value=''>-</option>
									<option value='createdAt'>Newest first</option>
									<option value='expectedValue'>Expensive first</option>
								</select>

								<label htmlFor='sort-manager'>By manager:</label>
								<select
									name='sort'
									id='sort-manager'
									className='bg-transparent border-b-2 hover:cursor-pointer mx-2 text-center'
								>
									<option value=''>-</option>
									<option value='Kuchansky'>Kuchansky</option>
									<option value='Guz'>Guz</option>
									<option value='Chechel'>Chechel</option>
								</select>
							</div>
							<Button
								className='text-xs'
								type='button'
								onClick={() => {
									resetProcurements()
									reset()
								}}
							>
								Reset
							</Button>
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
			</div>

			<div className='flex flex-col lg:flex-row flex-wrap justify-between pt-4 gap-6'>
				{procurements?.length ? (
					procurements.map((procurement, index) => (
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
