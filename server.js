import express, { urlencoded, json, response } from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';

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

db.select('*')
    .from('users')
    .then((data) => {
        console.log(data);
    });

const app = express();

app.use(urlencoded({ extended: false }));
app.use(json()); //bodyparser
app.use(cors());

app.post('/signin', (req, res) => {
    db.select('email', 'hash')
        .from('login')
        .where('email', '=', req.body.email)
        .then((data) => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            if (isValid) {
                db.select('*')
                    .from('users')
                    .where('email', '=', req.body.email)
                    .then((user) => {
                        res.json(user[0]);
                    })
                    .catch((err) => res.status(400).json('unable to get user'));
            } else {
                res.status(400).json('wrong credentials');
            }
        })
        .catch((err) => res.status(400).json('wrong credentials'));
});

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    const hash = bcrypt.hashSync(password);
    //creare transaction
    db.transaction((trx) => {
        trx.insert({
            hash: hash,
            email: email,
        })
            .into('login')
            .returning('email')
            .then((loginEmail) => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0].email,
                        name: name,
                        joined: new Date(),
                    })
                    .then((user) => {
                        res.json(user[0]);
                    });
            })
            .then(trx.commit)
            .catch(trx.rollback);
    }).catch((err) => res.status(400).json('unable to register'));
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    db.select('*')
        .from('users')
        .where({ id })
        .then((user) => {
            if (user.length) {
                res.json(user[0]);
            } else {
                res.status(400).json('Not found');
            }
        })
        .catch((err) => res.status(400).json('error getting user'));
});

app.put('/image', (req, res) => {
    const { id } = req.body;
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then((entries) => {
            res.json(entries[0].entries)
        })
        .catch((err) => res.status(400).json('unable to get entries'));
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
