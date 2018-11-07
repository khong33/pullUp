const user_controller = require('./userController');


exports.showAbout = (req, res, next) => {
    res.render('about');
}

exports.showLogin = (req, res, next) => {
    res.render('login');
}

exports.attemptLogin = (req, res, next) => {
    user_controller.process_login(req.body);
}
