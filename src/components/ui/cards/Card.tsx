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
				'bg-border/5 rounded p-layout hover:-translate-y-3 transition-transform duration-500 shadow-md shadow-blue-700',
				className
			)}
		>
			{children}
		</div>
	)
}
