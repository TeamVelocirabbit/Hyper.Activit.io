const express = require('express');
const dbController = require('../controllers/dbController.js');
const cookieController = require('../controllers/cookieController.js');
const sessionController = require('../controllers/sessionController.js')
const router = express.Router();
const cors = require('cors');
// Figure out what sort of get requests may be necessary


//// GET routes ////
// Route to request/return user data
router.get('/user/:username', dbController.getUserInfo, (req, res) => {
  return res.status(200).json(res.locals.user_info);
});

// Route to get/return specific team's information
router.get('/teaminfo/:team_id', dbController.getTeamInfo, (req, res) => {
  return res.status(200).json(res.locals.team_info);
});


//// POST routes ////
// Route to verify user on login/return boolean

router.post('/login', dbController.verifyUser, sessionController.startSession, cookieController.setSSIDCookie, (req, res) => {
  return res.status(200).json({login_success: true});
});

// Route to add a new user to the database
router.post('/register', dbController.createUser,  (req, res) => {
  return res.status(200).json(res.locals.register_response);
});

// Route to add a new team to the database
router.post('/team', dbController.createTeam, dbController.updateUser, (req, res) => {
  console.log('Logging res.locals.team inside of router', res.locals.team);
  return res.status(200).json(res.locals.team);
});

// Route to add activity to a specific team
router.post('/addActivity', dbController.addActivity, (req, res) => {
  return res.status(200).json(res.locals.team_info);
})

//// PUT routes ////
// Check in frontend on what data type/edits they'll be sending
router.put('/editActivity', dbController.editActivity, (req, res) => {
  return res.status(200).json({update: 'Activity updated'});
})

router.put('/editTeam', dbController.editTeam, (req, res) => {
  return res.status(200).json({update: 'Team updated'});
})

//// DELETE routes ////
// Delete team
router.delete('/deleteTeam/', dbController.deleteTeam, dbController.deleteTeamFromUser, (req, res) => {
  return res.status(200).json({deleted: 'Delete team successful'});
})

// Delete activity from team
router.delete('/deleteActivity', dbController.deleteActivity, (req, res) => {
  return res.status(200).json({deleted: res.locals.updatedTeam});
})

router.delete('/deleteUser/:username', dbController.deleteUser, (req, res) => {
  return res.status(200).json({deleted: 'User deleted'});
})

module.exports = router;