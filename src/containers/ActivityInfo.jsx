import React, { useContext } from 'react';
import { TeamsContext } from '../App.jsx';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const ActivityInfo = (props) => {
  // useNavigate hook to help redirect pages
  const navigate = useNavigate();
  // useLocation hook to help keep state/props from Link before
  const location = useLocation();
  const totalTeamsArr = useContext(TeamsContext);

  // Initial state set to current activities props with associated team information
  // location.state is passed in from ActivityCard =
  const [currActivity, setCurrActivity] = React.useState(location.state);
  console.log('currActivity props', currActivity);

  const deleteActivity = () => {
    // Alex:Backend DELETE functionality
    console.log('Deleting activity and returning home');
    // Find current team in our context data to remove activity
    const teamsContextClone = [...totalTeamsArr];
    let targetedAct;
    for (const team of teamsContextClone) {
      if (team.teamName === currActivity.teamName) {
        for (let i = 0; i < team.teamActivities.length; i++) {
          // loop through team activities array
          // this method is used because the currActivity.activity object is not strictly equal to the team.teamActivities[i] object
          // thus indexOf cannot be used here, as it will return a -1 since there are no matches in the teamActivities array
          if (
            // if activity in team array is equal to activity in current activity object
            team.teamActivities[i].activity === currActivity.activity.activity
          )
            // remove targeted activity from team array and store it in targetedArray variable to send to server to delete
            targetedAct = team.teamActivities.splice(i, 1);
        }
        console.log('targetedAct', targetedAct[0].activity);
        console.log('teamID', team.team_id);
        // Harvey: Send delete request to server to delete targeted card
        fetch('/db/deleteActivity', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            activityName: targetedAct[0].activity, // 'Go to a local thrift shop'
            teamId: team.team_id, // 'zqzxiwogk0bi6y4lyo6xsm'
          }),
        }).catch((err) => console.log(err));
        break;
      }
    }

    alert('Deleted activity!');
    props.sync(teamsContextClone);
    navigate('/home');
  };

  // Price tag
  //looked through activites and these seem like good breakpoints
  let price;
  const activityPrice = currActivity.activity.price;
  if (currActivity.activity.price === 0) price = 'Free!';
  if (activityPrice > 0 && activityPrice < 0.2) price = '$';
  if (activityPrice >= 0.2 && activityPrice < 0.4) price = '$$';
  if (activityPrice >= 0.4 && activityPrice < 0.6) price = '$$$';
  if (activityPrice >= 0.6 && activityPrice <= 0.8) price = '$$$$';

  // Mapping team members
  const friendsArr = currActivity.teamMembers.map((name) => (
    <li key={name}>{name}</li>
  ));

  return (
    <div className='flex-column flex-center activity-info container-card'>
      <h1>{currActivity.activity.activity}</h1>
      <h2>Price: {price}</h2>
      <h2>Type: {currActivity.activity.type}</h2>
      <div className='flex-column list'>
        <h2>Team: {currActivity.teamName}</h2>
        <h2>People i'm going with</h2>
        <div className='list'>{friendsArr}</div>
        <div>
          <Link to='/home'>
            <button
              className='button'
              onClick={() => {
                console.log('Going from Activity to Home');
                navigate('/home');
              }}
            >
              Go Back
            </button>
          </Link>
          <button className='button align-self-end' onClick={deleteActivity}>
            Delete Activity
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityInfo;
