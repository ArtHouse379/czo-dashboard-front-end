'use client'

import { useMutation } from '@tanstack/react-query'
import { Dispatch, SetStateAction } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { IContract } from '@/types/contract.types'
import { Button } from '../../buttons/Button'
import { Field } from '../../fields/Field'
import { contractService } from '@/services/contract.service'

interface NewContractProps {
	id: string
	showContractForm: Dispatch<SetStateAction<boolean>>
}
// TODO: MAKE VALIDATION FOR FIELDS

export default function NewContract({
	id,
	showContractForm
}: NewContractProps) {
	const { register, handleSubmit, reset } = useForm<IContract>({
		mode: 'onChange'
	})

	const { mutate } = useMutation({
		mutationKey: [`contract-create-${id}`],
		mutationFn: (data: IContract) => contractService.create(data, id),
		onSuccess() {
			toast.success('Successfuly create!')
			reset()
		},
		onError(error: any) {
			toast.error('Error:', error)
		}
	})

	const onSubmit: SubmitHandler<IContract> = data => {
		const { signatureDate, terminationDate, ...rest } = data
		const modifiedData = {
			...rest,
			signatureDate: !signatureDate
				? ''
				: signatureDate?.includes('T00:00:00.000Z')
					? signatureDate
					: signatureDate + 'T00:00:00.000Z',
			terminationDate: !terminationDate
				? ''
				: terminationDate?.includes('T00:00:00.000Z')
					? terminationDate
					: terminationDate + 'T00:00:00.000Z'
		}
		showContractForm(false)
		mutate(modifiedData)
	}

	return (
		<div>
			<form
				className='my-4'
				onSubmit={handleSubmit(onSubmit)}
			>
				<Field
					id='number'
					label='Number:'
					placeholder='Enter number:'
					type='text'
					extra='mb-4'
					{...register('number', { required: 'Number is required!' })}
				/>
				<Field
					id='startValue'
					label='Value:'
					placeholder='Enter value:'
					type='text'
					extra='mb-4'
					{...register('startValue', { required: 'Value is required!' })}
				/>
				<Field
					id='signatureDate'
					label='Signatured at:'
					placeholder='Enter signature date:'
					type='date'
					extra='mb-4'
					{...register('signatureDate')}
				/>
				<Field
					id='terminationDate'
					label='Termination date:'
					placeholder='Enter termination date:'
					type='date'
					extra='mb-4'
					{...register('terminationDate')}
				/>
				<Field
					id='product'
					label='Product name:'
					placeholder='Enter product name:'
					type='string'
					extra='mb-4'
					{...register('product', { required: 'Product is required!' })}
				/>
				<Field
					id='unit'
					label='Unit:'
					placeholder='Enter unit:'
					type='string'
					extra='mb-4'
					{...register('unit', { required: 'Unit is required!' })}
				/>
				<Field
					id='scope'
					label='Scope:'
					placeholder='Enter scope:'
					type='number'
					extra='mb-4'
					{...register('scope', { required: 'Scope is required!' })}
				/>
				<Button>Save</Button>
				<Button
					type='button'
					onClick={() => {
						showContractForm(false)
					}}
				>
					Cancel
				</Button>
			</form>
		</div>
	)
}
