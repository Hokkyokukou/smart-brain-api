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
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false},
        host: process.env.DATABASE_HOST,
        port: 5432,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DB,
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

app.get('/', (req, res) => {
    res.send(database.users);
});
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
app.post('/imageurl', (req, res) => {
    image.handleApiCall(req, res);
});

export default function handler(req, res) {// for vercel deployment
    res.status(200).json({ message: 'Hello from the backend!' });
}

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
