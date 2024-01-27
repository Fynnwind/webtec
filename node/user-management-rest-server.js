import { readFileSync, writeFileSync } from 'node:fs';
import express from 'express';
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
 
const app = express();
app.use(express.json());
 
app.post('/users', (request, response) => {
  const newUser = request.body;
  db.run('INSERT INTO users (userName, password) VALUES (?, ?)', [
    newUser.userName,
    newUser.password,
  ]);
  const id = db.exec('SELECT last_insert_rowid()');
  response.json({ ...newUser, id: id[0].values[0][0] });
  writeFileSync(dbFile, Buffer.from(db.export()));
});
 
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

app.post('/login', (request, response) => {
  const aUser = request.body;
  const result = db.exec('SELECT session FROM users WHERE userName="' + aUser.userName + '" AND password="' + aUser.password + '"');
  var session = "unknown";
  if(result[0]) {
	  if(result[0].values[0][0] != null) {	// session exists
		session = result[0].values[0][0];
	  } else {
		session = crypto.randomUUID();	 
		db.run('UPDATE users SET session="' + session + '" WHERE userName="' + aUser.userName + '" AND password="' + aUser.password + '"');
		writeFileSync(dbFile, Buffer.from(db.export()));
	  }
  }
  response.json({ "session": session });
});
 
app.post('/pwreset', (request, response) => {
  const aUser = request.body;
  const user = db.exec('SELECT userName FROM users WHERE id = ' + aUser.id);
  if(user[0]) {
	db.run('UPDATE users SET password ="' + aUser.password + '" WHERE id ="' + aUser.id + '"');
	response.json({ status: "true" });
  } else {
	response.json({ status: "false" });
  }
});
 
app.listen(8080, () => console.log('listening to "http://localhost:8080"'));

