
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormData } from './schema'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask } from './actions';


export default function TaskForm() {
    const {register, handleSubmit, formState:{errors}} = useForm<FormData>();
    const queryClient = useQueryClient();
    
        const mutation = useMutation({
            mutationFn: createTask,
            onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] }); // 🔁 refetch
            },
            onError: (err) => {
            console.error('Error creating task', err);
            }
        });

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data);
        mutation.mutate(data);
    }
  return (
        <div className='flex flex-col gap-4 justify-center items-center w-1/2'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    <span>Task</span>
                    <input className='border rounded px-3 border-green-500 bg-background' type='text' {...register('task')} name='task'/>
                </div>
                <div className='flex flex-col gap-2'>
                    <span>Description</span>
                    <input className='border rounded px-3 border-green-500 bg-background' type='text'{...register('description')} name='description'/>
                </div>
                <button disabled={mutation.isPending} type='submit'>
                    {mutation.isPending ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    
  )
}