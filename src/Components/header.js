import React, { useState } from 'react';
import Logo from '../Images/logo.png';
import './header.css';
import { Link } from 'react-router-dom';

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const token = localStorage.getItem('token');

  return (
    <div>
      <nav className='header'>
        <Link to='/Home'>
          <img src={Logo} alt='Logo' className='header-logo' />
        </Link>

        <button className='hamburger' onClick={() => setShowMenu(!showMenu)}>
          ☰
        </button>

        <ul className={`header-list ${showMenu ? 'show-menu' : ''}`}>

        <Link to='/Doctors'>
          <li className='header-list-item'>Doctors</li>
        </Link>  

        <Link to='/Services'>
          <li className='header-list-item'>Services</li>
        </Link>

          <Link to='/Aboutus'>
          <li className='header-list-item'>About Us</li>
        </Link>
          
        

          {token ? (
            <Link to='/Dashboard'>
            <li className='header-list-item'>My Profile</li>
            </Link>
          ) : (
            <Link to='/Signup'>
              <button className='signup-button'>Sign Up</button>
            </Link>
          )}

        </ul>
      </nav>
    </div>
  );
}
