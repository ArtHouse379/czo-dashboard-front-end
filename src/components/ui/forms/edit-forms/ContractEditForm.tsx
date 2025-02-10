'use client'

import { useMutation } from '@tanstack/react-query'
import { Dispatch, SetStateAction } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { IContract } from '@/types/contract.types'
import { Button } from '../../buttons/Button'
import { Field } from '../../fields/Field'
import { contractService } from '@/services/contract.service'

interface ContractEditFormProps {
	contract: IContract
	setUpdateContractInfo: Dispatch<SetStateAction<IContract>>
	setIsEditing: Dispatch<SetStateAction<boolean>>
}

export default function ContractEditForm({
	contract,
	setUpdateContractInfo,
	setIsEditing
}: ContractEditFormProps) {
	const { register, handleSubmit, reset } = useForm<IContract>({
		mode: 'onChange'
	})

	if (contract) {
		reset({
			terminationDate: contract.terminationDate,
			currentValue: !contract.currentValue
				? contract.startValue
				: contract.currentValue,
			scope: contract.scope
		})
	}

	const { mutate, isPending } = useMutation({
		mutationKey: [`update contract ${contract.id}`],
		mutationFn: (data: IContract) => contractService.update(data, contract.id),
		onSuccess() {
			toast.success('Successfully update contract!')
		},
		onError(error) {
			toast.error('Error: ' + error)
		}
	})

	const onSubmit: SubmitHandler<IContract> = data => {
		const { terminationDate, ...rest } = data

		setIsEditing(false)
		setUpdateContractInfo(Object.assign(contract, data))

		mutate({
			...rest,
			terminationDate: !terminationDate
				? ''
				: terminationDate?.includes('T00:00:00.000Z')
					? terminationDate
					: terminationDate + 'T00:00:00.000Z'
		})
	}

	return (
		<div className='w-dvw h-dvh flex fixed top-0 left-0'>
			<div
				className=' w-2/3 h-full bg-gray-900 opacity-20'
				onClick={() => {
					setIsEditing(false)
				}}
			></div>
			<div className='w-1/3 h-full bg-gray-900 p-8 rounded-l-3xl'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Field
						id='terminationDate'
						label='Expired at:'
						placeholder='Enter date:'
						type='date'
						extra='mb-4'
						{...register('terminationDate')}
					/>
					<Field
						id='currentValue'
						label='Current value:'
						placeholder='Enter value:'
						type='number'
						extra='mb-4'
						{...register('currentValue')}
					/>
					<Field
						id='scope'
						label='Current scope:'
						placeholder='Enter scope:'
						type='number'
						extra='mb-4'
						{...register('scope')}
					/>

					<Button className='w-full'>Save</Button>
					<Button
						className='w-full mt-4 hover:bg-red-400 hover:border-red-600 active:bg-red-400'
						type='button'
						onClick={() => setIsEditing(false)}
					>
						Dissmiss
					</Button>
				</form>
			</div>
		</div>
	)
}
