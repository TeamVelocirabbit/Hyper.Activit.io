const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) => {
    console.log("\n");
    console.log("\u001b[1;32m cookieController.setSSIDCookie called ");
    res.cookie('ssid', res.locals.user_info, {httpOnly: true});
    return next();
}

module.exports = cookieController; 
