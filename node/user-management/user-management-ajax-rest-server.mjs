import { readFileSync, writeFileSync } from 'node:fs';
import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import initSqlJs from 'sql.js';
import crypto from 'crypto';
const dbFile = './database.sqlite';

async function initDB() {
    const SQL = await initSqlJs();
    try {
        const dbContent = readFileSync(dbFile);
        return new SQL.Database(dbContent);
    } catch {
        const db = new SQL.Database();
        const query = `
      CREATE TABLE users (
        id integer  PRIMARY KEY AUTOINCREMENT, 
        userName text, 
        password text,
        session text
      );
    `;

        db.run(query);
        writeFileSync(dbFile, Buffer.from(db.export()));
        return db;
    }
}

const db = await initDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static('public'));
const PORT = 8080;
app.listen(PORT, () => console.log("Server listening on PORT:", PORT));

app.get(`/`, (request, response) => {
    response.sendFile(join(__dirname, 'login-ajax.html'));
});

// for testing
app.get('/users', (request, response) => {
    const result = db.exec('SELECT id, userName, password, session from users');
    if (result[0] && result[0].values) {
        response.json(
            result[0].values.map((user) => ({
                id: user[0],
                userName: user[1],
                password: user[2],
                session: user[3],
            }))
        );
    } else {
        response.json([]);
    }
});

app.post('/register', (request, response) => {
    const newUser = request.body;
    db.run('INSERT INTO users (userName, password) VALUES (?, ?)', [
        newUser.userName,
        newUser.password,
    ]);
    writeFileSync(dbFile, Buffer.from(db.export()));
});

app.post('/login', (request, response) => {
    const aUser = request.body;
    const result = db.exec('SELECT password FROM users WHERE userName="' + aUser.userName + '"');
    if(result[0] && result[0].values[0][0] == aUser.password) {
            db.run('UPDATE users SET session="' + aUser.session + '" WHERE userName="' + aUser.userName + '"');
            writeFileSync(dbFile, Buffer.from(db.export()));
            response.redirect('/loggedIn');
    } else {
            response.status(401).send('Unauthorized');
    } 
});

app.get('/loggedIn', (request, response) => {   // note: nothing stops the client to call this api-endpoint directly
    response.sendFile(join(__dirname, 'loggedIn-ajax.html'));
});

app.post('/session', (request, response) => {
    const aUser = request.body;
    const result = db.exec('SELECT session FROM users WHERE session="' + aUser.session + '"');
    var session = "unknown";
    if(result[0]) {
        response.redirect('/loggedIn');
    } else {
        response.status(401).send('Unauthorized');
    }
});

app.post('/logout', (request, response) => {
    const aUser = request.body;
    const result = db.exec('SELECT session FROM users WHERE session="' + aUser.session + '"');
    if(result[0]) {
        db.run('UPDATE users SET session="' + null + '" WHERE session="' + aUser.session + '"');
        response.redirect('/');
    } else {
        response.status(500).send();
    }
});

app.post('/pwreset', (request, response) => {
    const aUser = request.body;
    const user = db.exec('SELECT session FROM users WHERE session = ' + aUser.session);
    if(user[0]) {
        db.run('UPDATE users SET password ="' + aUser.password + '" WHERE session="' + aUser.session + '"');
    } else {
        alert('password reset failed');
    }
});

