'use client'

import { useMutation } from '@tanstack/react-query'
import { Loader } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { IProcurement } from '@/types/procurement.types'
import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import { useUser } from '@/hooks/useUser'
import { LocaleDateFormatter } from '@/utils/DateFormatter'
import { LocaleNumberFormatter } from '@/utils/NumberFormatter'
import { Button } from '../buttons/Button'
import ProgressCircle from '../charts/ProgressCircle'
import NewContract from '../forms/create-forms/NewContract'
import ProcurementEditForm from '../forms/edit-forms/ProcurementEditForm'
import { useCustomer } from '@/app/dashboard/procurements/hooks/useCustomer'
import { procurementService } from '@/services/procurement.service'

interface ProcurementViewProps {
	procurement: IProcurement
}

export default function ProcurementView({ procurement }: ProcurementViewProps) {
	console.log('ProcurementView:', procurement)
	const [editting, setEdit] = useState(false)
	const [contractForm, showContractForm] = useState(false)
	const [procurementData, setProcurementData] = useState(procurement)

	const customer = useCustomer(procurementData.customerId).data
	const manager = useUser(procurementData.userId).data

	const { push } = useRouter()
	const { mutate } = useMutation({
		mutationKey: [`delete-procurement-${procurementData.id}`],
		mutationFn: (id: string) => procurementService.deleteProcurement(id),
		onSuccess() {
			toast.success('Successfuly deleted!')
			push(DASHBOARD_PAGES.PROCUREMENTS)
		},
		onError(error: any) {
			toast.error('Error:', error)
		}
	})

	return (
		<div className='flex flex-col min-h-[80vh] justify-between'>
			<div className='flex justify-between shrink'>
				<div>
					<p className='text-4xl font-bold text-green-500'>
						{procurementData.product}
					</p>
					<p className='text-xl text-right italic font-bold text-green-500'>
						{LocaleNumberFormatter(procurementData.scope)}{' '}
						{procurementData.unit}
					</p>
					<p className='text-lg text-green-600 mt-4'>
						Customer: <br />
						{customer?.name}
					</p>
					<p className='text-lg text-gray-600 mt-4'>
						Current stage:{' '}
						{procurementData.finishedAt
							? `finished at: ${LocaleDateFormatter(procurementData.finishedAt)}`
							: procurementData.announcedAt
								? `announced at: ${LocaleDateFormatter(procurementData.announcedAt)}`
								: 'not announced'}
					</p>
					<div className='my-8'>
						{procurementData.expectedValue > 0 ? (
							<p className='my-4 text-lg'>
								Expected value:{' '}
								<span className='font-bold'>
									{LocaleNumberFormatter(procurementData.expectedValue)} гривень
								</span>
							</p>
						) : (
							''
						)}
						{procurementData.resultValue > 0 ? (
							<p className='my-4 text-lg'>
								Result value:{' '}
								<span className='font-bold'>
									{LocaleNumberFormatter(procurementData.resultValue)} гривень
								</span>
							</p>
						) : (
							''
						)}
					</div>

					<div className='my-8'>
						{procurementData.prozorroId ? (
							<p>
								Prozorro ID:{' '}
								<Link
									className='underline italic text-blue-600 hover:text-blue-400'
									href={
										procurementData.prozorroLink ||
										`https://prozorro.gov.ua/tender/${procurementData.prozorroId}`
									}
									target='_blank'
								>
									{procurementData.prozorroId}
								</Link>
							</p>
						) : (
							''
						)}
						{procurementData.jointProcurementid ? (
							<p className='font-bold italic text-blue-600'>
								Is part of joint procurement
							</p>
						) : (
							''
						)}
					</div>
					<div>
						{procurementData.finishedAt && !procurement.contracts.length ? (
							<Button onClick={() => showContractForm(true)}>
								Add contract
							</Button>
						) : (
							<div>
								<div className='flex flex-col text-lg'>
									<p className='my-4'>
										Contracts:{' '}
										{procurement.contracts.map(contract => (
											<Link
												key={contract.id}
												href={`/dashboard/contracts/${contract.id}`}
												className='text-blue-600 underline'
											>
												№ {contract.number}
											</Link>
										))}
									</p>
								</div>
							</div>
						)}
						{contractForm ? (
							<NewContract
								id={procurementData.id}
								showContractForm={showContractForm}
							/>
						) : (
							''
						)}
					</div>
				</div>

				<div className='flex flex-col'>
					<div className='my-8'>
						<ProgressCircle />
					</div>
					<p className='my-2'>Manager: {manager ? manager.name : <Loader />}</p>
					<p className='my-2'>
						Created: {LocaleDateFormatter(procurementData.createdAt)}
					</p>
					<p className='my-2'>
						Last update: {LocaleDateFormatter(procurementData.updatedAt)}
					</p>
				</div>

				{editting ? (
					<ProcurementEditForm
						procurement={procurementData}
						setEdit={setEdit}
						setProcurementData={setProcurementData}
						customer={customer}
						manager={manager}
					/>
				) : (
					''
				)}
			</div>

			<div className='flex justify-end gap-4'>
				{procurement.contracts.length ? (
					''
				) : (
					<Button
						onClick={() => {
							setEdit(true)
						}}
					>
						EDIT
					</Button>
				)}
				<Button onClick={() => mutate(procurementData.id)}>DELETE</Button>
				<Button
					onClick={() => {
						push(DASHBOARD_PAGES.PROCUREMENTS)
					}}
				>
					Cancel
				</Button>
			</div>
		</div>
	)
}
