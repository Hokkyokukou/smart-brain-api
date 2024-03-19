// Modules
const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

//Controllers Modules
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        // port: 3306,
        user: 'postgres',
        password: 'postgres',
        database: 'smart-brain',
    },
});

// db.select('*')
//     .from('users')
//     .then((data) => {
//         console.log(data);
//     });

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json()); //bodyparser

app.get('/', (req, res) => {res.send(database.users)})
app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register', (req, res) => {
    register.handleRegister(req, res, db, bcrypt);
});
app.get('/profile/:id', (req, res) => {
    profile.handleProfileGET(req, res, db);
});
app.put('/image', (req, res) => {
    image.handleImage(req, res, db);
});

app.listen(3000, () => {
    console.log('app is running on port 3000');
});

/**
 * / --> res = this is working
 * /signin  --> POST = success/fail
 * /register --> POST = user
 * /profile/:userId --> GET = user
 * /image --> PUT --> user
 */
