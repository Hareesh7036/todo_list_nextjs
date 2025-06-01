'use client'
import LoadingComp from '@/components/loading'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { TaskResult } from '../schema'
import { fetchTasks } from '../data'
import TaskComponent from './task'
import useDebounceValue from '@/lib/utilities/custom-hooks/debounce'
import { useRouter } from 'next/navigation'

type Props = {}

export default function AllTasks({}: Props) {
    const [searchText, setSearchText] = useState('');
    const debouncedSearchText = useDebounceValue(searchText, 500);

    const router = useRouter();

    const {data, isPending, error} = useQuery<TaskResult[], Error>({
        queryKey:['tasks', debouncedSearchText],
        queryFn:async () => {
            try {
            return await fetchTasks(debouncedSearchText);
            } catch (err: any) {
            if (err.message === 'Unauthorized') {
                router.push('/auth/login');
            }
            throw err;
            }
        },
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    }
 
  return (
    <div className='flex flex-col flex-1 gap-2 p-3 h-[calc(100vh-80px)] overflow-scroll hide-scrollbar'>
        <div>
            <input className='border rounded px-3 border-green-500 bg-background' type='text' name='search' value={searchText} onChange={handleChange} placeholder='Search'  />
        </div>
        {isPending && <LoadingComp/>}
        {error && <div>Error fetching tasks</div>}
        {data && <div className='flex flex-col gap-2'>
            {data.map((task:any, index:number)=>{
                return <TaskComponent key={task._id} {...task} index={index} />
            })}
        </div>}
    </div>
  )
}