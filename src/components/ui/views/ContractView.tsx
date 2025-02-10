import { MoveLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { IContract } from '@/types/contract.types'
import { LocaleDateFormatter } from '@/utils/DateFormatter'
import { IsDateExpired } from '@/utils/IsDateExpired'
import { LocaleNumberFormatter } from '@/utils/NumberFormatter'
import { Button } from '../buttons/Button'
import { Card } from '../cards/Card'
import { NewAgreementForm } from '../forms/create-forms/NewAgreement'
import ContractEditForm from '../forms/edit-forms/ContractEditForm'
import { useProcurement } from '@/app/dashboard/procurements/hooks/useProcurement'

interface ContractViewProps {
	contract: IContract
}

export function ContractView({ contract }: ContractViewProps) {
	const contractProcurement = useProcurement(contract.procurementId).data
	const [contractInfo, setUpdateContractInfo] = useState(contract)
	const [agreements, setAgreements] = useState(contract.agreements)

	const [isEditing, setIsEditing] = useState(false)
	const [creatingContractAgreement, showAgreementForm] = useState(false)
	const isActive = IsDateExpired(contract.terminationDate)

	const { back } = useRouter()

	return (
		<>
			<div className='flex flex-col min-h-[80vh] justify-between'>
				<div className='flex justify-between shrink text-xl'>
					<div className='w-full'>
						<div className='text-2xl text-blue-600 font-bold text-center underline my-2'>
							Contract № {contractInfo.number} since{' '}
							{LocaleDateFormatter(contractInfo.signatureDate)}
						</div>

						<div className='text-center italic'>
							Status:{' '}
							{isActive ? (
								<span className='text-green-600'>Active</span>
							) : (
								<span className='text-red-600'>Expired</span>
							)}
						</div>

						<div className='flex justify-between my-4 bg-gray-800 px-3 p-2 rounded-md'>
							<span>Prozorro id: </span>
							<span>
								{contractProcurement
									? contractProcurement.prozorroId
									: 'not found'}
							</span>
						</div>

						<div className='flex justify-between my-4 bg-gray-800 px-3 p-2 rounded-md'>
							<span>Was signed at: </span>
							<span>{LocaleDateFormatter(contractInfo.signatureDate)}</span>
						</div>

						<div className='flex justify-between my-4 bg-gray-800 px-3 p-2 rounded-md'>
							<span>Expired at: </span>
							<span>{LocaleDateFormatter(contractInfo.terminationDate)}</span>
						</div>

						<div className='flex justify-between my-4 bg-gray-800 px-3 p-2 rounded-md'>
							<span>Start amount: </span>{' '}
							<span>{LocaleNumberFormatter(contractInfo.startValue)} UAH</span>
						</div>

						{contractInfo.currentValue == contractInfo.startValue ||
						!contractInfo.currentValue ? (
							''
						) : (
							<div className='flex justify-between my-4 bg-gray-800 px-3 p-2 rounded-md'>
								<span>Current amount: </span>{' '}
								<span className='text-green-400'>
									{LocaleNumberFormatter(contractInfo.currentValue)} UAH
								</span>
							</div>
						)}

						<div className='flex justify-between my-4 bg-gray-800 px-3 p-2 rounded-md'>
							<span>{contractInfo.product}: </span>{' '}
							<span>
								{LocaleNumberFormatter(contractInfo.scope)} {contractInfo.unit}
							</span>
						</div>

						<div>
							<div className='flex justify-between my-4 bg-gray-800 px-3 p-2 rounded-md'>
								<span>Customer: </span>
								<span className='text-red-600'>
									NEED ADD CUSTOMER ID TO DATABASE & CONTRACT MODEL
								</span>
							</div>
						</div>

						<div className='flex justify-between my-4 bg-gray-800 px-3 p-2 rounded-md'>
							<span>Agreements: </span>{' '}
							<span>{contractInfo.agreements.length}</span>
						</div>

						{isEditing ? (
							<ContractEditForm
								contract={contractInfo}
								setIsEditing={setIsEditing}
								setUpdateContractInfo={setUpdateContractInfo}
							/>
						) : (
							''
						)}

						<Button
							type='button'
							onClick={() => showAgreementForm(true)}
							className='my-4'
						>
							Add agreement
						</Button>

						{creatingContractAgreement ? (
							<NewAgreementForm
								contractId={contract.id}
								showAgreementForm={showAgreementForm}
								agreements={agreements}
								setAgreements={setAgreements}
							/>
						) : (
							''
						)}

						{agreements.length > 0 ? (
							<div className='my-4'>
								<span className='font-bold text-blue-600 text-2xl'>
									Agreements:
								</span>
								<div className='flex flex-col lg:flex-row gap-4 flex-wrap justify-around my-6'>
									{agreements.map(agreement => (
										<Card
											key={agreement.id}
											className='lg:w-32p h-min my-4 lg:my-2'
										>
											<div className='text-center font-bold'>
												№ {agreement.number}
											</div>
											<div className='text-center italic text-lg my-2'>
												signed by{' '}
												{agreement.signatureDate
													? LocaleDateFormatter(agreement.signatureDate)
													: 'not signed'}
											</div>

											<details>
												<summary className='text-right select-none text-blue-600 text-lg italic cursor-pointer'>
													Details...
												</summary>
												<div className='w-full basis-full text-lg'>
													<div>
														<p className='mb-2 text-blue-600 font-bold'>
															Reason:{' '}
														</p>
														<p className='italic'>{agreement.reason}</p>
													</div>
													<div>
														<p className='my-2 text-blue-600 font-bold'>
															Changes:{' '}
														</p>
														<p className='italic'>{agreement.changes}</p>
													</div>
												</div>
											</details>
										</Card>
									))}{' '}
								</div>
							</div>
						) : (
							''
						)}
					</div>
				</div>

				<div className='flex justify-between my-4'>
					<Button onClick={() => back()}>
						{' '}
						<MoveLeft />{' '}
					</Button>
					<Button
						type='button'
						onClick={() => setIsEditing(true)}
					>
						Edit
					</Button>
				</div>
			</div>
		</>
	)
}
