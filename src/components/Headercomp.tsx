import { faFeather } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

type Props = {}

const Headercomp = (props: Props) => {
  return (
    <div className=' fixed w-full flex items-center justify-center h-[80px] shadow-[0_10px_5px_-5px_rgba(0,0,0,0.1)] z-[1000] bg-white'>
        <div className='flex items-end gap-3'>
            <div className=' font-bold text-[25px]'>Todo List</div> 
            <FontAwesomeIcon icon={faFeather} style={{height:'40px'}} color='green' />
        </div>
    </div>
  )
}

export default Headercomp