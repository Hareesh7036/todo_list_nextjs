import { cn } from '@/lib/utilities/cn';
import { faCircleCheck, faCircleXmark, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

type Props = {
    _id:string;
    task:string;
    description:string;
}

type FormData = {
  task: string;
  description: string;
};

export default function TaskComponent({_id, task, description}: Props) {
    const [isCardOpen, setIsCardOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [inputDescription, setInputDescription] = useState('');
    const queryClient = useQueryClient();


    const handleEdit = () =>{
        setIsEditing(true);
        setInputDescription(description);
    }
    const handleChange = (e :any)=>{
        setInputDescription(e.target.value)
    }

    const updateTask = async (task: FormData ) => {
        const response = await fetch(`/api/task/${_id.toString()}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        });
        if (!response.ok) {
        throw new Error('Updating task failed!');
        }
        return await response.json();
    };
    const updateMutation = useMutation({
        mutationFn: updateTask,
        onSuccess: () => {
        setIsEditing(false)
        queryClient.invalidateQueries({ queryKey: ['tasks'] }); // 🔁 refetch
        },
        onError: (err) => {
        console.error('Error Updating task', err);
        }
    });

    const deleteTask = async () =>{
        const response = await fetch(`/api/task/${_id.toString()}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
        throw new Error('Deleting task failed!');
        }
        return await response.json();
    }

    const deleteMutation = useMutation({
        mutationFn: deleteTask,
        onSuccess:() => {
        queryClient.invalidateQueries({ queryKey: ['tasks'] }); // 🔁 refetch
        },
    })

    const handleSubmit = ()=>{
        updateMutation.mutate({task, description:inputDescription})
    }

    const handleDelete = (e:React.MouseEvent) =>{
        e.stopPropagation();
        deleteMutation.mutate();
    }

  return (
    <div key={_id} className=' rounded-lg p-2 shadow-md shadow-green-600' onClick={()=>setIsCardOpen(!isCardOpen)}>
        <div className='flex justify-between items-center'>
            <div className='font-semibold'>{task}</div>
            <div className='flex gap-3'>
                <div>
                    <FontAwesomeIcon className=' cursor-pointer' icon={faEdit} onClick={handleEdit} />
                </div>
                <div>
                    <FontAwesomeIcon className=' cursor-pointer' icon={faTrash} onClick={handleDelete} />
                </div>
            </div>
        </div>
        <div className={cn('overflow-hidden transition-all duration-500 ease-in-out',isCardOpen || isEditing ?'opacity-100 max-h-52':'max-h-0 opacity-0','transition-[2s]')}>
            {isEditing?
            <div className='flex gap-3 items-center'>
                <input className='border rounded px-3 border-green-500 bg-background' type='text' name='description' value={inputDescription} onChange={handleChange} />
                <FontAwesomeIcon icon={faCircleCheck} className='cursor-pointer' onClick={handleSubmit} />
                <FontAwesomeIcon icon={faCircleXmark} className=' cursor-pointer' onClick={()=>setIsEditing(false)} />
            </div>
            :
            description}
        </div>
    </div>
  )
}