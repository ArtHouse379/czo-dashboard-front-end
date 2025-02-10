import { Heading } from '@/components/ui/Heading'
import NewCustomer from '@/components/ui/forms/create-forms/NewCustomer'

export default function Page() {
	return (
		<div>
			<Heading title='Add new customer' />

			<NewCustomer />
		</div>
	)
}
