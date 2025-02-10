'use client'

import { Gavel } from 'lucide-react'
import Link from 'next/link'
import { COLORS } from '@/constants/color.constants'
import { LogoutButton } from './LogoutButton'
import { MenuItem } from './MenuItem'
import { MENU } from './menu.data'

export function Sidebar() {
	return (
		<aside className='flex flex-col justify-between h-full border-r border-r-border bg-sidebar'>
			<div>
				<Link
					href='/dashboard'
					className='flex items-center justify-center gap-2.5 p-4 xl:p-layout border-b border-b-border'
				>
					<Gavel
						color={COLORS.blueHalfTransparent}
						size={50}
					/>
					<span className='text-lg lg:text-xl xl:text-2xl font-bold relative'>
						CZO_Work
						<span className='absolute -top-1 -right-6 text-xs opacity-40 rotate-[18deg] font-normal'>
							beta
						</span>
					</span>
				</Link>

				<div className='py-4 px-2 relative'>
					<LogoutButton />

					{MENU.map(item => (
						<MenuItem
							item={item}
							key={item.link}
						/>
					))}
				</div>
			</div>

			<footer className='text-xs opacity-40 font-normal text-center p-layout'>
				2025 &copy; Developed by {''}
				<a
					href='https://github.com/ArtHouse379'
					target='_blank'
					rel='noreferrer'
					className='hover:text-blue-300 hover:opacity-100 text-brand-300 transition-colors'
				>
					ArtHouse379
				</a>
			</footer>
		</aside>
	)
}
