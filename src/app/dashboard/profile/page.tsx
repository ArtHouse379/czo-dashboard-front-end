import { Metadata } from 'next'
import { Heading } from '@/components/ui/Heading'
import { NO_INDEX_PAGE } from '@/constants/seo.contants'
import { UserStatistics } from './UserStatistics'

export const metadata: Metadata = {
	title: 'Profile',
	...NO_INDEX_PAGE
}

export default function ProfilePage() {
	return (
		<div>
			<Heading title='Profile' />

			<UserStatistics />
		</div>
	)
}
