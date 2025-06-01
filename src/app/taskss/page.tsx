import React from 'react'
import TaskForm from './form'
import AllTasks from './components/all-tasks'

export default function TaskMain() {

  return (
    <div className='flex gap-5'>
        <TaskForm />
        <AllTasks />   
    </div>
  )
}