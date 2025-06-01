'use client'
import React, {  useState } from 'react'

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter} from 'next/navigation';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import FontAwesomeIconWrapper from '@/lib/utilities/font-awsom-wrapper';
import { loginSchema } from '@/schema/loginSchema';


export const LoginSignUpForm = () => {
    const router = useRouter();
    const [showPassword, setShowPassword]= useState<boolean>(false);
    const pathname = usePathname();
    const isLogin = pathname.includes('login');
    const submitBtnText = isLogin ?'Login':'Sign Up';

    type loginSchemaType = z.infer<typeof loginSchema>;

    const {register, handleSubmit, formState:{errors}}=useForm<loginSchemaType>({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = async (data:loginSchemaType) => {
        try {
      const res = await fetch(`/api/authentication/${isLogin ? 'login' : 'signup'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.error || 'Something went wrong');
        return;
      }

      alert(result.message || `${submitBtnText} successful`);
      router.push('/taskss');
    } catch (err) {
      alert('Something went wrong');
      console.error(err);
    }
    }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex justify-center items-center h-[calc(100vh-80px)]'>
            <div className='flex flex-col gap-8 p-5 border-none rounded-md shadow-sm shadow-gray-400 w-1/4'>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col'>
                        <span>UserId/Email</span>
                        <input className='border border-green-500 bg-background rounded-md pl-4 pr-4' type='email' {...register('email')} />
                        {errors.email && <span>{errors.email.message}</span>}
                    </div>
                    <div className='flex flex-col relative'>
                        <span>Password</span>
                        <span className='absolute bottom-0 right-3 cursor-pointer' onClick={()=>setShowPassword(!showPassword)}>
                            <FontAwesomeIconWrapper icon={faEye} />
                        </span>
                        <input id='password' className='border border-green-500 bg-background rounded-md pl-4 pr-4' type={showPassword?"text":"password"} {...register('password')} />
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