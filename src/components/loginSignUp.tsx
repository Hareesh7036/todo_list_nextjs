'use client'
import React, {  useState } from 'react'
import {loginSchema} from '../schema/loginSchema';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname} from 'next/navigation';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import FontAwesomeIconWrapper from '@/lib/utilities/font-awsom-wrapper';



type Props = {}

export const LoginSignUpComponent = (props: Props) => {
    const [showPassword, setShowPassword]= useState<boolean>(false);
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
                    <div className='flex flex-col relative'>
                        <span>Password</span>
                        <span className='absolute bottom-0 right-3 cursor-pointer' onClick={()=>setShowPassword(!showPassword)}>
                            <FontAwesomeIconWrapper icon={faEye} />
                        </span>
                        <input id='password' className='border border-black rounded-md pl-4 pr-4' type={showPassword?"text":"password"} {...register('password')} />
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