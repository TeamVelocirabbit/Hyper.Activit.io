import React from 'react'
import TotalTeamDisplay from '../components/TotalTeamDisplay.jsx';
import TotalActivityDisplay from '../components/TotalActivityDisplay.jsx';

function Home() {
  const date = new Date();
  const hour = date.getHours();
  let greeting;
  console.log('hour', hour)
  if (hour >= 5 && hour < 12) greeting = 'Good morning,';
  if (hour >= 12 && hour < 17) greeting = 'Good afternoon,';
  if (hour >= 17 && hour < 22) greeting = 'Good evening,';
  if (hour >= 22 || hour < 5) greeting = 'Late night huh,';

  return (
    <div className='main-column flex-column flex-center home '>
      <h1>{greeting} <span id="user-greeting">{window.localStorage.getItem('loginAuthenticated')}</span></h1>
      <TotalTeamDisplay />
      <h1>Choose an activity!</h1>
      <TotalActivityDisplay />
    </div>
  )
}

export default Home;
