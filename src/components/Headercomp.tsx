import { ThemeToggle } from '@/lib/utilities/theme-toggle';
import { faFeather } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

type Props = {}

const Headercomp = (props: Props) => {
  return (
    <div className=' fixed w-full flex items-center justify-center h-[80px] shadow-md shadow-green-600 z-[1000] bg-background'>
        <div className='flex items-end gap-3'>
            <div className=' font-bold text-[25px]'>TodoNest</div> 
            <FontAwesomeIcon icon={faFeather} style={{height:'40px'}} color='green' />
        </div>
        {process.env.NODE_ENV === 'development' && <div className="absolute z-50 top-4 right-4">
                <ThemeToggle />
              </div>}
    </div>
  )
}

export default Headercomp