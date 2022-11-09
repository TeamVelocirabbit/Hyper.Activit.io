import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { TeamsContext } from '../App.jsx';


function CustomActivity () {

  const navigate = useNavigate();
  const location = useLocation();
  const totalTeamsArr = useContext(TeamsContext);
  //console.log('state.props', state.props)
  console.log(location.state)
 
  // const currTeam = totalTeamsArr.filter(obj => obj.teamName === location.state);
  // const [teamInfo, setUpdateTeam] = React.useState(...currTeam);

  const [activity, setActivity] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [participants, setParticipants] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();

    fetch('db/addActivity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "team_id": location.state,
        "activity": {
          activity: activity,
        }
      })
    })
      .then(res => res.json)
      .then(data => console.log('post data', data))
      .catch(err => console.log('Err from POST activity:', err))
  };
  return (
    <div className= "base-container">
      <div className='content'>
        <form className='form' onSubmit={handleSubmit}>
          <div className='form-group'>
            <input 
              type="text"
              className='form-input-box'
              placeholder='Type your activity here...'
              onChange={(e) => setActivity(e.target.value) } 
              value={activity}
            /> 
          </div>
          <button className='button'>Add Activity</button>
          <Link to='/home'>
            <button className='button'>Cancel</button>
          </Link>
        </form>
      </div>
    </div>
  )
}
export default CustomActivity;