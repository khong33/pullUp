const userController = require('./userController');


exports.showAbout = (req, res, next) => {
    res.render('about');
}

exports.showLogin = (req, res, next) => {
    res.render('login');
}

exports.attemptLogin = (req, res, next) => {
    userController.process_login(req.body);
}
