import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function DeleteAccount(username) {
  const navigate = useNavigate();
  const location = useLocation();
  if (location.pathname === '/') return null;
  function deleteAcc() {
    console.log('username', username.username);
    if (confirm('Are you sure you want to delete your account?')) {
      fetch(`/deleteUser/${username.username}`, {
        method: 'DELETE',
      }).catch((err) => console.log(err));
      alert('Account has been deleted!');
      navigate('/');
    } else {
      alert('Good, stay... forever..');
    }
  }
  return (
    <div className='delete-account-button'>
      <button
        className='del-acc-button button'
        onClick={() => {
          deleteAcc();
        }}
      >
        Delete Account
      </button>
    </div>
  );
}

export default DeleteAccount;
