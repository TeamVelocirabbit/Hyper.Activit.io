import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginButtons = (props) => {
  // Navigate hook for login conditional
  const navigate = useNavigate();
  const handleClick = () => {

    fetch('/db/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: props.username, password: props.password })
    })
      .then(res => res.json())
      .then(data => {
        console.log('Login response: ', data.login_success);

        if (data.login_success === true) {
          console.log('login data', data)
          console.log('Set user function def from Buttons', props.setUser(props.username))
          props.setUser(props.username)
          localStorage.setItem('loginAuthenticated', props.username)
          return navigate('/home', { state: props.username });
        }
      })
      .catch(err => {
        console.error('Error: ', err);
        return alert('Login failed');
      });

  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Link>
        <button className='button' onClick={props.swapRegister}>
          Register
        </button>
      </Link>


      <button className='button' onClick={handleClick}>
        Login
      </button>

    </div>
  )
}

export default LoginButtons;