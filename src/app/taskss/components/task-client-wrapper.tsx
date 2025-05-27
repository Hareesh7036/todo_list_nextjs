
'use client'
import React from 'react';
import TaskForm from '../form';
import AllTasks from './all-tasks';


const CreateTaskAndShow = () => {
  return (
    <div className='flex gap-5'>
        <TaskForm />
        <AllTasks />   
    </div>
  )
}

export default CreateTaskAndShow