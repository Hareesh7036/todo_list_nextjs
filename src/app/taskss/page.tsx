'use client'
import LoadingComp from '@/components/loading';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'

type Props = {};

type taskResults={
    task : String,
    description: String,
    _id: any
}

const CreateTaskAndShow = (props: Props) => {
    // const [taskResults, setTaskResults] = useState<[taskResults] | null>(null);
    const [formData, setFormData] = useState({task :'', description : ''})
    const handleChange = (e :any)=>{
        setFormData((prev)=>(
            {...prev,
            [e.target.name] : e.target.value,}
        ))
    }

    const fetchTasks = async()=>{
        const response = await fetch('/api/task',{
            method : 'Get',
        })
        const data = await response.json();
        if(!response.ok){
            console.log('fetching tasks failed!!')
        }else{
            console.log(data,"task data")
            // setTaskResults(data)
            return data;
        }
    }

    const {data, isPending, error} = useQuery({
        queryKey:['tasks'],
        queryFn:fetchTasks,
    })
    // useEffect(()=>{
    //     fetchTasks();
    // },[])

    const handleSubmit =async()=>{
        const response =await fetch('/api/task',{
            method : 'Post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if(!response.ok){
            console.error('error')
        }else{
            setFormData({task :'', description : ''});
            // fetchTasks();
            console.log('added successfully')
        }
    }
    if(isPending){
        return <LoadingComp />
    }
  return (
    <div>
        <div className='flex flex-col gap-8 justify-center items-center w-full h-dvh'>
            <div>
                <span>Task</span>
                <input className='border ' type='text' name='task' value={formData?.task} onChange={handleChange}/>
            </div>
            <div>
                <span>Description</span>
                <input className='border ' type='text' name='description' value={formData?.description} onChange={handleChange} />
            </div>
            <button onClick={handleSubmit}>submit</button>
        </div>
        {data && <div>
                {data.map((task:any)=>{
                    return <div key={task._id}>
                        <div>{task.task}</div>
                        <div>{task.description}</div>
                        </div>
                })}
            </div>}
    </div>
  )
}

export default CreateTaskAndShow