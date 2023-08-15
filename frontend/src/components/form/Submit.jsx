import React from 'react';

export default function Submit({ value }) {
  return <input type="submit" className='bg-blue-600 w-full rounded text-center p-2 font-bold text-white focus:bg-blue-900 hover:bg-blue-500 cursor-pointer' value={value}/>;
}
