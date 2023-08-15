import React from 'react'
import { BsFillSunFill } from "react-icons/bs"
import { Link } from 'react-router-dom'
import { useTheme } from '../../hooks'
import Container from '../Container'
import CustomLink from '../CustomLink'

export default function Navbar() {
  const { toggleTheme } = useTheme();
  return (
    <div className="bg-secondary shadow-sm shadow-grey-500">
        <Container className="p-2">
          <div className="flex justify-between items-center">
            <Link to="/">
          <img src="/favicon.ico" alt='logo' />
            </Link>

          <ul className="flex items-center">
            <li>
              <button onClick={toggleTheme} className="bg-dark-subtle p-1 rounded mr-3">
                <BsFillSunFill className="text-white" size={30} />
              </button>
            </li>
            <li>
              <input type="text" className='border-2 text-white border-dark-subtle p-1 rounded bg-transparent text-xl outline-none focus:border-white mr-3' placeholder='Search' />
            </li>
            <li className='text-white font-semibold text-lg'>
              <CustomLink to="/sign-in">Login</CustomLink>
            </li>
          </ul>
          </div>
        </Container>
    </div>
  )
}
