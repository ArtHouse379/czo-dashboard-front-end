'use client'

import { Loader } from 'lucide-react'
import Link from 'next/link'
import { AnimatedCard } from '@/components/ui/cards/AnimatedCard'
import { useUser } from '@/hooks/useUser'
import { LocaleDateFormatter } from '@/utils/DateFormatter'
import { LocaleNumberFormatter } from '@/utils/NumberFormatter'

export default function ProcurementListItem(props) {
	const { procurement } = props

	const userInfo = useUser(procurement.userId)

	return (
		<AnimatedCard className='w-100p lg:w-48p 3xl:w-32p'>
			<div className='flex flex-col justify-between h-full'>
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
					<p className='text-right italic underline text-blue-200'>
						Manager:{' '}
						{userInfo.isLoading ? (
							<Loader />
						) : (
							`${userInfo.data.name.charAt(0).toUpperCase()}. ${userInfo.data.surname.toUpperCase()}`
						)}
					</p>
				</div>
			</div>
		</AnimatedCard>
	)
}
