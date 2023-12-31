const http = require('node:http');

const hostname1 = 'example1.com';
const hostname2 = 'example2.com';
const port = 80;

const server = http.createServer((req, res) => {
    // Extract the host from the request headers
    const host = req.headers.host || '';

    if (host.includes(hostname1)) {
        // Handle requests for example1.com
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello from example1.com\n');
    } else if (host.includes(hostname2)) {
        // Handle requests for example2.com
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello from example2.com\n');
    } else {
        // Default response for unrecognized hosts
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World\n');
    }
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
