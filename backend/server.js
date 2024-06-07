require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')
const PORT = process.env.PORT
const CONNECTION_STR = process.env.MONGODB_STR


/* modals */

const User = require('./models/User')
const authenticationRoutes = require('./routes/auth')

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', authenticationRoutes)

mongoose.connect(CONNECTION_STR)
    .then(() => {
        console.log('connected to database');
        app.listen(PORT, () => {
            console.log(`app is listeting to port: ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(error);
    })