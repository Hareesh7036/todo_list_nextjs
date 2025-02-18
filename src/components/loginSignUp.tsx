'use client'
import React from 'react'
import {loginSchema} from '../schema/loginSchema';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname} from 'next/navigation';



type Props = {}

export const LoginSignUpComponent = (props: Props) => {
    const pathname = usePathname();
    
    const submitBtnText = pathname.includes('login')?'Login':'Sign Up';

    type loginSchemaType = z.infer<typeof loginSchema>;

    const {register, handleSubmit, formState:{errors}}=useForm<loginSchemaType>({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit =(e:any)=>{
        console.log(e)
    }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex justify-center items-center h-dvh'>
            <div className='flex flex-col gap-8 p-5 border-none rounded-md shadow-sm shadow-gray-400 w-1/4'>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col'>
                        <span>UserId/Email</span>
                        <input className='border border-black rounded-md pl-4 pr-4' type='email' {...register('email')} />
                        {errors.email && <span>{errors.email.message}</span>}
                    </div>
                    <div className='flex flex-col'>
                        <span>Password</span>
                        <input className='border border-black rounded-md pl-4 pr-4' type='password' {...register('password')} />
                        {errors.password && <span>{errors.password.message}</span>}
                    </div>
                </div>
                <div className='text-center'>
                    <button className='w-full bg-blue-600 rounded-md text-white' type='submit'>{submitBtnText}</button>
                </div>
            </div>
        </div>
    </form>
  )
}