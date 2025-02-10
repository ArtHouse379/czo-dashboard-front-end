import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { ICustomer } from '@/types/customer.types'
import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import { Button } from '../buttons/Button'
import { CustomerEditForm } from '../forms/edit-forms/CustomerEditForm'
import { customerService } from '@/services/customer.service'

interface CustomerViewProps {
	customer: ICustomer
}

export function CustomerView({ customer }: CustomerViewProps) {
	const [isEditing, setIsEditing] = useState(false)
	const [customerInfo, setUpdateCustomerInfo] = useState(customer)

	const { push, back } = useRouter()
	const { mutate } = useMutation({
		mutationKey: [`delete-customer-${customerInfo.id}`],
		mutationFn: (id: string) => customerService.delete(id),
		onSuccess() {
			toast.success('Successfuly deleted!')
			push(DASHBOARD_PAGES.CUSTOMERS)
		},
		onError(error: any) {
			toast.error('Error:', error)
		}
	})

	return (
		<div className='flex flex-col min-h-[80vh] justify-between'>
			<div>
				<div>
					<div className='text-right italic text-gray-700'>
						id: {customerInfo.id}
					</div>
					<div className='text-center text-2xl my-4'>{customerInfo.name}</div>
					<div className='text-center text-lg mb-4'>
						ЄДРПОУ: {customerInfo.code}
					</div>
				</div>
				<div className='text-gray-300'>
					<div className='flex justify-between mb-2 bg-gray-800 px-3 p-2 rounded-md'>
						<span>Telephone:</span> <span>{customerInfo.phone}</span>
					</div>
					<div className='flex justify-between mb-2 bg-gray-800 px-3 p-2 rounded-md'>
						<span>Email:</span> <span>{customerInfo.email}</span>
					</div>
					<div className='flex justify-between mb-2 bg-gray-800 px-3 p-2 rounded-md'>
						<span>Address:</span> <span>{customerInfo.address}</span>
					</div>
					<div className='flex justify-between mb-2 bg-gray-800 px-3 p-2 rounded-md'>
						<span>Procurements:</span>{' '}
						<span>{customerInfo.procurements.length}</span>
					</div>
				</div>
				{isEditing ? (
					<CustomerEditForm
						customer={customer}
						setIsEditing={setIsEditing}
						setUpdateCustomerInfo={setUpdateCustomerInfo}
					/>
				) : (
					''
				)}
			</div>

			<div className='flex justify-end gap-4'>
				<Button onClick={() => setIsEditing(true)}>EDIT</Button>
				<Button onClick={() => mutate(customerInfo.id)}>DELETE</Button>
				<Button onClick={() => back()}>Cancel</Button>
			</div>
		</div>
	)
}
