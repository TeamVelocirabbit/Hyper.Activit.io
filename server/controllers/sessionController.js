
//import session schema from separate file
const Session = require('../db/mongo/SessionModel');

const sessionController = {};

sessionController.isLoggedIn = (req, res, next) => {
    console.log("\n");
    // Log to let us know we're in the controller
    console.log("\u001b[1;32m sessionController.isLoggedIn called");

    Session.findOne({ cookieId: req.cookies.ssid }, (err, session) => {
        if (err) {
            return next({
                log: `Error in sessionController.isLoggedIn: ${err}`,
                message: { err: "Error occurred in sessionController.isLoggedIn." },
              });
        } else if (!session) {
            res.redirect('/register');
        } else {
            return next();
        }
    })
};


sessionController.startSession = (req, res, next) => {
    console.log("\n");
  // Log to let us know we're in the controller
  console.log("\u001b[1;32m sessionController.startSession called ");
  
    // console.log('res.locals', res.locals.user.id)
   
    // res.locals.user_info = user;
    Session.create({ cookieId : res.locals.user_info.user_id }, (err, session) => {
        if (err) return next('Error in sessionController.startSession: ' + JSON.stringify(err));
        else return next(
            log: `Error in sessionController.startSession: ${err}`,
            message: { err: "Error occurred in sessionController.startSession." },
        );
    })
}


module.exports = sessionController; 