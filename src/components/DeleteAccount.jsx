import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function DeleteAccount(props) {
  const navigate = useNavigate();
  const location = useLocation();
  if (location.pathname === '/') return null;
  // deleteAcc invoked when user clicks on deleteAccount button
  function deleteAcc() {
    if (confirm('Are you sure you want to delete your account?')) {
      // delete account if user confirms the prompt message
      fetch(`/db/deleteUser/${props.username}`, {
        method: 'DELETE',
      }).catch((err) => console.log(err));
      alert('Account has been deleted!');
      // redirect to root path
      props.sync([]);
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
