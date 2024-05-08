'use client'

import { TypeUserForm } from "@/types/auth.types"
import { SubmitHandler, useForm } from "react-hook-form"
import { useInitialData } from "./useInitialData"
import { useUpdateSettings } from "./useUpdateSettings"
import { Field } from "@/components/ui/fields/Field"
import { Button } from "@/components/ui/buttons/Button"

export function Settings() {

    const {register, handleSubmit, reset} = useForm<TypeUserForm>({
        mode: 'onChange'
    })

    useInitialData(reset)

    const {isPending, mutate} = useUpdateSettings()

    const onSubmit: SubmitHandler<TypeUserForm> = data => {
        const { password, ...rest } = data

        mutate({
            ...rest,
            password: password || undefined
        })
    }

    return (
        <div>
            <form className="w-2/4" onSubmit={handleSubmit(onSubmit)}>
                
                <div className="grid grid-cols-2 gap-10">
                    <Field 
                        id="email"
                        label='Email:'
                        placeholder='Enter email:'
                        type='email'
                        extra='mb-4'
                        {...register('email', {required: 'Email is rquired!'})}
                    />
                    <Field 
                        id="name"
                        label='Name:'
                        placeholder='Enter name:'
                        extra='mb-4'
                        {...register('name')}
                    />
                    <Field
                        id='password'
                        label='Password:'
                        placeholder='Enter password:'
                        type='password'
                        extra='mb-10'
                        {...register('password', {required: 'Password is rquired!'})}
                    />
                </div>

                <Button type='submit' disabled={isPending}>
                    Save
                </Button>
            </form>
        </div>
    )
}