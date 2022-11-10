import { Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import React, { useEffect, createContext } from 'react';

import LoginPage from './containers/LoginPage.jsx';
import HomeButton from './components/HomeButton.jsx';
import SignoutButton from './components/SignoutButton.jsx';
import DeleteAccount from './components/DeleteAccount.jsx';
import Home from './containers/Home.jsx';
import CreateTeam from './containers/CreateTeam.jsx';
import TeamInfo from './containers/TeamInfo.jsx';
import ActivityInfo from './containers/ActivityInfo.jsx';
import CustomActivity from './containers/CustomActivity.jsx';

export const TeamsContext = React.createContext(null);

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log('location state - username:', location.state);
  // Initialize state to be array of teams w/associated activities
  const [userData, setUserData] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState(location.state);

  // Goal: Pass setUserData to be invoked with fetched data anytime new data is created
  function syncStatetoDB(data) {
    console.log('Updating state with DB change');
    setUserData(data);
  }

  function syncUser(username) {
    console.log('Succesful login, setting current user:', username);
    setCurrentUser(username);
  }

  // useEffect like componentDidMount - One time call
  useEffect(() => {


    const asyncFn = async () => {
      console.log('Current user', currentUser);
      const fetchedUserTeams = await fetch(`/db/user/${currentUser}`);
      const data = await fetchedUserTeams.json();
      console.log(data); // user data comes back as an array containing an object

      // Fetch team info for each team
      // Make an array of promises using the team_id's fetches
      // iterate over data.teams which is an array
      const fetchedTeams = [];
      // object.values
      console.log('data: ', data);
      console.log('TeamName:', Object.values(data[0].teams)[0]);
      for (let team_id of Object.keys(data[0].teams)) {
        // console.log('team_id:', team_id);
        const teamInfo = await fetch(`/db/teaminfo/${team_id}`);
        const teamData = await teamInfo.json();
        // console.log('teamData: ', teamData);
        fetchedTeams.push(teamData);
      }
      console.log('fetchedTeams:', fetchedTeams);

      const arrOfFetchedTeams = fetchedTeams.map((arrObj) => arrObj[0]);
      console.log('arr of team objs', arrOfFetchedTeams);
      setUserData(arrOfFetchedTeams);
    };
    asyncFn();
    if (window.localStorage.getItem('loginAuthenticated')){
      syncUser(window.localStorage.getItem('loginAuthenticated'))
      return navigate('/home', { state: localStorage.getItem('loginAuthenticated') });
    }
  }, [currentUser]);

  return (
    <TeamsContext.Provider value={userData}>
      <div className='main-app flex-column flex-center'>
        <div id='navbar'>
          <HomeButton />
          <SignoutButton />
        </div>
        <Routes>
          <Route path='/' element={<LoginPage setUser={syncUser} />} />
          <Route path='/home' element={<Home />} />
          <Route path='/customActivity' element={<CustomActivity sync={syncStatetoDB} username={currentUser}/>} />
          <Route
            path='/createTeam'
            element={<CreateTeam sync={syncStatetoDB} username={currentUser} />}
          />
          <Route path='/teamInfo' element={<TeamInfo sync={syncStatetoDB} />} />
          <Route
            path='/activities'
            element={<ActivityInfo sync={syncStatetoDB} />}
          />
        </Routes>
          <DeleteAccount username={currentUser} sync={syncStatetoDB} />
      </div>
    </TeamsContext.Provider>
  );
}

export default App;
