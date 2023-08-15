import React from 'react'

export default function Title({children}) {
  return (
    <div className='text-xl text-secondary dark:text-white  font-semibold text-center mb-3'>
        {children}
    </div>
  )
}
