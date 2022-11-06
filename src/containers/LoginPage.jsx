import React from 'react';
import LoginButtons from '../components/LoginButtons.jsx';
import RegisterButtons from '../components/RegisterButtons.jsx';
import LogIn from '../components/LogIn.jsx';
import Register from '../components/Register.jsx';
import axios, { AxiosHeaders } from 'axios';

const LoginPage = () => {
  // Boolean flag for conditional rendering
  const [accountCreation, setAccountCreation] = React.useState(false);
  // Access current user/pw state here. Updates w/useState so dont need to query
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [login_success, setLoginSuccess] = React.useState(false);

  ////////////////////////////////
  ////// Handler Functions //////
  ////////////////////////////////
  // Swap Register/Login flag for conditional rendering
  function registerPage() {
    clearFields();
    setAccountCreation(!accountCreation);
  }

 
  // Registration Body
  function registerAccount() {
    console.log('Registering Account!\n' + 'Username:', username, '\nPassword:', password);
    clearFields();
    // Alex:Backend Submit POST request with <username> and <password>

    // Ahsan: Backend Work
    // Send POST request to backend with username and password
    // Backend will check if username is valid and, if so, will add to database
    // If valid, will return true, else false
    const serverResponse = axios.post('/db/register', {
      username,
      password
    })
    .then((response) => {
      return response.register_response;
    })

    console.log('Server Response: ', serverResponse);
    return serverResponse;
  }
  // Clear User/PW fields
  function clearFields() {
    document.querySelector('#username').value = '';
    document.querySelector('#password').value = '';
  }

  // Conditional Rendering on Login/Register
  const greeting = !accountCreation
    ? <LogIn />
    : <Register />

  const landingButtons = !accountCreation
    ? <LoginButtons
      swapRegister={registerPage}
      username={username}
      password={password} />
    : <RegisterButtons
      swapLogin={registerPage}
      registerAccount={registerAccount} />
const handleSubmit = (e) => {
  e.preventDefault();
}

  return (
    <div>
      <h1>Wonderpuss Says Hello!</h1>
      {greeting}
      <form onSubmit={handleSubmit}>
        <p>
          Username:
          <input
            id='username'
            type='text'
            onChange={() => setUsername(document.querySelector('#username').value)}
          >
          </input>
        </p>
        <p>
          Password:
          <input
            id='password'
            type='password'
            onChange={() => setPassword(document.querySelector('#password').value)}
          >
          </input>
        </p>
        {landingButtons}
      </form>
    </div>
  )
}

export default LoginPage;