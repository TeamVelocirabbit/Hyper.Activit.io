import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCookies } from "react-cookie";

function SignoutButton() {
  const location = useLocation();
  if (location.pathname === '/') return null;
  // function handleRemoveCookie() {
  // removeCookie() wasn't found
  //   removeCookie('token', { path: '/' });
  // }
  return (
    // <div className='signout-button'>
    <Link to='/' className='signout-button-link'>
      <button className='signout-button button'
        onClick={() => {
          //// cookies is not defined and so was handleRemoveCookie()
          // console.log(`Cookie: ${JSON.stringify(cookies.token)}`)
          // handleRemoveCookie();
          // Adding localStorage to deal with session data
          console.log('Removing localStorage authentication:', localStorage.getItem('loginAuthenticated'));
          window.localStorage.clear();
        }}>
        Sign Out
      </button>
    </Link>
    // </div>
  )
}

export default SignoutButton;
