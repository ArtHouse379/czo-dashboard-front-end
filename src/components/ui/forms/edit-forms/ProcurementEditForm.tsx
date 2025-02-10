'use client'

import { useMutation } from '@tanstack/react-query'
import { Dispatch, SetStateAction } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { IUser } from '@/types/auth.types'
import { ICustomer } from '@/types/customer.types'
import { IProcurement, IProcurementEditForm } from '@/types/procurement.types'
import { Button } from '../../buttons/Button'
import { Field } from '../../fields/Field'
import { procurementService } from '@/services/procurement.service'

// TODOS
// * CHECKS: VALIDATION FOR FIELDS
// * FEATURES: SELECT FIELD FOR CHANGE MANAGER

interface Props {
	procurement: IProcurement
	setEdit: Dispatch<SetStateAction<boolean>>
	setProcurementData: Dispatch<SetStateAction<IProcurement>>
	customer: ICustomer | undefined
	manager: IUser | undefined
}

export default function ProcurementEditForm({
	procurement,
	setEdit,
	setProcurementData,
	customer,
	manager
}: Props) {
	const { register, handleSubmit, reset } = useForm<IProcurementEditForm>({
		mode: 'onChange'
	})

	if (procurement) {
		reset({
			announcedAt: procurement.announcedAt,
			finishedAt: procurement.finishedAt,
			resultValue: procurement.resultValue,
			prozorroId: procurement.prozorroId,
			prozorroLink: procurement.prozorroLink,
			status: procurement.status
		})
	}

	const { mutate, isPending } = useMutation({
		mutationKey: [`update procurement ${procurement.id}`],
		mutationFn: (data: IProcurementEditForm) =>
			procurementService.updateProcurement(procurement.id, data),
		onSuccess() {
			toast.success('Successfully update procurement!')
		},
		onError(error) {
			toast.error('Error: ' + error)
		}
	})

	const onSubmit: SubmitHandler<IProcurementEditForm> = data => {
		const { announcedAt, finishedAt, ...rest } = data

		setEdit(false)
		setProcurementData(Object.assign(procurement, data))

		mutate({
			...rest,
			announcedAt: !announcedAt
				? undefined
				: announcedAt?.includes('T00:00:00.000Z')
					? announcedAt
					: announcedAt + 'T00:00:00.000Z',
			finishedAt: !finishedAt
				? undefined
				: finishedAt?.includes('T00:00:00.000Z')
					? finishedAt
					: finishedAt + 'T00:00:00.000Z'
		})
	}

	return (
		<div className='w-dvw h-dvh flex fixed top-0 left-0'>
			<div
				className=' w-2/3 h-full bg-gray-900 opacity-20'
				onClick={() => setEdit(false)}
			></div>
			<div className='w-1/3 h-full bg-gray-900 p-8 rounded-l-3xl'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Field
						id='announcedAt'
						label='Announced at:'
						placeholder='Enter announced date:'
						type='date'
						extra='mb-4'
						{...register('announcedAt')}
					/>

					<Field
						id='finishedAt'
						label='Finished at:'
						placeholder='Enter finished date:'
						type='date'
						extra='mb-4'
						{...register('finishedAt')}
					/>

					<Field
						id='resultValue'
						label='Result value:'
						placeholder='Enter result value:'
						type='text'
						extra='mb-4'
						{...register('resultValue')}
					/>

					<Field
						id='prozorroId'
						label='Prozorro id:'
						placeholder='Enter prozorro id:'
						type='text'
						extra='mb-4'
						{...register('prozorroId', {
							pattern: /^UA-\d{4}-\d{2}-\d{2}-\d{6}-[a-z]$/
						})}
					/>
					<Field
						id='prozorroLink'
						label='Prozorro link:'
						placeholder='Enter prozorro link:'
						type='text'
						extra='mb-4'
						{...register('prozorroLink')}
					/>

					{procurement.status == 'finished' ||
					procurement.status == 'завершений' ? (
						''
					) : (
						<Field
							id='status'
							label='Status:'
							placeholder='Enter status:'
							type='text'
							extra='mb-4'
							{...register('status')}
						/>
					)}

					<Button className='w-full'>Save</Button>
					<Button
						className='w-full mt-4 hover:bg-red-400 hover:border-red-600 active:bg-red-400'
						type='button'
						onClick={() => setEdit(false)}
					>
						Dissmiss
					</Button>
				</form>
			</div>
		</div>
	)
}
