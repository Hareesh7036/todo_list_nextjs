import { cn } from '@/lib/utilities/cn';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

type Props = {
    _id:string;
    task:string;
    description:string;
}

export default function TaskComponent({_id, task, description}: Props) {
    const [isCardOpen, setIsCardOpen] = useState(false);
  return (
    <div key={_id} className=' rounded-lg p-2 shadow-md shadow-green-600' onClick={()=>setIsCardOpen(!isCardOpen)}>
        <div className='flex justify-between items-center'>
            <div className='font-semibold'>{task}</div>
            <div>
                <FontAwesomeIcon icon={faTrash} />
            </div>
        </div>
        <div className={cn('overflow-hidden transition-all duration-500 ease-in-out',isCardOpen?'opacity-100 max-h-52':'max-h-0 opacity-0','transition-[2s]')}>{description}</div>
    </div>
  )
}