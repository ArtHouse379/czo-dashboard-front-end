import { useMutation } from '@tanstack/react-query'
import { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { ICustomer } from '@/types/customer.types'
import { Button } from '../../buttons/Button'
import { Field } from '../../fields/Field'
import { customerService } from '@/services/customer.service'

interface Props {
	customer: ICustomer
	setIsEditing: Dispatch<SetStateAction<boolean>>
	setUpdateCustomerInfo: Dispatch<SetStateAction<ICustomer>>
}

export function CustomerEditForm({
	customer,
	setIsEditing,
	setUpdateCustomerInfo
}: Props) {
	const { register, handleSubmit, reset } = useForm<ICustomer>({
		mode: 'onChange'
	})

	if (customer) {
		reset({
			phone: customer.phone,
			email: customer.email,
			address: customer.address
		})
	}

	const { mutate, isPending } = useMutation({
		mutationKey: [`update customer ${customer.id}`],
		mutationFn: (data: ICustomer) => customerService.update(customer.id, data),
		onSuccess() {
			toast.success('Successfully update customer!')
		},
		onError(error) {
			toast.error('Error: ' + error)
		}
	})

	const onSubmit = (data: ICustomer) => {
		setUpdateCustomerInfo(Object.assign(customer, data))
		setIsEditing(false)
		mutate(data)
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
						id='phone'
						label='Phone number:'
						placeholder='Enter phone number:'
						type='phone'
						extra='mb-4'
						{...register('phone')}
					/>

					<Field
						id='email'
						label='Email:'
						placeholder='Enter email:'
						type='email'
						extra='mb-4'
						{...register('email')}
					/>

					<Field
						id='address'
						label='Address:'
						placeholder='Enter address:'
						type='text'
						extra='mb-4'
						{...register('address')}
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
