const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require('./models/User');
const authenticationRoutes = require('./routes/auth')

const ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) return next();
    else res.redirect('/login')
}

const ensureAdminAccess = function (req, res, next) {
    if (req.isAuthenticated() && req.user.role === 'ADMIN') return next()
    else res.send({message: 'access denied'})
    //else res.redirect('/login')
}

const ensureManagerAccess = function (req, res, next) {
    if (req.isAuthenticated() && req.user.role === 'ADMIN' || req.user.role === 'MANAGER') return next()
}

module.exports = {
    ensureAuthenticated,
    ensureAdminAccess,
    ensureManagerAccess
}