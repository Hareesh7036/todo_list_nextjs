
import { cn } from '@/lib/utilities/cn';
import { faCircleCheck, faCircleXmark, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { deleteTask, updateTask } from '../actions';
import FontAwesomeIconWrapper from '@/lib/utilities/font-awsom-wrapper';
import { useRouter } from 'next/navigation';
import { TaskResult } from '../schema';

type Props = {
    _id:string;
    task:string;
    description:string;
    index:number;
}
export default function TaskComponent({_id, task, description, index}: Props) {
    const [isCardOpen, setIsCardOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [inputDescription, setInputDescription] = useState('');
    const queryClient = useQueryClient();
    const router = useRouter();


    const handleEdit = () =>{
        setIsEditing(true);
        setInputDescription(description);
    }
    const handleChange = (e :any)=>{
        setInputDescription(e.target.value)
    }

    
    const updateMutation = useMutation({
        mutationFn:async ({_id, task, description}: TaskResult)=>{
            try{
                return updateTask({_id, task, description})
            }catch (err: any) {
            if (err.message === 'Unauthorized') {
                router.push('/auth/login');
            }
            throw err;
            }
        },
        onSuccess: () => {
        setIsEditing(false)
        queryClient.invalidateQueries({ queryKey: ['tasks'] }); // 🔁 refetch
        },
        onError: (err) => {
        console.error('Error Updating task', err);
        }
    });


    const deleteMutation = useMutation({
        mutationFn: async (_id:string)=>{
           try{
             return deleteTask(_id)
           }catch (err: any) {
            if (err.message === 'Unauthorized') {
                router.push('/auth/login');
            }
            throw err;
            }
        },
        onSuccess:() => {
        queryClient.invalidateQueries({ queryKey: ['tasks'] }); // 🔁 refetch
        },
    })

    const handleSubmit = ()=>{
        updateMutation.mutate({_id, task, description:inputDescription})
    }

    const handleDelete = (e:React.MouseEvent) =>{
        e.stopPropagation();
        deleteMutation.mutate(_id);
    }

  return (
    <div key={_id} className=' rounded-lg p-2 shadow-md shadow-green-600' onClick={()=>setIsCardOpen(!isCardOpen)} title='Click to view Description'>
        <div className='flex justify-between items-center'>
            <div className='font-semibold flex gap-1'>
                <span>{index + 1}.</span>
                <span>{task}</span>
            </div>
            <div className='flex gap-3'>
                <div>
                    <FontAwesomeIconWrapper className=' cursor-pointer' icon={faEdit} onClick={handleEdit} title='Edit' />
                </div>
                <div>
                    <FontAwesomeIconWrapper className=' cursor-pointer' icon={faTrash} onClick={handleDelete} title='Delete' />
                </div>
            </div>
        </div>
        <div className={cn('overflow-hidden transition-all duration-500 ease-in-out',isCardOpen || isEditing ?'opacity-100 max-h-52':'max-h-0 opacity-0','transition-[2s]')}>
            {isEditing?
            <div className='flex gap-3 items-center'>
                <input className='border rounded px-3 border-green-500 bg-background w-full m-[1px]' type='text' name='description' value={inputDescription} onChange={handleChange} />
                <FontAwesomeIconWrapper icon={faCircleCheck} className='cursor-pointer' onClick={handleSubmit} title='Submit' />
                <FontAwesomeIconWrapper icon={faCircleXmark} className=' cursor-pointer' onClick={()=>setIsEditing(false)} title='Cancel' />
            </div>
            :
            description}
        </div>
    </div>
  )
}