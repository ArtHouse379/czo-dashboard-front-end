'use client'

import { Loader } from 'lucide-react'
import Link from 'next/link'
import { Card } from '@/components/ui/cards/Card'
import { useUser } from '@/hooks/useUser'
import { LocaleDateFormatter } from '@/utils/DateFormatter'
import { LocaleNumberFormatter } from '@/utils/NumberFormatter'

export default function ProcurementListItem(props) {
	const { procurement } = props

	const userInfo = useUser(procurement.userId)

	return (
		<Card className='w-33p xl:w-24p'>
			<div>
				<p className='mb-2 text-xl font-bold hover:underline'>
					<Link
						className='block'
						href={`procurements/${procurement.id}`}
					>
						{procurement.product}
					</Link>
				</p>
				{/* // * INFO ABOUT ANNOUNCED STAGE OF PROCUREMENT */}
				{procurement.finishedAt ? (
					<p className='my-4 text-green-500'>
						Was finished: {LocaleDateFormatter(procurement.finishedAt)}
					</p>
				) : procurement.announcedAt ? (
					<p className='my-4 text-yellow-500'>
						Announced at: {LocaleDateFormatter(procurement.announcedAt)}
					</p>
				) : (
					'Not announced'
				)}
				<p className='flex justify-between my-4'>
					<span>Expected value: </span>
					<span className='text-xl text-right'>
						{LocaleNumberFormatter(procurement.expectedValue)} UAH
					</span>
				</p>
			</div>
			{/* IF PROCUREMENT WAS ANNOUNCED - SHOW PROZORRO ID*/}
			{procurement.announcedAt ? (
				<p className='mb-2'>ID: {procurement.prozorroId}</p>
			) : (
				''
			)}
			<div>
				<p className='text-right italic underline'>
					Manager:{' '}
					{userInfo.isLoading ? <Loader /> : userInfo.data.name.toUpperCase()}
				</p>
			</div>
		</Card>
	)
}
