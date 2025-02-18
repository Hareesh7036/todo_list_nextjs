'use client'
import React, { useEffect, useState } from 'react'

type Props = {}

const SearchItem = (props: Props) => {
    const [searchText, setSearchText] = useState('');
    const [filteredTasks, setFilteredTasks] = useState([]);

    useEffect(()=>{
        let timer;

        timer=setTimeout(()=>{
            fetchTasks();
        },400)

        return ()=>clearTimeout(timer);

    },[searchText])

    const fetchTasks = async()=>{
        const response = await fetch('/api/task',{
            method : 'Get',
        })
        const data = await response.json();
        if(!response.ok){
            console.log('fetching tasks failed!!')
        }else{
            console.log(data,"task data")
            const filteredData= data.filter((task:any)=> task.task.includes(searchText) || task.description.includes(searchText));
            console.log(filteredData);
            setFilteredTasks(filteredData);
        }
    }
  return (
    <div>
        <div className='flex justify-center m-11'>
            <input type="text" value={searchText} onChange={(e)=>setSearchText(e.target.value)} style={{border:'2px solid black', borderRadius:'4px'}}/>
        </div>
        {!!filteredTasks.length && <div>
            {filteredTasks?.map((task:any)=>{
                return <div key={task._id} className='flex justify-center'>
                    <span>task : {task.task}</span>
                    <span>description : {task.description}</span>
                </div>
            })}
            </div>}
    </div>
  )
}

export default SearchItem;