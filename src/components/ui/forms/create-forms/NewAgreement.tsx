'use client'

import { useMutation } from '@tanstack/react-query'
import { Dispatch, SetStateAction } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { IContractAgreement } from '@/types/contractAgreement.types'
import { Button } from '../../buttons/Button'
import { Field } from '../../fields/Field'
import { contractAgreementService } from '@/services/contract-agreement.service'

interface NewAgreementFormProps {
	contractId: string
	showAgreementForm: Dispatch<SetStateAction<boolean>>
	agreements: IContractAgreement[]
	setAgreements: Dispatch<SetStateAction<IContractAgreement[]>>
}

export function NewAgreementForm({
	contractId,
	showAgreementForm,
	agreements,
	setAgreements
}: NewAgreementFormProps) {
	const { register, handleSubmit, reset } = useForm<IContractAgreement>({
		mode: 'onChange'
	})
	const { mutate } = useMutation({
		mutationKey: ['contract-agreement-create'],
		mutationFn: (data: IContractAgreement) =>
			contractAgreementService.create(data, contractId),
		onSuccess() {
			toast.success('Agreement successfuly added!')
			reset()
		},
		onError(error: any) {
			toast.error('Error:', error)
		}
	})

	const onSubmit: SubmitHandler<IContractAgreement> = data => {
		const { signatureDate, ...rest } = data
		const modifiedData = {
			...rest,
			signatureDate: signatureDate?.includes('T00:00:00.000Z')
				? signatureDate
				: signatureDate + 'T00:00:00.000Z'
		}
		setAgreements([...agreements, modifiedData])
		showAgreementForm(false)
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
					id='signatureDate'
					label='Signatured at:'
					placeholder='Enter signature date:'
					type='date'
					extra='mb-4'
					{...register('signatureDate', {
						required: 'Signature date is required!'
					})}
				/>
				<Field
					id='reason'
					label='Reason:'
					placeholder='Enter reason:'
					type='text'
					extra='mb-4'
					{...register('reason', {
						required: 'Reason is required!'
					})}
				/>
				<Field
					id='changes'
					label='Changes:'
					placeholder='Enter changes:'
					type='text'
					extra='mb-4'
					{...register('changes', {
						required: 'Changes is required!'
					})}
				/>
				<div className='flex gap-4'>
					<Button>Save</Button>
					<Button
						type='button'
						onClick={() => showAgreementForm(false)}
					>
						Cancel
					</Button>
				</div>
			</form>
		</div>
	)
}
