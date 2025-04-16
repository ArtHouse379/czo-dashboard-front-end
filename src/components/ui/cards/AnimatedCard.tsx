import cn from 'clsx'
import { ReactNode } from 'react'

type AnimatedCardProps = {
	children: ReactNode
	className?: string
}

export function AnimatedCard({ children, className }: AnimatedCardProps) {
	return (
		<div
			className={cn(
				'bg-border/5 rounded p-layout hover:-translate-y-3 transition-transform duration-500 shadow-md hover:shadow-lg hover:shadow-blue-700 shadow-blue-700',
				className
			)}
		>
			{children}
		</div>
	)
}
