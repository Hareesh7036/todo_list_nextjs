import LoadingComp from '@/components/loading'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { TaskResult } from '../schema'
import { fetchTasks } from '../data'
import TaskComponent from './task'

type Props = {}

export default function AllTasks({}: Props) {
    const [tasksData, setTasksData] = useState<TaskResult | null>(null)
    const [searchText, setSearchText] = useState('');
    const [debouncedSearchText, setDebouncedSearchText] = useState('');

    // ⏳ Debounce effect
    useEffect(() => {
        const timeout = setTimeout(() => {
        setDebouncedSearchText(searchText);
        }, 300); // Adjust delay as needed

        return () => clearTimeout(timeout); // Cleanup on text change
    }, [searchText]);

    const {data, isPending, error} = useQuery<TaskResult[]>({
        queryKey:['tasks', debouncedSearchText],
        queryFn:() => fetchTasks(debouncedSearchText),
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