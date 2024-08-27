import cn from 'clsx'
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

type TypeButton = ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
    children,
    className,
    ...rest
}: PropsWithChildren<TypeButton>) {
    return(
        <button
            className={cn(
                'linear rounded-lg bg-transparent border-[2px] border-blue-600 py-2 px-7 text-base font-medium text-white transition hover:bg-blue-600 active:bg-blue-700',
                className
            )}
            {...rest}
        >
            {children}
        </button>
    )
}