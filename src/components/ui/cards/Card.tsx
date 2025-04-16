import cn from 'clsx'
import { ReactNode } from 'react'

type CardProps = {
	children: ReactNode
	className?: string
}

export function Card({ children, className }: CardProps) {
	return (
		<div
			className={cn(
				'bg-border/5 rounded p-layout shad shadow-md hover:shadow-lg hover:shadow-blue-700 shadow-blue-700',
				className
			)}
		>
			{children}
		</div>
	)
}
