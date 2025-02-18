import React from 'react'

type Props = {
  demoProp:string
}

const DemoComp = (props: Props) => {
  return (
    <div className='flex flex-wrap justify-center items-center w-full h-lvh'>
      <p>{props.demoProp}</p>
      <button className='bg-slate-500 rounded-md border-none font-bold text-white pl-5 pr-5'>normal button</button>
    </div>
  )
}

export default DemoComp