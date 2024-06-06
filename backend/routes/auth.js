/* user authentication routes */

const express = require('express')
const mongoose = require("mongoose");
const cors = require('cors');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const User = require('./../models/User')
const app = express();

app.use(session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(function (user, done) {
    done(null, user);
})

passport.deserializeUser(function (user, done) {
    done(null, user);
})

app.post("/login", passport.authenticate('local', {
    successRedirect: "/profile",
    failureRedirect: "/login"
}))

app.post("/register", (req, res) => {
    console.log(req.body)
    User.register(new User({
        username: req.body.username,
        email: req.body.role
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