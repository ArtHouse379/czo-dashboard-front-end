'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Field'
import { TypeUserForm } from '@/types/auth.types'
import { useProfile } from '@/hooks/useProfile'
import { useInitialData } from './useInitialData'
import { useUpdateSettings } from './useUpdateSettings'

export function Settings() {
	const { register, handleSubmit, reset } = useForm<TypeUserForm>({
		mode: 'onChange'
	})
	const { data, isSuccess } = useProfile()

	useInitialData(reset)

	const { isPending, mutate } = useUpdateSettings()

	const onSubmit: SubmitHandler<TypeUserForm> = data => {
		const { password, isAdmin, isGuest, isManager, ...rest } = data

		mutate({
			...rest,
			isAdmin: isAdmin ? true : false,
			isGuest: isGuest ? true : false,
			isManager: isManager ? true : false,
			password: password || undefined
		})
	}

	return (
		<div>
			<form
				className='w-2/4'
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className='grid grid-cols-2 gap-10'>
					<Field
						id='email'
						label='Email:'
						placeholder='Enter email:'
						type='email'
						extra='mb-4'
						{...register('email', { required: 'Email is required!' })}
					/>
					<Field
						id='password'
						label='Password:'
						placeholder='Enter password:'
						type='password'
						extra='mb-4'
						{...register('password', {
							required: 'Password is required!',
							minLength: {
								value: 6,
								message: 'Password must be at least 6 characters long!'
							}
						})}
					/>
					<Field
						id='name'
						label='Name:'
						placeholder='Enter name:'
						extra='mb-4'
						{...register('name')}
					/>
					<Field
						id='surname'
						label='Surname:'
						placeholder='Enter surname:'
						extra='mb-4'
						{...register('surname')}
					/>
					{isSuccess && data?.user.isAdmin ? (
						<div className='flex flex-col gap-3'>
							<p className='text-xl font-semibold mb-2'>Choose the roles:</p>
							<div className='space-y-2'>
								<label className='flex items-center gap-2 cursor-pointer'>
									<input
										type='checkbox'
										className='w-4 h-4 accent-blue-500'
										{...register('isAdmin')}
									/>
									<span>Administrator</span>
								</label>
								<label className='flex items-center gap-2 cursor-pointer'>
									<input
										type='checkbox'
										className='w-4 h-4 accent-blue-500'
										{...register('isGuest')}
									/>
									<span>Guest</span>
								</label>
								<label className='flex items-center gap-2 cursor-pointer'>
									<input
										type='checkbox'
										className='w-4 h-4 accent-blue-500'
										{...register('isManager')}
									/>
									<span>Manager</span>
								</label>
							</div>
						</div>
					) : (
						''
					)}
				</div>

				<Button
					type='submit'
					disabled={isPending}
				>
					Save
				</Button>
			</form>
		</div>
	)
}
