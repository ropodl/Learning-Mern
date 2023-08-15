import React from 'react';
import { Link } from 'react-router-dom';

export default function CustomLink({to,children}) {
  return <Link to={to} className='dark:hover:text-gray-300 dark:text-white text-secondary hover:text-gray-700 transition'>{children}</Link>;
}
