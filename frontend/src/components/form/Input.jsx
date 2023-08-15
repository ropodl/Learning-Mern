import React from 'react'

export default function Input({name,placeholder,...rest}) {
  return (
    <div className='mb-3'>
      <input id={name} name={name} className="dark:text-white bg-transparent rounded border-2 dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary text-lg outline-none w-full p-2" placeholder={placeholder} {...rest}/>
    </div>
  )
}
