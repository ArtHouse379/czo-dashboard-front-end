import { Heading } from '@/components/ui/Heading'
import NewProcurement from '@/components/ui/forms/create-forms/NewProcurement'

export default function Page() {
	return (
		<div>
			<Heading title='Add new procurement' />

			<NewProcurement />
		</div>
	)
}
