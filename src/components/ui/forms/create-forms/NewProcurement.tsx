'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { IProcurementForm } from '@/types/procurement.types'
import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import { Button } from '../../buttons/Button'
import { Field } from '../../fields/Field'
import { useCustomers } from '@/app/dashboard/customers/hooks/useCustomers'
import { procurementService } from '@/services/procurement.service'

export default function NewProcurement() {
	const { register, handleSubmit, reset } = useForm<IProcurementForm>({
		mode: 'onChange'
	})
	const { data } = useCustomers()
	const customersList = data?.map(customer => {
		return (
			<option
				value={customer.id}
				key={customer.name}
			>
				{' '}
				{customer.name}{' '}
			</option>
		)
	})
	const { push } = useRouter()
	const { mutate } = useMutation({
		mutationKey: ['procurement-create'],
		mutationFn: (data: IProcurementForm) =>
			procurementService.createProcurement(data),
		onSuccess() {
			toast.success('Successfuly added!')
			reset()
			push(DASHBOARD_PAGES.PROCUREMENTS)
		},
		onError(error: any) {
			toast.error('Error:', error)
		}
	})

	const onSubmit: SubmitHandler<IProcurementForm> = data => {
		const modifiedData = {
			...data
		}
		mutate(modifiedData)
	}
	return (
		<div>
			<form
				className='grid grid-cols-2 gap-2'
				onSubmit={handleSubmit(onSubmit)}
			>
				<Field
					id='expectedValue'
					label='Expected value:'
					placeholder='Enter value (UAH):'
					type='text'
					extra='mb-4'
					{...register('expectedValue', { required: 'Value is required!' })}
				/>
				{/* <Field
					id='resultValue'
					label='Result value:'
					placeholder='Enter value (UAH):'
					type='number'
					extra='mb-4'
					{...register('resultValue', { required: 'Value is required!' })}
				/> */}
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
				<Field
					id='status'
					label='Status:'
					placeholder='Enter status (in work, published, finished etc.):'
					type='string'
					extra='mb-4'
					{...register('status', { required: 'Status is required!' })}
				/>
				{/* <Field
					id='announcedAt'
					label='Announced at:'
					placeholder='Enter date:'
					type='datetime-local'
					extra='mb-4'
					{...register('announcedAt', { required: 'Date is required!' })}
				/>
				<Field
					id='finishedAt'
					label='Finished at:'
					placeholder='Enter date:'
					type='datetime-local'
					extra='mb-4'
					{...register('finishedAt')}
				/>
				<Field
					id='prozorroId'
					label='Prozorro ID:'
					placeholder='Enter ID:'
					type='string'
					extra='mb-4'
					{...register('prozorroId', {
						required: 'ID is required!',
						pattern: /^UA-\d{4}-\d{2}-\d{2}-\d{6}-[a-z]$/
					})}
				/>
				<Field
					id='prozorroLink'
					label='Prozorro link:'
					placeholder='Enter link:'
					type='string'
					extra='mb-4'
					{...register('prozorroLink', { required: 'Link is required!' })}
				/> */}

				<select
					id='customerId'
					className='mt-2 flex w-full items-center justify-center rounded-lg border border-border 
                    bg-white/0 p-3 text-base outline-none placeholder:text-white/30 placeholder:font-normal 
                    duration-500 transition-colors focus:border-primary'
					{...register('customerId', { required: 'Customer is required!' })}
				>
					<option
						value=''
						key=''
					>
						{' '}
						Choose customer{' '}
					</option>
					{customersList}
				</select>

				<div className='grid grid-cols-2 gap-2 mt-4'>
					<Button type='submit'>Save & Add</Button>
					<Button
						onClick={() => {
							reset()
							push(DASHBOARD_PAGES.PROCUREMENTS)
						}}
					>
						Cancel & Exit
					</Button>
				</div>
			</form>
		</div>
	)
}
