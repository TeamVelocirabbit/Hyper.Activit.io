
//import session schema from separate file
const Session = require('../db/mongo/SessionModel');

const sessionController = {};

sessionController.isLoggedIn = (req, res, next) => {
  console.log("\n");
  // Log to let us know we're in the controller
  console.log("\u001b[1;32m sessionController.isLoggedIn called");
  console.log('dummy log')
  console.log('Current req.cookieId: req.cookies.ssid', req.cookies.ssid);
  Session.findOne({ cookieId: req.cookies.ssid }, (err, session) => {
    console.log('session findOne', session)
    if (err) {
      return next({
        log: `Error in sessionController.isLoggedIn: ${err}`,
        message: { err: "Error occurred in sessionController.isLoggedIn." },
      });
    } else if (!session) {
      console.log('Session has expired, please log in again');
      return res.redirect('/');
    } else {
      console.log('Session is alive, lets go');
      return res.redirect('http://localhost:8080/');
    }
  })
};


sessionController.startSession = (req, res, next) => {
  // Log to let us know we're in the controller
  console.log("\n");
  console.log("\u001b[1;32m sessionController.startSession called ");
  console.log('Login success:', res.locals.login_success);

  if (res.locals.login_success) {
    Session.create({ cookieId: res.locals.user_info.user_id }, (err, session) => {
      if (err) return next('Error in sessionController.startSession: ' + JSON.stringify(err));
      console.log('Storing session:', session);
      return next();
    })
  } else {
    return next({
      log: 'There has been an error starting the session:' + err,
      message: { err: 'There has been an error starting the session:' + err },
    })
  }
}


module.exports = sessionController; 