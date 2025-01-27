import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TeamsContext } from '../App.jsx';
import NewMemberEntry from '../components/NewMemberEntry.jsx';
import CreateMemberButtons from '../components/CreateMemberButtons.jsx';

function CreateTeam(props) {
  const navigate = useNavigate();
  const totalTeamsArr = useContext(TeamsContext);
  const [teamName, setTeamName] = React.useState('');

  // State to track how many teammates you have
  const [memberLength, setMemberLength] = React.useState(1);
  const [memberEntries, setMemberEntries] = React.useState([]);

  //////////////////////////////////
  //// Modifying Member Entries ////
  //////////////////////////////////
  // No HTTP request here. Just state changes for member input rendering purposes.
  const addMember = () => {
    console.log('adding Member');
    setMemberEntries(
      [...memberEntries].concat(<NewMemberEntry memberNum={memberLength + 1} />)
    );
  };

  const deleteMember = () => {
    if (!memberEntries.length) console.log('No new members to delete');
    else {
      console.log('Removing member entry');
      const memberClone = memberEntries.slice(0, -1);
      setMemberEntries(memberClone);
    }
  };

  const createTeam = (formData) => {
    console.log('Team ID + Members deposited into DB');
    const teamName = formData.target[0].value;
    // Turned NodeList into Arr so we can use methods map
    const newMembersArr = [...document.querySelectorAll('.new-members')].map(
      (node) => node.value
    );
    console.log(`
      Team: ${teamName}
      NewMembers: ${newMembersArr}
    `);
    let newTeam = {
      teamName,
      teamMembers: [props.username].concat(newMembersArr),
      teamActivities: [],
    };;
    // POST
    fetch('/db/team', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: props.username,
        teamName: newTeam.teamName,
        teamMembers: newTeam.teamMembers,
      }),
    })
      .then(res => res.json())
      .then(team => {
        console.log('Team information:', team)
        // Update higher state DB
        newTeam.team_id = team.team_id,
        props.sync([...totalTeamsArr].concat(newTeam));
      })
      .catch((err) => console.log(err));

    // Alert that team has been created
    alert(`Team ${teamName} has been created!`);
    setMemberLength(1);
    setMemberEntries([]);
    formData.target.reset();
    navigate('/home');
  };

  return (
    <div className='create-team flex-column flex-center container-card'>
      <h1>Create Team</h1>
      <form
        className='form flex-column'
        onSubmit={(e) => {
          console.log('Team Creation Submitted!');
          e.preventDefault();
          createTeam(e);
        }}
      >
        <div>
          <label for='name'>Team name:</label>
          <input
            required
            id='team-name'
            className='form-input-box'
            type='text'
            onChange={() =>
              setTeamName(document.querySelector('#team-name').value)
            }
          ></input>
        </div>
        <div id='members-container'>
          <label for='member'>Member 1</label>
          <input
            required
            readOnly
            unselectable='on'
            id='member1'
            className='form-input-box'
            type='text'
            value={props.username}
          ></input>
        </div>
        {memberEntries}
        <CreateMemberButtons
          memberLength={memberLength}
          memberEntries={memberEntries}
          setMemberLength={setMemberLength}
          addMember={addMember}
          deleteMember={deleteMember}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link to='/home'>
            <button className='button'>Cancel</button>
          </Link>
          <input
            className='button align-self-end'
            type='submit'
            value='Create'
          ></input>
        </div>
      </form>
    </div>
  );
}

export default CreateTeam;
