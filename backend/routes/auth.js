/* user authentication routes */

const express = require('express')
const mongoose = require("mongoose");
const cors = require('cors');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const User = require('./../models/User')
const router = express.Router();

router.use(session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
}))

router.use(passport.initialize());
router.use(passport.session());
router.use(express.json());
router.use(cors());
router.use(express.urlencoded({extended: false}));

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(function (user, done) {
    done(null, user);
})

passport.deserializeUser(function (user, done) {
    done(null, user);
})

router.get("/login", (req, res) => {
    res.status(200).send({message: "in login"});
})

router.post("/login", passport.authenticate('local', {
    successRedirect: "/profile",
    failureRedirect: "/login"
}))

router.get('/profile', (req, res) => {
    res.send({message: 'success'})
})

router.post("/register", (req, res) => {
    console.log(req.body)
    User.register(new User({
        username: req.body.username,
        role: req.body.role
    }), req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            res.send({message: "could not register"});
        }else{
            res.send({message: "user registered"});
        }
    })
})

const ensureAuthenticated = function () {};
const ensureAdmin = function () {};
const ensureManager = function () {};

module.exports = router;