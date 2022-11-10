import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { TeamsContext } from '../App.jsx';

function CustomActivity(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const totalTeamsArr = useContext(TeamsContext);
  //console.log('state.props', state.props)
  console.log(location.state);

  // const currTeam = totalTeamsArr.filter(obj => obj.teamName === location.state);
  // const [teamInfo, setUpdateTeam] = React.useState(...currTeam);

  const [activity, setActivity] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [participants, setParticipants] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newActivity = {
      team_id: location.state,
      activity: {
        activity,
        type,
        price,
        participants,
      },
    };

    const contextClone = totalTeamsArr;
    console.log('context clone', contextClone);
    contextClone.forEach((team) => {
      if (team.team_id === location.state) {
        team.teamActivities = team.teamActivities.concat(newActivity.activity);
      }
    });
    props.sync(contextClone);

    fetch('db/addActivity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newActivity),
    }).catch((err) => console.log('Err from POST activity:', err));
    navigate('/home');
  };
  return (
    <div className='base-container'>
      <div className='content'>
        <form className='form' onSubmit={handleSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-input-box'
              placeholder='Type your activity here...'
              onChange={(e) => setActivity(e.target.value)}
              value={activity}
            />
            <input
              type='text'
              className='form-input-box'
              placeholder='How many participants for this activity?'
              onChange={(e) => setParticipants(e.target.value)}
              value={participants}
            />
            <select
              id='typeselect'
              onChange={(e) => setType(e.target.value)}
              value={type}
            >
              <option value='' disabled selected>
                Type of Activity
              </option>
              <option value='social'>Social</option>
              <option value='education'>Education</option>
              <option value='cooking'>Cooking</option>
              <option value='charity'>Charity</option>
              <option value='recreational'>Recreational</option>
              <option value='diy'>D.I.Y.</option>
              <option value='music'>Music</option>
              <option value='relaxation'>Relaxation</option>
              <option value='busywork'>Busywork</option>
            </select>
            <select
              id='priceselect'
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            >
              <option value='' disabled selected>
                Price of Activity
              </option>
              <option value={0.0}>Free!</option>
              <option value={0.1}>$</option>
              <option value={0.25}>$$</option>
              <option value={0.5}>$$$</option>
              <option value={0.75}>$$$$</option>
            </select>
          </div>
          <button className='button'>Add Activity</button>
          <Link to='/home'>
            <button className='button'>Back</button>
          </Link>
        </form>
      </div>
    </div>
  );
}
export default CustomActivity;
