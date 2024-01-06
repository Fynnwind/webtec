const express = require('express');
const cors = require('cors');

const app = express ();

app.use(cors());

app.use(express.json());
app.use(express.static('public'));
const PORT = 8080;
app.listen(PORT, () => {
	console.log("Server Listening on PORT:", PORT);
});
app.get("/status", (request, response) => {
	const status = {
		"Status": "Running"
	};
	response.send(status);
});
app.get("/add", (request, response) => {
	var arg1 = parseFloat(request.query.arg1)
	var arg2 = parseFloat(request.query.arg2)
	response.send((arg1 + arg2).toString());
});
app.get("/sub", (request, response) => {
	var arg1 = parseFloat(request.query.arg1)
	var arg2 = parseFloat(request.query.arg2)
	response.send((arg1 - arg2).toString());
});
app.get("/mul", (request, response) => {
	var arg1 = parseFloat(request.query.arg1)
	var arg2 = parseFloat(request.query.arg2)
	response.send((arg1 * arg2).toString());
});
app.get("/div", (request, response) => {
	var arg1 = parseFloat(request.query.arg1)
	var arg2 = parseFloat(request.query.arg2)
	response.send((arg1 / arg2).toString());
});
