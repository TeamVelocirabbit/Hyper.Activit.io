const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) => {
    console.log("\n");
    console.log("\u001b[1;32m cookieController.setSSIDCookie called ");

    console.log('Setting cookies, res.locals.user_info:', res.locals.user_info.user_id)
    res.cookie('ssid', res.locals.user_info.user_id, {httpOnly: true});
    
    return next();
}

module.exports = cookieController; 
