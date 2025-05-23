'use client'
import LoadingComp from '@/components/loading';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import TaskComponent from './components/task';


type TaskResult = {
  task: string;
  description: string;
  _id: string;
};

type FormData = {
  task: string;
  description: string;
};

const CreateTaskAndShow = () => {
    const [formData, setFormData] = useState<FormData>({task :'', description : ''})
    const queryClient = useQueryClient();
    const handleChange = (e :any)=>{
        setFormData((prev)=>(
            {...prev,
            [e.target.name] : e.target.value,}
        ))
    }

    const fetchTasks = async():Promise<TaskResult[]> =>{
        const response = await fetch('/api/task',{
            method : 'Get',
        })
        if(!response.ok){
           throw new Error('Fetching tasks failed!');
        }
        return await response.json();
    }

    const {data, isPending, error} = useQuery<TaskResult[]>({
        queryKey:['tasks'],
        queryFn:fetchTasks,
    })

    const createTask = async (newTask: FormData) => {
        const response = await fetch('/api/task', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask),
        });
        if (!response.ok) {
        throw new Error('Creating task failed!');
        }
        return await response.json();
    };
    const mutation = useMutation({
        mutationFn: createTask,
        onSuccess: () => {
        setFormData({ task: '', description: '' });
        queryClient.invalidateQueries({ queryKey: ['tasks'] }); // 🔁 refetch
        },
        onError: (err) => {
        console.error('Error creating task', err);
        }
    });

    const handleSubmit =async()=>{
        mutation.mutate(formData);
    }
    if(isPending){
        return <LoadingComp />
    }
    if (error) return <div>Error fetching tasks</div>;
  return (
    <div className='flex gap-5'>
        <div className='flex flex-col gap-8 justify-center items-center w-1/2'>
            <div className='flex flex-col gap-2'>
                <span>Task</span>
                <input className='border rounded px-3 border-green-500 bg-background' type='text' name='task' value={formData?.task} onChange={handleChange}/>
            </div>
            <div className='flex flex-col gap-2'>
                <span>Description</span>
                <input className='border rounded px-3 border-green-500 bg-background' type='text' name='description' value={formData?.description} onChange={handleChange} />
            </div>
            <button onClick={handleSubmit} disabled={mutation.isPending}>
                {mutation.isPending ? 'Submitting...' : 'Submit'}
            </button>
        </div>
        {data && <div className='flex flex-col flex-1 gap-2 p-3 h-[calc(100vh-80px)] overflow-scroll hide-scrollbar'>
                {data.map((task:any)=>{
                    return <TaskComponent key={task._id} {...task} />
                })}
            </div>}
    </div>
  )
}

export default CreateTaskAndShow