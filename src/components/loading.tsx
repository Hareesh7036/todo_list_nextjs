import React from 'react'

type Props = {}

const LoadingComp = (props: Props) => {
  return (
    <div className='fixed top-1/2 left-1/2 '>
        <div>
            Loading....
        </div>
    </div>
  )
}

export default LoadingComp;