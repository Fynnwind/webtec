import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const app = express ();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(express.static('public'));
const PORT = 8080;
app.listen(PORT, () => {
	console.log("Server Listening on PORT:", PORT);
});

app.get("/", (request, response) => {
    response.sendFile(join(__dirname, 'calc-ajax-rest-client.html'));
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
