import Link from 'next/link'
import { IMenuItem } from './menu.interface'

export function MenuItem({ item }: { item: IMenuItem }) {
	return (
		<div>
			<Link
				href={item.link}
				className='flex gap-2.5 items-center py-4 mt-4 px-layout transition-colors hover:bg-border xl:text-xl lg:text-lg text-md rounded-lg'
			>
				<item.icon />
				<span>{item.name}</span>
			</Link>
		</div>
	)
}
