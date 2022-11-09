const cookieController = {};

cookieController.setCookie = (req, res, next) => {
    res.cookie('testing cookies', 'do you see me');
    return next();
}

cookieController.setSSIDCookie = (req, res, next) => {
    console.log('in set SSID')
    res.cookie('ssid', res.locals.user.id, {httpOnly: true});
    return next();
}

module.exports = cookieController; 
