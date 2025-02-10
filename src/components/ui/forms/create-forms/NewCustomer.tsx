'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { ICustomer } from '@/types/customer.types'
import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import { Button } from '../../buttons/Button'
import { Field } from '../../fields/Field'
import { customerService } from '@/services/customer.service'

export default function NewCustomer() {
	const { register, handleSubmit, reset } = useForm<Omit<ICustomer, 'id'>>({
		mode: 'onChange'
	})

	const { push } = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['customer-create'],
		mutationFn: (data: Omit<ICustomer, 'id'>) => customerService.create(data),
		onSuccess() {
			toast.success('New customer was added!')
			reset()
			push(DASHBOARD_PAGES.CUSTOMERS)
		},
		onError(error: any) {
			toast.error('Error: ', error)
		}
	})

	const onSubmit: SubmitHandler<Omit<ICustomer, 'id'>> = data => {
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
					id='name'
					label='Name:'
					placeholder='Enter full name:'
					type='text'
					extra='mb-4'
					{...register('name', { required: 'Name is required!' })}
				/>

				<Field
					id='code'
					label='Code:'
					placeholder='Enter full code:'
					type='text'
					extra='mb-4'
					{...register('code', { required: 'Code is required!' })}
				/>

				<Field
					id='email'
					label='Email:'
					placeholder='Enter full email:'
					type='text'
					extra='mb-4'
					{...register('email', { required: 'Email is required!' })}
				/>

				<Field
					id='phone'
					label='Phone number:'
					placeholder='Enter full phone:'
					type='tel'
					extra='mb-4'
					{...register('phone', { required: 'Phone is required!' })}
				/>

				<Field
					id='address'
					label='Address:'
					placeholder='Enter full address:'
					type='text'
					extra='mb-4'
					{...register('address', { required: 'Address is required!' })}
				/>

				<div className='grid grid-cols-2 gap-2 mt-4'>
					<Button type='submit'>Save & Add</Button>
					<Button
						onClick={() => {
							reset()
							push(DASHBOARD_PAGES.CUSTOMERS)
						}}
					>
						Cancel & Exit
					</Button>
				</div>
			</form>
		</div>
	)
}
